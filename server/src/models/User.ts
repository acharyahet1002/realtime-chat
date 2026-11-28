import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      maxLength: 50
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true
    },
    // type: {
    //   type: String,
    //   enum: ["google", "email"],
    //   default: "email"
    // },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false
    },
    refreshTokenHash: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
