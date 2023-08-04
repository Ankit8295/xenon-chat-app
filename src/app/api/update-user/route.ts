import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import verifyUserOnServer from "@/src/lib/verifyJWT";

export async function PUT(request: Request) {
  const url = new URL(request.url);

  const userName = url.searchParams.get("userName");

  const userVerified = verifyUserOnServer(request);

  const data = (await request.json()) as { fullName?: string; about?: string };

  if (!userVerified)
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid or not found",
    });

  const database = await db();

  const updateName = data.fullName
    ? await database
        .collection("users")
        .findOneAndUpdate(
          { userName: userName },
          { $set: { fullName: data.fullName } }
        )
    : false;

  const updateAbout = data.about
    ? await database
        .collection("users")
        .findOneAndUpdate(
          { userName: userName },
          { $set: { about: data.about } }
        )
    : false;

  if (updateName || updateAbout)
    return NextResponse.json({
      status: 200,
      data: "profile updated successfully",
    });

  return NextResponse.json({
    status: 500,
    reason: "something went wrong",
  });
}
