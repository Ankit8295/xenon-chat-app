import { db } from "@/src/lib/mongodb";
import { createJwt } from "@/src/lib/jwt";
import { NextResponse } from "next/server";
import { decrypt, encodeEmail, encrypt } from "@/src/lib/encryptDecrypt";

interface RequestBody {
  userId: string;
  password: string;
}

type User = {
  userId: string;
  exp: number;
  iat: number;
  jti: string;
  jwtToken: string;
  password: string;
  _id: string;
};

export async function POST(request: Request) {
  const { userId, password: inputPass } = (await request.json()) as RequestBody;

  const dataBase = await db();

  const user = (await dataBase
    .collection("userIds")
    .findOne({ userId: encodeEmail(userId) })) as unknown;
  if (user) {
    const jwtToken = createJwt(user);

    const { password, ...secureUser } = user as User;

    const decryptPass = decrypt(password);
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
