import mongoose, { mongo } from "mongoose"
import { App } from "types/app";
const Schema = mongoose.Schema

mongoose.model<App.Admin>("admins", new Schema<App.Admin>({
  name: { type: String, required: true },
  created: { type: Date, required: true },
  deleted: { type: Boolean, required: true },
  email: { type: String, required: true },
  password: { type: String, requured: true },
  super: { type: Boolean, required: false }
}));