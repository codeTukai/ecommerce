import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js'; // Make sure the path is correct

const generatedRefreshToken = async (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },
      process.env.SECRET_KEY_REFRESH_TOKEN,
      { expiresIn: '30d' }
    );

    const result = await UserModel.updateOne(
      { _id: userId },
      { refresh_token: token }
    );

    if (result.modifiedCount === 0) {
      console.warn("Refresh token not saved to user document.");
    }

    return token;
  } catch (error) {
    console.error("Failed to generate refresh token:", error);
    throw new Error("Refresh token generation failed");
  }
};

export default generatedRefreshToken;
