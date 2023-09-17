import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import verifyUserOnServer from "@/src/lib/verifyJWT";
import { MessageType, MessagesDb } from "@/src/utils/types/types";

export async function DELETE(request: Request) {
  const url = new URL(request.url);

  const messageId = await request.json();

  const verifiedUser = verifyUserOnServer(request);

  const userName = url.searchParams.get("userName");

  const friendName = url.searchParams.get("friendName");
  if (!verifiedUser) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid or not found",
    });
  }

  if (friendName && userName) {
    const dataBase = await db();
    const getMsg = await dataBase
      .collection("messages")
      .findOne<MessagesDb>(
        { userName: userName },
        { [`messages.${friendName}.${messageId}`]: messageId }
      );

    const msg = getMsg?.messages[friendName]?.[messageId] as MessageType;

    const deleteForUser = await dataBase
      .collection("messages")
      .updateOne(
        { userName: userName },
        { $unset: { [`messages.${friendName}.${messageId}`]: "" } }
      );

    if (msg.messageBy === userName) {
      await dataBase
        .collection("messages")
        .updateOne(
          { userName: friendName },
          { $unset: { [`messages.${userName}.${messageId}`]: "" } }
        );
    }

    if (deleteForUser) {
      return NextResponse.json({
        status: 200,
        data: "message deleted successfully",
      });
    }
  }
  return NextResponse.json({
    status: 500,
    reason: "something went wrong",
  });
}
