import { EMethodRequest } from "../types";

export default async (url: RequestInfo, { method = EMethodRequest.GET, body, headers }: Partial<RequestInit>) =>
  await fetch(url, { headers: { "Content-Type": "application/json;charset=utf-8", ...headers }, body, method });
