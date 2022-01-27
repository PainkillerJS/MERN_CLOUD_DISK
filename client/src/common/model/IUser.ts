import type { IRequest } from "./IRequest";

export type TUserRequest = {
  email: string;
  password: string;
};

export type TUserResponse = TUserRequest & {
  email: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
  files: Record<string, unknown>;
};

export interface IUserDTO extends IRequest {
  user: Partial<TUserResponse>;
  isAuth: boolean;
}
