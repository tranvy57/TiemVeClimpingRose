import { BaseEntity } from "../base-entity";

export interface IUser extends BaseEntity {
  userId: string;
  email: string;
  phone: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  birthday: Date;
  gender: boolean;
  role: "ADMIN" | "USER";
}
