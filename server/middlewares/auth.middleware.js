import jwt from 'jsonwebtoken';

const auth = async (request, response, next) => {
  try {
    let token =
      request.cookies?.accessToken ||
      (request.headers.authorization && request.headers.authorization.split(" ")[1]) ||
      request.query.token;

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
        error: true,
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decoded) {
      return response.status(401).json({
        message: "Unauthorized access",
        error: true,
        success: false
      });
    }

    request.userId = decoded.id;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return response.status(401).json({
      message: "Invalid or expired token",
      error: true,
      success: false
    });
  }
};

export default auth;
