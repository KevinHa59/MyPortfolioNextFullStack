import { Button, Paper, Stack } from "@mui/material";
import React from "react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import NextAuth from "../api/auth/[...nextauth]";
export default function Index() {
  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Paper>
        <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
          Sign in with Google
        </Button>
      </Paper>
    </Stack>
  );
}
