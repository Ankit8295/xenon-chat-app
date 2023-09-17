import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { MessagesDb, UserDb } from "@/src/utils/types/types";
import { NextResponse } from "next/server";

type RequestBody = {
  userName: string;
};

export async function POST(request: Request) {
  const jwt = request.headers.get("authorization");

  if (!jwt) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not found",
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

  const { userName } = (await request.json()) as RequestBody;

  const dataBase = await db();

  const userMsgDetails = await dataBase
    .collection("messages")
    .findOne<MessagesDb>({ userName: userName });

  if (userMsgDetails) {
    const userFriends = Object.keys(userMsgDetails.messages);

    if (userFriends.length > 0) {
      const friendsData = await dataBase
        .collection("users")
        .find<UserDb>({ userName: { $in: userFriends } })
        .toArray();

      return NextResponse.json({
        status: 200,
        data: friendsData,
      });
    }

    return NextResponse.json({
      status: 404,
      data: "Friend list is empty",
    });
  }
  return NextResponse.json({
    status: 500,
    data: "something went wrong",
  });
}
