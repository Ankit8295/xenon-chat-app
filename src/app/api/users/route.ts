import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

type RequestBody = {
  searchFriendEmail: string;
};

export async function GET(request: Request) {
  const jwt = request.headers.get("authorization");

  const { searchFriendEmail } = (await request.json()) as RequestBody;

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

  const user = await dataBase
    .collection("userIds")
    .findOne({ userId: searchFriendEmail });
  if (user) return NextResponse.json({ status: 200, data: user });
  return NextResponse.json({ status: 404, data: "No User found" });
}
