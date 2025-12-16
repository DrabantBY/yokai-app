"use client";

import type { YokaiType } from "@entities/yokai";

import { upsertYokai } from "@entities/yokai";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";

export const useYokaiState = () => {
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
    mutationFn: upsertYokai,

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
      console.error("errorMessage:", err.message);
      queryClient.setQueryData(["yokaiList"], context?.prevYokaiList);
    },
  });

  return { data, mutate };
};
