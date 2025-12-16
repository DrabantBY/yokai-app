import type { YokaiType } from "@entities/yokai";

import { fetchPut } from "@shared/fetch";

export const upsertYokai = (body: YokaiType.Body) =>
  fetchPut<YokaiType.Card>("/api", {
    body: JSON.stringify(body),
  });
