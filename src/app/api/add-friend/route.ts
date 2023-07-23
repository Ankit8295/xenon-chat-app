import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

type RequestBody = {
  friendEmail: string;
  userEmail: string;
};

export async function POST(request: Request) {
  const jwt = request.headers.get("authorization");

  const { friendEmail, userEmail } = (await request.json()) as RequestBody;

  const dataBase = await db();

  if (!jwt) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token  not found",
    });
  }

  const verifyToken = verifyJwt(jwt);

  if (!verifyToken) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid",
    });
  }

  const userDetails = await dataBase
    .collection("users")
    .findOne({ userId: userEmail });

  const isFriendExistedInDb = await dataBase
    .collection("users")
    .findOne({ userId: friendEmail });

  if (!isFriendExistedInDb)
    return NextResponse.json({
      status: 404,
      data: "friend not found",
    });

  const areTheyFriends = userDetails!.friends.find(
    (friend: { userId: string; name: string }) => friend.userId === friendEmail
  )
    ? true
    : false;

  if (areTheyFriends) {
    return NextResponse.json({
      status: 200,
      data: "already friends",
    });
  }

  if (isFriendExistedInDb && !areTheyFriends) {
    const addFriendToUser = await dataBase.collection("users").updateOne(
      { userId: userEmail },
      {
        $push: {
          friends: { userId: friendEmail, name: isFriendExistedInDb.username },
        },
      }
    );

    const addUserToFriend = await dataBase.collection("users").updateOne(
      { userId: friendEmail },
      {
        $push: {
          friends: {
            userId: userEmail,
            name: userDetails!.username,
          },
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
