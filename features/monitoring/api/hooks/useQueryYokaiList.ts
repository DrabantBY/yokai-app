import type { YokaiType } from "@monitoring/model/types";

import { useEffect } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useQueryYokaiList = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery<YokaiType.Card[]>({
    queryKey: ["yokaiList"],
    queryFn: () => [],
    initialData: [],
  });

  useEffect(() => {
    const eventSource = new EventSource("/api");

    eventSource.onmessage = (event: MessageEvent<string>) => {
      queryClient.setQueryData<YokaiType.Card[]>(
        ["yokaiList"],
        JSON.parse(event.data),
      );
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  const { mutate } = useMutation({
    mutationFn: async (body: YokaiType.Body) => {
      const response = await fetch("/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to update yokai");
      }

      return response.json();
    },

    onMutate: async (body) => {
      await queryClient.cancelQueries({ queryKey: ["yokaiList"] });

      const prevYokaiList = queryClient.getQueryData<YokaiType.Card[]>([
        "yokaiList",
      ]);

      queryClient.setQueryData<YokaiType.Card[]>(["yokaiList"], (prev = []) =>
        prev.map((oldYokai) =>
          oldYokai.name === body.name ? { ...oldYokai, ...body } : oldYokai,
        ),
      );

      return { prevYokaiList };
    },

    onError: (err, body, context) => {
      console.error("error:", err, "body:", body);
      queryClient.setQueryData(["yokaiList"], context?.prevYokaiList);
    },
  });

  return { data, mutate };
};
