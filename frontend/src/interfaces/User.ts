export interface IUser {
  _id: string;
  name: string;
  email: string;
  password:string;
  isAdmin: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
