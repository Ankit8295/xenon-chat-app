import { verifyJwt } from "@/src/lib/jwt";
import { db } from "@/src/lib/mongodb";
import { FriendsDb, UserDb } from "@/src/utils/types/types";
import { NextResponse } from "next/server";

type RequestBody = {
  userName: string;
};

export async function POST(request: Request) {
  const jwt = request.headers.get("authorization");

  if (!jwt) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not found",
    });
  }

  const verifyToken = verifyJwt(jwt);

  if (!verifyToken) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid",
    });
  }

  const { userName } = (await request.json()) as RequestBody;

  const dataBase = await db();

  const userDetails = await dataBase
    .collection("friends")
    .findOne<FriendsDb>({ userName: userName });

  if (userDetails) {
    if (userDetails?.friends.length > 0) {
      const friendsId = userDetails.friends;

      const friendsData = await dataBase
        .collection("users")
        .find<UserDb>({ userName: { $in: friendsId } })
        .toArray();

      return NextResponse.json({
        status: 200,
        data: friendsData,
      });
    }

    return NextResponse.json({
      status: 404,
      data: "Friend list is empty",
    });
  }
  return NextResponse.json({
    status: 500,
    data: "something went wrong",
  });
}
