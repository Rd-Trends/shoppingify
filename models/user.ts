import { model, models, Schema } from "mongoose";

interface IUser {
  name?: string;
  email?: string;
  password?: string | number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String || Number },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
