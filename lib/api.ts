"use client";

import { baseUrl } from "@/lib/constants";

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown>;
};

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  if (!baseUrl) {
    throw new Error("The API base URL is not configured.");
  }

  const headers = new Headers(options.headers);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let body: BodyInit | undefined;
  if (options.body instanceof FormData) {
    body = options.body;
  } else if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.body);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
    body,
  });

  const payload = response.status === 204 ? undefined : await response.json();
  if (!response.ok) {
    throw new Error(payload?.message ?? `Request failed with status ${response.status}`);
  }

  return payload as T;
}
