import { EMethodRequest } from "../types";

export default async (
  url: RequestInfo,
  { method, body, headers }: Partial<RequestInit> & { method: EMethodRequest },
  isNotJSON?: boolean
) =>
  await fetch(url, { headers: isNotJSON ? headers : { "Content-Type": "application/json;charset=utf-8", ...headers }, body, method }).then(
    (data) => (isNotJSON ? data : data.json())
  );
