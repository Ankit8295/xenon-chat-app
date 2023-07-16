import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

type RequestBody = {
  friendEmail: string;
  userEmail: string;
};

export async function POST(request: Request) {
  // const jwt = request.headers.get("jwtToken");

  // if (!jwt) {
  //   return NextResponse.json({
  //     status: 401,
  //     error: "unauthorized",
  //     reason: "access token is not found",
  //   });
  // }

  const { friendEmail, userEmail } = (await request.json()) as RequestBody;

  const dataBase = await db();

  const userDetails = await dataBase
    .collection("users")
    .findOne({ email: userEmail });

  const isFriendExisted = await dataBase
    .collection("users")
    .findOne({ email: friendEmail });

  if (!isFriendExisted)
    return NextResponse.json({
      status: 404,
      data: "friend not found",
    });

  const areTheyFriends = userDetails!.friends.find(
    (friend: { email: string; name: string }) => friend.email === friendEmail
  )
    ? true
    : false;

  if (areTheyFriends) {
    return NextResponse.json({
      status: 200,
      data: "already friends",
    });
  }

  if (isFriendExisted && !areTheyFriends) {
    const addFriendToUser = await dataBase.collection("users").updateOne(
      { email: userEmail },
      {
        $push: {
          friends: { email: friendEmail, name: isFriendExisted.username },
        },
      }
    );

    const addUserToFriend = await dataBase.collection("users").updateOne(
      { email: friendEmail },
      {
        $push: {
          friends: { email: userEmail, name: userDetails!.username },
        },
      }
    );

    if (addFriendToUser && addUserToFriend) {
      return NextResponse.json({
        status: 200,
        data: "friend added successfully",
      });
    } else
      return NextResponse.json({
        status: 500,
        data: "something went wrong",
      });
  }
}
