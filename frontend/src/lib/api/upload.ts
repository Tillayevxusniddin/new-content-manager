import { withLatency } from "@/lib/api/client";

interface PresignedRequest {
  fileType: "cover" | "audio" | "video";
  contentType: string;
}

export async function getPresignedUrlApi(request: PresignedRequest) {
  return withLatency(
    {
      uploadUrl: "https://example-bucket.s3.amazonaws.com/mock-upload-url",
      fileKey: `mock/${request.fileType}/${Date.now()}`,
      contentType: request.contentType,
    },
    "Presigned URL を取得しました",
  );
}
