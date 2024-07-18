import { Divider, Fade, Stack, Typography } from "@mui/material";
import Splash from "../components/widgets/splash";
import { useState } from "react";
import LoginBox from "../components/widgets/loginBox";
import ChatBox from "../components/chatbox/chatBox";
export default function Home() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  return (
    <Stack sx={{ position: "relative" }}>
      <ChatBox />
      {/* <Splash
        isDone={false}
        timeout={3000}
        onDone={() => setIsSplashDone(true)}
      />
      {isSplashDone && (
        <Stack width={"100%"} direction={"row"} gap={1}>
          <LoginBox />
          <Stack height={"100vh"} width={"300px"}>
            menu
          </Stack>
          <Stack sx={{ height: "100vh", width: "2px" }}>
            <Divider orientation="vertical" />
          </Stack>
          <Stack height={"100$"} width={"100%"}>
            body
          </Stack>
        </Stack>
      )} */}
    </Stack>
  );
}
