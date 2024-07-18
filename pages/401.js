import { BackHand, ErrorOutline } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography, Zoom } from "@mui/material";
import React from "react";
import { Styles, styles } from "../styles/useStyle";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

export default function Index() {
  const router = useRouter();

  const handleHome = () => {
    router.replace("/");
  };

  const handleLogout = () => {
    deleteCookie("user");
    router.replace("/authentication/login");
  };
  return (
    <Zoom in={true}>
      <Stack
        alignItems={"center"}
        height={"100vh"}
        justifyContent={"center"}
        gap={1}
      >
        <Paper>
          <Stack padding={2} gap={2} alignItems={"center"} minWidth={"400px"}>
            <Typography
              fontWeight={"bold"}
              textAlign={"center"}
              sx={{ color: Styles().error.main, fontSize: "100px" }}
            >
              401
            </Typography>
            <Typography variant="h6" textAlign={"center"}>
              Permission Required
            </Typography>
            <Divider flexItem />

            <BackHand sx={{ fontSize: "100px", color: Styles().error.main }} />
          </Stack>
          <Stack gap={1} direction={"row"} minWidth={"400px"} padding={2}>
            <Button fullWidth variant="contained" onClick={handleHome}>
              Home
            </Button>
            <Button fullWidth variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Zoom>
  );
}
