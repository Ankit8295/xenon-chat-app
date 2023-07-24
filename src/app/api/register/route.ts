import { NextResponse } from "next/server";
import { db } from "@/src/lib/mongodb";
import { encrypt } from "@/src/lib/encryptDecrypt";
import { ObjectId } from "mongodb";

interface RequestBody {
  emailId: string;
  userName: string;
  fullName: string;
  password: string;
}

type User = {
  emailId: string;
  userName: string;
  fullName: string;
  photo?: string;
  about?: string;
};

export async function POST(request: Request) {
  const { emailId, fullName, password, userName } =
    (await request.json()) as RequestBody;

  const encryptPass = encrypt(password);

  const dataBase = await db();

  const user: User = {
    emailId,
    fullName,
    userName,
    about: "",
    photo: "",
  };
  const createdUser = await dataBase.collection("users").insertOne(user);

  const saveIdPass = await dataBase
    .collection("idPass")
    .insertOne({ userName, password: encryptPass });

  const saveUserIds = await dataBase
    .collection("userIds")
    .updateOne(
      { _id: new ObjectId("64be6a5a22d605fc63764d97") },
      { $push: { ids: userName } }
    );

  const createMessages = await dataBase.collection("messages").insertOne({
    userName: userName,
    messages: {},
  });

  const createFriends = await dataBase.collection("friends").insertOne({
    userName: userName,
    friends: [],
  });

  if (
    createdUser &&
    saveUserIds &&
    saveIdPass &&
    createMessages &&
    createFriends
  ) {
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
