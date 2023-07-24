import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

type RequestBody = {
  userName: string;
};

export async function POST(request: Request) {
  const jwt = request.headers.get("authorization");
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

  const { userName } = (await request.json()) as RequestBody;

  const dataBase = await db();

  const userDetails = await dataBase.collection("friends").findOne<{
    id: string;
    userName: string;
    friends: string[];
  }>({ userName: userName });

  if (userDetails) {
    if (userDetails?.friends.length > 0)
      return NextResponse.json(userDetails.friends);
    return NextResponse.json({
      status: 404,
      data: "friends not found",
    });
  }
  return NextResponse.json({
    status: 500,
    data: "something went wrong",
  });
}
