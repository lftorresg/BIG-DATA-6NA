import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fone: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
});

export const User = mongoose.model("User", UserSchema);