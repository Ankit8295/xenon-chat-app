import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { FriendsDb, MessagesDb } from "@/src/utils/types/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const userName = url.searchParams.get("userName");
  const friendName = url.searchParams.get("friendName");

  const jwt = request.headers.get("authorization");

  if (!jwt) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      data: "access token is not found",
    });
  }

  const verifyToken = verifyJwt(jwt);

  if (!verifyToken) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      data: "access token is not valid",
    });
  }
  if (friendName && userName) {
    const dataBase = await db();

    const userMessages = await dataBase
      .collection("messages")
      .findOne<MessagesDb>({ userName: userName });

    const friendMsg = userMessages?.messages?.[friendName];

    if (friendMsg) {
      return NextResponse.json({
        status: 200,
        data: friendMsg,
      });
    }
    return NextResponse.json({
      status: 200,
      data: [],
    });
  }
  return NextResponse.json({
    status: 500,
    data: "something went wrong",
  });
}
