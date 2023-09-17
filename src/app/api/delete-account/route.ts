import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import verifyUserOnServer from "@/src/lib/verifyJWT";

export async function DELETE(request: Request) {
  const url = new URL(request.url);

  const verifyUser = verifyUserOnServer(request);

  const userName = url.searchParams.get("userName");

  if (!verifyUser) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid or not found",
    });
  }

  if (userName) {
    const dataBase = await db();
    const deleteUserAccount = await dataBase
      .collection("users")
      .findOneAndDelete({ userName: userName });
    const deleteUserMessages = await dataBase
      .collection("messages")
      .findOneAndDelete({ userName: userName });
    const deleteUserIdPass = await dataBase
      .collection("idPass")
      .findOneAndDelete({ userName: userName });

    if (deleteUserAccount && deleteUserMessages && deleteUserIdPass) {
      return NextResponse.json({
        status: 200,
        data: "Account deleted successfully",
      });
    }
  }
  return NextResponse.json({
    status: 500,
    reason: "something went wrong",
  });
}
