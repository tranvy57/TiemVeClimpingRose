import { BaseEntity } from "../base-entity";

export interface IUser extends BaseEntity {
  userId: string;
  email: string;
  phone: string;
  username: string;
  displayName: string;
  avatar?: string;
  birthday: Date;
  gender: boolean;
  zipcode: string;
  addressDetail: string;
  role: "ADMIN" | "USER";
}
