/* eslint-disable no-unused-vars */

import { ForeignRegisterSchemaType } from "../schemas/foreignRegisterSchema";

export enum TokenEnum {
  accessToken = "access_token",
  refreshToken = "refresh_token",
}

export type IForeignRegisterData = Pick<ForeignRegisterSchemaType, "email" | "password" | "confirmPassword">

export interface IForeignRegisterResponse {
  email: string;
  role: string;
  verified: boolean;
}

export interface IGuessRegisterEvent {
  name: string;
  email: string;
}