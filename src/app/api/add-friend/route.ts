import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { FriendsDb } from "@/src/utils/types/types";
import { NextResponse } from "next/server";

type RequestBody = {
  friendUserName: string;
  userName: string;
};

export async function POST(request: Request) {
  const jwt = request.headers.get("authorization");

  const { friendUserName, userName } = (await request.json()) as RequestBody;

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
    .collection("friends")
    .findOne<FriendsDb>({ userName: userName });

  const areTheyFriends = userDetails!.friends.includes(friendUserName)
    ? true
    : false;

  if (areTheyFriends) {
    return NextResponse.json({
      status: 200,
      data: "already friends",
    });
  }

  if (!areTheyFriends) {
    const addFriendToUser = await dataBase
      .collection("friends")
      .updateOne(
        { userName: userName },
        { $push: { friends: friendUserName } }
      );

    const addUserToFriend = await dataBase
      .collection("friends")
      .updateOne(
        { userName: friendUserName },
        { $push: { friends: userName } }
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
