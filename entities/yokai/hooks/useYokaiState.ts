"use client";

import type { YokaiType } from "@entities/yokai";
import { upsertYokai, yokaiListSchema } from "@entities/yokai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      const validData = yokaiListSchema.parse(JSON.parse(event.data));

      queryClient.setQueryData<YokaiType.Card[]>(["yokaiList"], validData);
    };

    eventSource.onerror = (err) => {
      console.error(err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  const { mutate, error } = useMutation({
    mutationFn: upsertYokai,

    onMutate: async (body) => {
      await queryClient.cancelQueries({ queryKey: ["yokaiList"] });

      const prevYokaiList = queryClient.getQueryData<YokaiType.Card[]>([
        "yokaiList",
      ]);

      queryClient.setQueryData<YokaiType.Card[]>(["yokaiList"], (prev = []) =>
        prev.map((prevYokai) =>
          prevYokai.name === body.name ? { ...prevYokai, ...body } : prevYokai,
        ),
      );

      return { prevYokaiList };
    },

    onError: (_e, _b, context) => {
      queryClient.setQueryData(["yokaiList"], context?.prevYokaiList);
    },
  });

  return { data, mutate, error };
};
