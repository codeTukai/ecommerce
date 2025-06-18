import jwt from 'jsonwebtoken'; // ❌ You wrote 'jst' instead of 'jwt'

const generatedAccessToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN, // ✅ Use your actual env variable name
    { expiresIn: '5h' } // ❌ Typo: "expireIn" should be "expiresIn"
  );
  return token;
};

export default generatedAccessToken;
