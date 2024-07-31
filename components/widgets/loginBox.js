import { DateRange, Email, Password, People } from "@mui/icons-material";
import {
  Button,
  Divider,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import UsersAPI from "../../pages/api-functions/UsersAPI";
import MyAPIs from "../../pages/api-functions/MyAPIs";

export default function LoginBox() {
  const [section, setSection] = useState(0);
  return (
    <Stack
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        transition: "ease-in-out 1s",
      }}
    >
      <Zoom in={true}>
        <Paper
          sx={{
            overflow: "hidden",
            width: "300px",
            position: "relative",
            transition: "ease-in-out 1s",
          }}
        >
          <Slide direction={"left"} in={section === 0}>
            <Stack>
              <LoginSection isActive={section === 0} />
            </Stack>
          </Slide>
          <Slide direction={"left"} in={section === 1}>
            <Stack>
              <ForgotPasswordSection isActive={section === 1} />
            </Stack>
          </Slide>
          <Slide direction={"left"} in={section === 2}>
            <Stack>
              <CreateAccountSection isActive={section === 2} />
            </Stack>
          </Slide>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            paddingX={2}
          >
            {section !== 0 && (
              <Link href={"#"} onClick={() => setSection(0)}>
                Login
              </Link>
            )}
            {section !== 1 && (
              <Link href={"#"} onClick={() => setSection(1)}>
                Forgot Password!
              </Link>
            )}
            {section !== 2 && (
              <Link href={"#"} onClick={() => setSection(2)}>
                Create Account
              </Link>
            )}
          </Stack>
        </Paper>
      </Zoom>
    </Stack>
  );
}

function LoginSection({ isActive }) {
  return (
    isActive && (
      <Stack
        alignItems={"center"}
        padding={2}
        gap={1}
        sx={{ position: "sticky", top: 0 }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          Login
        </Typography>
        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <People sx={{ paddingRight: 1 }} />,
          }}
          label="Email"
        />
        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Password sx={{ paddingRight: 1 }} />,
          }}
          label="Password"
        />
        <Stack width={"100%"}>
          <Divider />
        </Stack>
        <Button size="small" variant="contained" fullWidth>
          Login
        </Button>
      </Stack>
    )
  );
}
function ForgotPasswordSection({ isActive }) {
  return (
    isActive && (
      <Stack
        alignItems={"center"}
        padding={2}
        gap={1}
        sx={{ position: "sticky", top: 0 }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          Reset Password
        </Typography>
        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Email sx={{ paddingRight: 1 }} />,
          }}
          label="Email"
        />
        <Stack width={"100%"}>
          <Divider />
        </Stack>
        <Button size="small" variant="contained" fullWidth>
          Reset Password
        </Button>
      </Stack>
    )
  );
}

function CreateAccountSection({ isActive }) {
  const [input, setInput] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dob: "",
  });
  const [inputErrors, setInputErrors] = useState([]);

  const handleInputChange = (newValue) => {
    setInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleCreateAccount = async () => {
    const errors = verifyNewUser(
      input.email,
      input.confirmEmail,
      input.password,
      input.confirmPassword,
      input.firstName,
      input.lastName,
      input.dob
    );
    setInputErrors(errors);
    if (errors.length === 0) {
      const res = await MyAPIs.User().createUser(
        input.email,
        input.firstName,
        input.lastName,
        input.dob,
        input.password,
        2
      );
    } else {
    }
  };

  return (
    isActive && (
      <Stack
        alignItems={"center"}
        padding={2}
        gap={1}
        sx={{ position: "sticky", top: 0 }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          Create Account
        </Typography>
        <TextField
          value={input.email}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Email sx={{ paddingRight: 1 }} />,
          }}
          label="Email"
          onChange={(e) => handleInputChange({ email: e.target.value })}
        />
        <TextField
          value={input.confirmEmail}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Email sx={{ paddingRight: 1 }} />,
          }}
          label="Confirm Email"
          onChange={(e) => handleInputChange({ confirmEmail: e.target.value })}
        />
        <Stack width={"100%"}>
          <Divider />
        </Stack>
        <TextField
          value={input.password}
          fullWidth
          size="small"
          type="password"
          InputProps={{
            startAdornment: <Password sx={{ paddingRight: 1 }} />,
          }}
          label="Password"
          onChange={(e) => handleInputChange({ password: e.target.value })}
        />
        <TextField
          value={input.confirmPassword}
          fullWidth
          size="small"
          type="password"
          InputProps={{
            startAdornment: <Password sx={{ paddingRight: 1 }} />,
          }}
          label="Confirm Password"
          onChange={(e) =>
            handleInputChange({ confirmPassword: e.target.value })
          }
        />
        <Stack width={"100%"}>
          <Divider />
        </Stack>
        <TextField
          value={input.firstName}
          fullWidth
          size="small"
          label="First Name"
          onChange={(e) => handleInputChange({ firstName: e.target.value })}
        />
        <TextField
          value={input.lastName}
          fullWidth
          size="small"
          label="Last Name"
          onChange={(e) => handleInputChange({ lastName: e.target.value })}
        />
        <TextField
          value={input.dob}
          type="date"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <DateRange sx={{ paddingRight: 1 }} />,
          }}
          onChange={(e) => handleInputChange({ dob: e.target.value })}
        />
        <Stack width={"100%"}>
          <Divider />
        </Stack>
        <Button size="small" variant="contained" fullWidth>
          Create Account
        </Button>
      </Stack>
    )
  );
}

function verifyNewUser(
  email,
  confirmEmail,
  password,
  confirmPassword,
  firstName,
  lastName,
  dob
) {
  const errors = [];
  if (email.length === 0) {
    errors.push("Email is missing");
  } else {
    if (email !== confirmEmail) {
      errors.push("Email is mismatched");
    }
  }

  if (password.length === 0) {
    errors.push("Password is missing");
  } else {
    if (password !== confirmPassword) {
      errors.push("Password is mismatched");
    }
  }

  if (firstName.length === 0) {
    errors.push("Fist Name is missing");
  }
  if (lastName.length === 0) {
    errors.push("Last Name is missing");
  }
  if (dob.length === 0) {
    errors.push("Date of Birth is missing");
  }

  return errors;
}
