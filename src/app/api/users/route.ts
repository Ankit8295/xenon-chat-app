import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
  const dataBase = await db();
  const user = await dataBase.collection("users").find({}).toArray();
  return NextResponse.json(user);
}
