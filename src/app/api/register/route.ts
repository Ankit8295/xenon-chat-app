import { NextResponse } from "next/server";
import { db } from "@/src/lib/mongodb";
import { encrypt } from "@/src/lib/encryptDecrypt";

interface RequestBody {
  email: string;
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password, username } = (await request.json()) as RequestBody;

  const encryptKey = process.env.ENCRYPTION_KEY;

  const encryptPass = encrypt(password, encryptKey);

  const dataBase = await db();

  const user = { email, password: encryptPass, username, friends: [] };

  const createdUser = await dataBase.collection("users").insertOne(user);

  const createdUserIds = await dataBase
    .collection("userIds")
    .insertOne({ userId: email, username: username });

  if (createdUser && createdUserIds) {
    return NextResponse.json({
      status: 200,
      data: "user registered successfully",
    });
  } else
    return NextResponse.json({
      status: 500,
      data: "something went wrong",
    });
}
