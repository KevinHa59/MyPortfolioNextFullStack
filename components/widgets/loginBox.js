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
          label="Username"
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
  const [input, setInput] = useState({});

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
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Email sx={{ paddingRight: 1 }} />,
          }}
          label="Email"
        />
        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Email sx={{ paddingRight: 1 }} />,
          }}
          label="Confirm Email"
        />
        <Stack width={"100%"}>
          <Divider />
        </Stack>
        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Password sx={{ paddingRight: 1 }} />,
          }}
          label="Password"
        />
        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Password sx={{ paddingRight: 1 }} />,
          }}
          label="Confirm Password"
        />
        <Stack width={"100%"}>
          <Divider />
        </Stack>
        <TextField
          type="date"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <DateRange sx={{ paddingRight: 1 }} />,
          }}
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

async function createUser(
  email,
  firstName,
  lastName,
  dob,
  password,
  userTypeID
) {
  try {
    const res = UsersAPI.createUser(
      email,
      firstName,
      lastName,
      dob,
      password,
      userTypeID
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
