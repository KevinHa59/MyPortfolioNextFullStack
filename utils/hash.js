const bcrypt = require("bcrypt");
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(process.env.NEXT_PUBLIC_SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function verifyPassword(plainPassword, hashedPassword) {
  try {
    const isMatched = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatched;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}
