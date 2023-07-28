namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    API_KEY: string;
    ENCRYPTION_KEY: string;
    S3_BUCKET_NAME: string;
    S3_BUCKET_REGION: string;
  }
}
