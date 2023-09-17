import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import verifyUserOnServer from "@/src/lib/verifyJWT";

export async function DELETE(request: Request) {
  const url = new URL(request.url);

  const verifyUser = verifyUserOnServer(request);

  const userName = url.searchParams.get("userName");

  const friendName = url.searchParams.get("friendName");

  if (!verifyUser) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid or not found",
    });
  }

  if (userName && friendName) {
    const dataBase = await db();

    const deleteFromUserList = await dataBase
      .collection("messages")
      .updateOne(
        { userName: userName },
        { $unset: { [`messages.${friendName}`]: "" } }
      );

    const deleteFromFrenList = await dataBase
      .collection("messages")
      .updateOne(
        { userName: friendName },
        { $unset: { [`messages.${userName}`]: "" } }
      );

    if (deleteFromUserList && deleteFromFrenList) {
      return NextResponse.json({
        status: 200,
        data: "friend removed successfully",
      });
    }
  }

  return NextResponse.json({
    status: 500,
    reason: "something went wrong",
  });
}
