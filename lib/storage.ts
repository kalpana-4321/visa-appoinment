import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// Strip surrounding quotes if present from env vars
function cleanEnv(val?: string) {
  if (!val) return "";
  return val.replace(/^["']|["']$/g, "").trim();
}

const endpoint = cleanEnv(process.env.AWS_ENDPOINT_URL_S3);
const accessKeyId = cleanEnv(process.env.AWS_ACCESS_KEY_ID);
const secretAccessKey = cleanEnv(process.env.AWS_SECRET_ACCESS_KEY);
const region = cleanEnv(process.env.AWS_REGION) || "us-east-2";
export const BUCKET_NAME = cleanEnv(process.env.NEON_STORAGE_BUCKET) || "visa-documents";

export const s3Client = new S3Client({
  region,
  endpoint: endpoint || undefined,
  forcePathStyle: true, // Neon Object Storage requires path-style access
  credentials:
    accessKeyId && secretAccessKey
      ? {
          accessKeyId,
          secretAccessKey,
        }
      : undefined,
});

/**
 * Uploads a file buffer directly to the Neon Object Storage bucket.
 * Returns the object key and the public/accessible URL.
 */
export async function uploadToStorage(params: {
  key: string;
  body: Buffer | Uint8Array;
  contentType: string;
}): Promise<{ key: string; url: string }> {
  const { key, body, contentType } = params;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Path-style URL format: {endpoint}/{bucket}/{key}
  const cleanEndpoint = endpoint.replace(/\/+$/, "");
  const url = `${cleanEndpoint}/${BUCKET_NAME}/${key}`;

  return { key, url };
}
