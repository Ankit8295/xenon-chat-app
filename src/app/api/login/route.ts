import { NextResponse } from "next/server";
import { db } from "@/src/lib/mongodb";
import { createJwt } from "@/src/lib/jwt";

interface RequestBody {
  email: string;
  password: string;
  username: string;
}
type User = {
  email: string;
  exp: number;
  iat: number;
  jti: string;
  jwtToken: string;
  name: string;
  password: string;
  _id: string;
};
export async function POST(request: Request) {
  const { email } = (await request.json()) as RequestBody;
  const dataBase = await db();
  const user = (await dataBase
    .collection("users")
    .findOne({ email })) as unknown;

  if (user) {
    const jwtToken = createJwt(user);
    const { password, ...secureUser } = user as User;
    const result = {
      ...secureUser,
      jwtToken,
    };
    return NextResponse.json(result);
  } else return NextResponse.json(null);
}
