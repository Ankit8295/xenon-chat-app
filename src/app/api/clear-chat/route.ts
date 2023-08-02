import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const url = new URL(request.url);

  const userName = url.searchParams.get("userName");

  const friendName = url.searchParams.get("friendName");

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
  if (friendName && userName) {
    const dataBase = await db();

    const emptyForFren = await dataBase
      .collection("messages")
      .updateOne(
        { userName: friendName },
        { $unset: { [`messages.${userName}`]: "" } }
      );

    const emptyForUser = await dataBase
      .collection("messages")
      .updateOne(
        { userName: userName },
        { $unset: { [`messages.${friendName}`]: "" } }
      );

    if (emptyForFren && emptyForUser) {
      return NextResponse.json({
        status: 200,
        data: "chats cleared successfully",
      });
    }
  }

  return NextResponse.json({
    status: 500,
    reason: "something went wrong",
  });
}
