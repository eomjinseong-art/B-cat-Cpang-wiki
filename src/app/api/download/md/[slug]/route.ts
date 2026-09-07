import { markdownFileResponse } from "@/lib/download";
import { getGuideRawMarkdown } from "@/lib/guides";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const raw = getGuideRawMarkdown(slug);
  if (!raw) {
    return new Response("Not found", { status: 404 });
  }
  return markdownFileResponse(slug, raw);
}
