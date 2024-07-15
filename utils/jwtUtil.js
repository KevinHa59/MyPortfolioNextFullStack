import sign from "jwt-encode";
import { jwtDecode } from "jwt-decode";
const jwt = require("jsonwebtoken");
const secret = process.env.NEXT_PUBLIC_TOKEN_KEY;

class JwtUtils {
  generateRefreshToken(email) {
    return jwt.sign({ email: email }, secret);
  }
  // generateToken(payload) {
  //   return sign(payload, secret);
  // }
  generateAccessToken(email) {
    return jwt.sign({ email: email }, secret, {
      expiresIn: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE_TIME,
    });
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
