import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import verifyUserOnServer from "@/src/lib/verifyJWT";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const userName = url.searchParams.get("userName");

  const userVerified = verifyUserOnServer(request);

  if (!userVerified)
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid or not found",
    });

  if (userName) {
    const database = await db();

    const userData = await database
      .collection("users")
      .findOne({ userName: userName });

    if (userData)
      return NextResponse.json({
        status: 200,
        data: userData,
      });
  }

  return NextResponse.json({
    status: 500,
    reason: "something went wrong",
  });
}
