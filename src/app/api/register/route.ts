import { NextResponse } from "next/server";
import { db } from "@/src/lib/mongodb";
import { encrypt } from "@/src/lib/encryptDecrypt";
import { UserDb } from "@/src/utils/types/types";

interface RequestBody {
  emailId: string;
  userName: string;
  fullName: string;
  password: string;
}

export async function POST(request: Request) {
  const { emailId, fullName, password, userName } =
    (await request.json()) as RequestBody;

  const encryptPass = encrypt(password);

  const dataBase = await db();

  const user: UserDb = {
    emailId,
    fullName,
    userName,
    about: "Online",
    photo: "",
  };

  const createdUser = await dataBase.collection("users").insertOne(user);

  const saveIdPass = await dataBase
    .collection("idPass")
    .insertOne({ userName, password: encryptPass });

  const createMessages = await dataBase.collection("messages").insertOne({
    userName: userName,
    messages: {},
  });

  const createFriends = await dataBase.collection("friends").insertOne({
    userName: userName,
    friends: [],
  });

  if (createdUser && saveIdPass && createMessages && createFriends) {
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
