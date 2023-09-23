import { db } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const dataBase = await db();
  const users = await dataBase.collection("users").find().toArray();
  const paths = users.map((user) => user.userName);
  console.log(paths);
  return NextResponse.json({
    status: 200,
    data: paths,
  });
}
