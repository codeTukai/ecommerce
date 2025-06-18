import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide name"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide password"],
    },
    avatar: {
      type: String,
      default: ""
    },
    mobile: {
      type: Number,
      default: ""
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    access_token: {
      type: String,
      default: ''
    },
    refresh_token: {
      type: String,
      default: ''
    },
    last_login_date: {
      type: Date,
      default: null, // ✅ better than empty string
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active", // ✅ Fix here
    },
    address_details: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    shopping_cart: [{
  type: mongoose.Schema.ObjectId,
  ref: "cartProduct",
  }],

    orderHistory: {
      type: mongoose.Schema.ObjectId,
      ref: "order",
    },
    otp: {
      type: String,
    },
    otpExpire: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
