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

  const userExist = (await dataBase
    .collection("users")
    .findOne({ userName: userName })) as any;

  if (userExist)
    return NextResponse.json({
      status: 503,
      data: "Username Already Taken!!!",
    });

  const emailExist = (await dataBase
    .collection("users")
    .findOne({ emailId: emailId })) as any;

  if (emailExist)
    return NextResponse.json({
      status: 503,
      data: "Email Already registered!!!",
    });

  const createdUser = await dataBase.collection("users").insertOne(user);

  const saveIdPass = await dataBase
    .collection("idPass")
    .insertOne({ userName, password: encryptPass });

  const createMessages = await dataBase.collection("messages").insertOne({
    userName: userName,
    messages: {},
  });

  if (createdUser && saveIdPass && createMessages) {
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
