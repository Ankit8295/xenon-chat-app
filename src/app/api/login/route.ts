import { db } from "@/src/lib/mongodb";
import { createJwt } from "@/src/lib/jwt";
import { NextResponse } from "next/server";
import { decrypt } from "@/src/lib/encryptDecrypt";

interface RequestBody {
  userName: string;
  password: string;
}

type User = {
  userName: string;
  exp: number;
  iat: number;
  jti: string;
  jwtToken: string;
  password: string;
  _id: string;
};

export async function POST(request: Request) {
  const { userName, password: inputPass } =
    (await request.json()) as RequestBody;

  const dataBase = await db();

  const user = (await dataBase
    .collection("idPass")
    .findOne({ userName: userName })) as unknown;

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
