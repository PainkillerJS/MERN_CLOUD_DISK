import { EMethodRequest } from "../types";

export default async (url: RequestInfo, { method = EMethodRequest.GET, body, headers }: Partial<RequestInit>, isNotJSON?: boolean) =>
  await fetch(url, { headers: isNotJSON ? headers : { "Content-Type": "application/json;charset=utf-8", ...headers }, body, method }).then(
    (data) => data.json()
  );
