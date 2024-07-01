import jwt from "jsonwebtoken";
import sign from "jwt-encode";
const secret = process.env.NEXT_PUBLIC_TOKEN_KEY;

class JwtUtils {
  generateToken(payload) {
    return sign(payload, secret);
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
