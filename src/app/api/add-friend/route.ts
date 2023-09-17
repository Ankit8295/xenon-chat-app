import { db } from "@/src/lib/mongodb";
import { verifyJwt } from "@/src/lib/jwt";
import { NextResponse } from "next/server";
import { MessagesDb } from "@/src/utils/types/types";

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
    .collection("messages")
    .findOne<MessagesDb>({ userName: userName });

  if (userDetails) {
    const friends = Object.keys(userDetails.messages);

    const areTheyFriends = !!friends.includes(friendUserName);

    if (areTheyFriends) {
      return NextResponse.json({
        status: 200,
        data: "",
      });
    }
    const messageCollection = dataBase.collection("messages");

    messageCollection.findOneAndUpdate(
      { userName: userName },
      { $set: { [`messages.${friendUserName}`]: {} } }
    );

    messageCollection.findOneAndUpdate(
      { userName: friendUserName },
      { $set: { [`messages.${userName}`]: {} } }
    );

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
