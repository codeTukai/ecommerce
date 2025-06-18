import UserModel from "../models/user.model.js"; // ✅ add .js extension
import jwt from 'jsonwebtoken';

const generatedRefreshToken = async (userId) => {
  // ✅ Generate JWT refresh token
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: '30d' }
  );

  // ✅ Save token to user's DB record
  await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  return token;
};

export default generatedRefreshToken;
