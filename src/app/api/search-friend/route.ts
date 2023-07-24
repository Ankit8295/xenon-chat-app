import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { FriendsDb, UserDb } from "@/src/utils/types/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwt = request.headers.get("authorization");

  const url = new URL(request.url);

  const friendUserName = url.searchParams.get("friendUserName");
  const userName = url.searchParams.get("userName");

  const dataBase = await db();

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
  if (userName && friendUserName) {
    const userDetails = await dataBase
      .collection("friends")
      .findOne<FriendsDb>({ userName: userName });

    const areTheyFriends = userDetails!.friends.includes(friendUserName)
      ? true
      : false;

    const user = await dataBase
      .collection("users")
      .findOne<UserDb>({ userName: friendUserName });

    if (areTheyFriends) return NextResponse.json({ status: 403, data: user });

    if (user) return NextResponse.json({ status: 200, data: user });
    return NextResponse.json({ status: 404, data: "friend not found" });
  }
  return NextResponse.json({ status: 500, data: "something went wrong" });
}
