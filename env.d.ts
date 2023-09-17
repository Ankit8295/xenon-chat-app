namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    MONGODB_URI: string;
    NEXTAUTH_URL: string;
    ENCRYPTION_KEY: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_NEXTAUTH_URL: string;
    NEXT_PUBLIC_SOCKET_SERVER: string;
    S3_REGION: string;
    S3_BUCKET_NAME: string;
    S3_ACCESSKEYID: string;
    S3_SECRETACCESSKEY: string;
  }
}
