import { NextResponse } from "next/server";
import { db } from "@/src/lib/mongodb";
import { encodeEmail, encrypt } from "@/src/lib/encryptDecrypt";
import { ObjectId } from "mongodb";

interface RequestBody {
  userId: string;
  username: string;
  password: string;
}
type User = {
  userId: string;
  username: string;
  friends: unknown[];
  photo?: string;
  about?: string;
};

export async function POST(request: Request) {
  const { userId, password, username } = (await request.json()) as RequestBody;

  const encryptPass = encrypt(password);
  const encodedEmail = encodeEmail(userId);

  const dataBase = await db();

  const user: User = {
    userId: encodedEmail,
    username,
    friends: [],
  };
  console.log(encodedEmail, encryptPass);
  const createdUser = await dataBase.collection("users").insertOne(user);

  const createdUserIds = await dataBase
    .collection("userIds")
    .insertOne({ userId: encodedEmail, password: encryptPass, username });

  const updateQuery = {
    [`messages.${encodedEmail}`]: [],
  };

  const createUMessagesArray = await dataBase
    .collection("messages")
    .findOneAndUpdate(
      { _id: new ObjectId("64bcbf58f7a7a5310e1ff51b") },
      {
        $set: updateQuery,
      }
    );

  if (createdUser && createdUserIds && createUMessagesArray) {
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
