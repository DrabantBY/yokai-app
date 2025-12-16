import { DEFAULT_HEADER } from "@shared/const/headers";

export const RESPONSE = {
  200: {
    status: 200,
    headers: DEFAULT_HEADER,
  },

  400: {
    status: 400,
    statusText: "yokai data is invalid",
    headers: DEFAULT_HEADER,
  },

  404: {
    status: 404,
    statusText: "yokai not found",
    headers: DEFAULT_HEADER,
  },

  500: {
    status: 500,
    statusText: "internal server error",
    headers: DEFAULT_HEADER,
  },

  503: {
    status: 503,
    statusText: "random server error",
    headers: DEFAULT_HEADER,
  },
} as const;
