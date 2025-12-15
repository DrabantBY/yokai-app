import type { NextRequest } from "next/server";

import yokaidb from "@/yokaidb.json";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const readableStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(yokaidb)}\n\n`),
      );

      const interval = setInterval(() => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(yokaidb)}\n\n`),
        );
      }, 5000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
