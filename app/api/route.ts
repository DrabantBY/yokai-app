import { YOKAI_DANGER, YOKAI_STATUS } from "@entities/yokai";
import { RESPONSE } from "@shared/const";
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
        const yokai = yokaidb[Math.floor(Math.random() * yokaidb.length)];

        if (yokai.status === YOKAI_STATUS.CAPTURED) {
          yokai.status = YOKAI_STATUS.ACTIVE;
        }

        yokai.danger =
          yokai.danger === YOKAI_DANGER.LOW
            ? YOKAI_DANGER.CRITICAL
            : YOKAI_DANGER.LOW;

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

export async function PUT(req: NextRequest) {
  try {
    if (Math.random() < 0.5) {
      return new Response(null, RESPONSE[503]);
    }

    const body = await req.json();

    if (!body.name || (!body.status && !body.danger)) {
      return new Response(null, RESPONSE[400]);
    }

    const yokai = yokaidb.find(({ name }) => name === body.name);

    if (!yokai) {
      return new Response(null, RESPONSE[404]);
    }

    yokai.status = body.status ?? yokai.status;
    yokai.danger = body.danger ?? yokai.danger;

    return new Response(JSON.stringify(yokai), RESPONSE[200]);
  } catch {
    return new Response(null, RESPONSE[500]);
  }
}
