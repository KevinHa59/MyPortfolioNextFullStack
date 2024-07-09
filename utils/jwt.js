import sign from "jwt-encode";
import { jwtDecode } from "jwt-decode";
const secret = process.env.NEXT_PUBLIC_TOKEN_KEY;

class JwtUtils {
  generateToken(payload) {
    return sign(payload, secret);
  }
  verifyToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
}

export default new JwtUtils();
