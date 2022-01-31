export interface IFilesRequest {
  parent?: string;
}

export interface IFiles {
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  date: string;
  user: string;
  parent: string;
  childs: string[];
}

export interface IFilesDTO {
  files: IFiles[];
}
