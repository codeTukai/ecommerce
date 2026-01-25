import jwt from "jsonwebtoken";

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    let token = null;

    // ✅ 1. Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ✅ 2. Fallback: Check cookie token
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // ✅ 3. Fallback: Check query param token
    if (!token && req.query?.token) {
      token = req.query.token;
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({
        message: "Access token missing",
        error: true,
        success: false,
      });
    }

    // ✅ 4. Verify Token
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decoded?.id) {
      return res.status(401).json({
        message: "Invalid token payload",
        error: true,
        success: false,
      });
    }

    // ✅ 5. Attach user info to request
    req.userId = decoded.id;
    req.token = token;
    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
      error: true,
      success: false,
    });
  }
};

export default auth;

