import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuid } from 'uuid';

const s3 = new S3Client({
  region: process.env.MY_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
  },
});

const bucket = process.env.MY_AWS_BUCKET!;

export async function uploadImage(file: Buffer, fileName: string, folder?: string, mimetype?: string) {
  const key = `${folder ? `${folder}/` : ''}${uuid()}-${fileName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: mimetype,
    }),
  );

  return `https://${bucket}.s3.${process.env.MY_AWS_REGION}.amazonaws.com/${key}`;
}

// Tạo presigned URL để client upload trực tiếp
export async function generateUploadPostUrl(fileName: string, folder: string, contentType: string) {
  const key = `${folder}/${uuid()}-${fileName}`;

  const presignedPost = await createPresignedPost(s3, {
    Bucket: bucket,
    Key: key,
    Conditions: [['starts-with', '$Content-Type', contentType.split('/')[0]]],
    Fields: {
      'Content-Type': contentType,
    },
    Expires: 300,
  });

  return {
    url: presignedPost.url,
    fields: presignedPost.fields,
    key,
    fileUrl: `https://${bucket}.s3.${process.env.MY_AWS_REGION}.amazonaws.com/${key}`,
  };
}

export async function deleteFile(url: string) {
  const urlObj = new URL(url);
  const key = urlObj.pathname.slice(1);

  await s3.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );
}
