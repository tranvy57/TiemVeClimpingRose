export interface IUser {
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
