import { DEFAULT_HEADER } from "@shared/const";

type FetchParams = {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  credentials?: boolean;
  body?: BodyInit;
  signal?: AbortSignal | null;
};

const fetchBase = async <T = void>(
  method: string,
  url: string,
  options?: FetchParams,
): Promise<T> => {
  const response = await fetch(
    `${url}${options?.params ? "?" : ""}${new URLSearchParams(options?.params)}`,
    {
      method,
      headers:
        options?.body instanceof FormData
          ? options?.headers
          : Object.assign(DEFAULT_HEADER, options?.headers),
      credentials: options?.credentials ? "include" : "same-origin",
      body: options?.body,
      signal: options?.signal,
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const fetchPut = <T>(url: string, options?: FetchParams) => {
  return fetchBase<T>("PUT", url, options);
};
