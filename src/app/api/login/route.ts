import { db } from "@/src/lib/mongodb";
import { createJwt } from "@/src/lib/jwt";
import { NextResponse } from "next/server";
import { decrypt } from "@/src/lib/encryptDecrypt";

interface RequestBody {
  email: string;
  password: string;
}

type User = {
  email: string;
  exp: number;
  iat: number;
  jti: string;
  jwtToken: string;
  username: string;
  password: string;
  friends: {}[];
  _id: string;
};

export async function POST(request: Request) {
  const { email, password: inputPass } = (await request.json()) as RequestBody;

  const dataBase = await db();

  const user = (await dataBase
    .collection("users")
    .findOne({ email })) as unknown;

  if (user) {
    const decryptKey = process.env.ENCRYPTION_KEY;

    const jwtToken = createJwt(user);

    const { password, friends, ...secureUser } = user as User;

    const decryptPass = decrypt(password, decryptKey);

    if (decryptPass !== inputPass) {
      return NextResponse.json({
        status: 403,
        data: "password doesn't match",
      });
    } else {
      const result = {
        ...secureUser,
        jwtToken,
      };

      return NextResponse.json({
        status: 200,
        data: result,
      });
    }
  } else
    return NextResponse.json({
      status: 404,
      data: "user not found",
    });
}
