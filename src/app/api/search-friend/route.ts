import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/src/lib/jwt";
import { UserDb } from "@/src/utils/types/types";

export async function GET(request: Request) {
  const jwt = request.headers.get("authorization");

  const url = new URL(request.url);

  const userName = url.searchParams.get("userName");

  const friendUserName = url.searchParams.get("friendUserName");

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
    const dataBase = await db();

    const searchUserExists = await dataBase
      .collection("users")
      .find<UserDb>({ fullName: { $regex: friendUserName, $options: "i" } })
      .toArray();

    if (searchUserExists) {
      const friendsData = searchUserExists.filter(
        (users) => users.userName !== userName
      );
      if (friendsData.length > 0)
        return NextResponse.json({ status: 200, data: friendsData });
    }
    return NextResponse.json({ status: 404, data: "friend not found" });
  }
  return NextResponse.json({ status: 500, data: "something went wrong" });
}
