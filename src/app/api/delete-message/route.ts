import { NextResponse } from "next/server";
import verifyUserOnServer from "@/src/lib/verifyJWT";
import { db } from "@/src/lib/mongodb";

export async function PATCH(request: Request) {
  const url = new URL(request.url);

  const messageId = await request.json();

  const userName = url.searchParams.get("userName");

  const friendName = url.searchParams.get("friendName");

  const verfiedUser = verifyUserOnServer(request);

  if (!verfiedUser) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid or not found",
    });
  }

  if (friendName && userName) {
    const dataBase = await db();

    const deleteForFren = await dataBase
      .collection("messages")
      .updateOne(
        { userName: friendName },
        { $unset: { [`messages.${userName}.${messageId}`]: "" } }
      );

    const deleteForUser = await dataBase
      .collection("messages")
      .updateOne(
        { userName: userName },
        { $unset: { [`messages.${friendName}.${messageId}`]: "" } }
      );

    if (deleteForFren && deleteForUser) {
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
