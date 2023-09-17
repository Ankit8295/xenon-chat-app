import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "crypto";

const region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESSKEYID;
const secretAccessKey = process.env.S3_SECRETACCESSKEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function generateUploadLink(prevImgName: string) {
  const bytes = randomBytes(16);
  const newImageName = bytes.toString("hex");
  const prevImageName = decodeURIComponent(prevImgName);

  const putParams = {
    Bucket: bucketName,
    Key: newImageName,
  };
  const deleteParams = {
    Bucket: bucketName,
    Key: prevImageName,
  };

  s3.send(new DeleteObjectCommand(deleteParams))
    .then((data) => {
      console.log("Image deleted successfully");
    })
    .catch((err) => {
      console.error("Error deleting image:", err);
    });

  const command = new PutObjectCommand(putParams);
  const uploadLink = await getSignedUrl(s3, command, { expiresIn: 60 });

  return uploadLink;
}
