import type { YokaiType } from "@monitoring/model";

import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryYokaiList = () => {
  const { data } = useQuery<YokaiType.Card[]>({
    queryKey: ["yokaiList"],
    queryFn: () => [],
    initialData: [],
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource("/api");

    eventSource.onmessage = (event: MessageEvent<string>) => {
      queryClient.setQueryData<YokaiType.Card[]>(
        ["yokaiList"],
        JSON.parse(event.data),
      );
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  return data;
};
