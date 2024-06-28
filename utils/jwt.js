import jwt from "jsonwebtoken";

const secret = process.env.NEXT_PUBLIC_TOKEN_KEY;

class JwtUtils {
  generateToken(payload) {
    return jwt.sign(payload, secret);
  }
  verifyToken(token) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}

export default new JwtUtils();
