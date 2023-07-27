import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { FriendsDb } from "@/src/utils/types/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const userName = url.searchParams.get("userName");

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

  const dataBase = await db();

  const userMessages = await dataBase
    .collection("messages")
    .findOne<FriendsDb>({ userName: userName });
  if (userMessages) {
    return NextResponse.json({
      status: 200,
      data: userMessages,
    });
  }

  return NextResponse.json({
    status: 500,
    data: "something went wrong",
  });
}
