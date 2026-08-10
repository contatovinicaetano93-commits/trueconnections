import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "audio/mpeg",
          "audio/mp3",
          "audio/mp4",
          "audio/x-m4a",
          "audio/m4a",
          "audio/wav",
          "audio/x-wav",
          "audio/ogg",
          "audio/webm",
          "audio/aac",
        ],
        maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({
          adminId: session.user.id,
        }),
      }),
      onUploadCompleted: async () => {
        // Persistência fica no formulário admin após o upload.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
