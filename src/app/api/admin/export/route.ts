import { createReadStream, promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Архивы лежат вне public/ и отдаются только администраторам.
export async function GET(request: Request) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  const requested = new URL(request.url).searchParams.get("type") ?? "next";
  if (requested !== "php" && requested !== "next") return NextResponse.json({ error: "Неизвестный архив" }, { status: 400 });
  const type = requested;
  const file = path.join(process.cwd(), "downloads", type === "php" ? "valley-php.zip" : "valley-next.zip");
  try {
    const stat = await fs.stat(file);
    const stream = createReadStream(file);
    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk: Buffer | string) => controller.enqueue(typeof chunk === "string" ? new TextEncoder().encode(chunk) : new Uint8Array(chunk)));
        stream.on("end", () => controller.close());
        stream.on("error", (error) => controller.error(error));
      },
      cancel() { stream.destroy(); },
    });
    return new Response(readable, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="valley-${type}.zip"`,
        "Content-Length": String(stat.size),
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Архив ещё не собран. Выполните сборку проекта" }, { status: 404 });
  }
}
