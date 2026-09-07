import { sourceZipResponse } from "@/lib/download";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return sourceZipResponse();
}
