export function validateChangePasswordForm(
  email,
  currentPassword,
  newPassword,
  confirmPassword
) {
  const errors = [];
  console.log(email);
  // Email validation
  if (!email) {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Email address is invalid");
  }

  // Current password validation
  if (!currentPassword) {
    errors.push("Current password is required");
  }

  // New password validation
  if (!newPassword) {
    errors.push("New password is required");
  } else if (newPassword.length < 8) {
    errors.push("New password must be at least 8 characters long");
  }
  // else if (!/[A-Z]/.test(newPassword)) {
  //   errors.push("New password must contain at least one uppercase letter");
  // } else if (!/[a-z]/.test(newPassword)) {
  //   errors.push("New password must contain at least one lowercase letter");
  // } else if (!/[0-9]/.test(newPassword)) {
  //   errors.push("New password must contain at least one number");
  // } else if (!/[\W_]/.test(newPassword)) {
  //   errors.push("New password must contain at least one special character");
  // }

  // Confirm password validation
  if (!confirmPassword) {
    errors.push("Confirm password is required");
  } else if (newPassword !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  return errors;
}
