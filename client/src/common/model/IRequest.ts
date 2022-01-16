import type { SerializedError } from "@reduxjs/toolkit";

export interface IRequest {
  error: SerializedError;
  loading: boolean;
}
