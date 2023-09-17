import { db } from "@/src/lib/mongodb";
import { generateUploadLink } from "@/src/lib/s3";
import verifyUserOnServer from "@/src/lib/verifyJWT";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);

  const verifyUser = verifyUserOnServer(request);

  if (!verifyUser) {
    return NextResponse.json({
      status: 401,
      error: "unauthorized",
      reason: "access token is not valid or not found",
    });
  }

  const userName = url.searchParams.get("userName") as string;
  const prevImageName = url.searchParams.get("prevImageName") as string;

  const s3url = await generateUploadLink(prevImageName);

  try {
    if (s3url) {
      const profileData = await request.formData();
      const profilePic = profileData.get("image") as File;
      const contentType = profilePic.type || "application/octet-stream";

      const response = await fetch(s3url, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: profilePic,
      });

      if (response.status === 200) {
        const imageLinkForDb = s3url.split("?")[0];

        const dataBase = await db();

        await dataBase
          .collection("users")
          .findOneAndUpdate(
            { userName: userName },
            { $set: { photo: imageLinkForDb } }
          );

        return NextResponse.json({
          status: 200,
          data: "profile updated successfully",
        });
      } else {
        return NextResponse.json({
          status: response.status,
          reason: "Failed to upload profile picture",
        });
      }
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return NextResponse.json({
      status: 500,
      reason: "Internal server error",
    });
  }
}
