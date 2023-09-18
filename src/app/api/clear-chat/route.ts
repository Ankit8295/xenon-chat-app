import { db } from "@/src/lib/mongodb";
import { verifyJwt } from "@/src/lib/jwt";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const url = new URL(request.url);

  const jwt = request.headers.get("authorization");

  const userName = url.searchParams.get("userName");

  const friendName = url.searchParams.get("friendName");

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

    const bulkWriteOpt = [
      {
        updateOne: {
          filter: { userName: friendName },
          update: { $set: { [`messages.${userName}`]: {} } },
        },
      },
      {
        updateOne: {
          filter: { userName: userName },
          update: { $set: { [`messages.${friendName}`]: {} } },
        },
      },
    ];

    const isUpdated = await dataBase
      .collection("messages")
      .bulkWrite(bulkWriteOpt);

    if (isUpdated.modifiedCount === 2) {
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
