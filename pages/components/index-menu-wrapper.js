import { Button, Divider, Fade, Grid, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonPopover from "../../components/widgets/buttons/button_popover";
import BackgroundPattern from "./background-pattern";
import { LogoRow } from "../../icons/logo";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function IndexMenuWrapper({ children, page }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  const [isAuthDone, setIsAuthDone] = useState(false);
  useEffect(() => {
    if (isAuthDone === false) {
      if (status === "authenticated") {
        if (session.user) {
          setUser(session.user);
        }
        setIsAuthDone(true);
      } else if (status === "unauthenticated") {
        setIsAuthDone(true);
      }
    }
  }, [status]);

  const handleAuth = () => {
    if (user === null) {
      router.push("/sign-in");
    } else {
      signOut({ callbackUrl: "/" });
    }
  };

  const handleRoute = (nextRoute) => {
    router.push(`/${nextRoute}`);
  };

  return (
    <Stack height={"100vh"} sx={{ position: "relative" }} width="100%">
      <BackgroundPattern />
      <Grid container sx={{ position: "relative", zIndex: 2 }}>
        <Grid item xs={3}>
          <LogoRow
            sx={{
              width: "clamp(200px, 30vw, 40px)",
              height: "100%",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              width: "100%",
              height: "100px",
              overflow: "hidden",
            }}
          >
            <Button
              className={`br0 ${
                ["", "home"].includes(page) && "active-bottom"
              }`}
              size="large"
              sx={{ height: "100%", padding: 4 }}
              onClick={() => {
                handleRoute("");
              }}
            >
              Home
            </Button>
            <Button
              className="br0"
              size="large"
              sx={{ height: "100%", padding: 4 }}
            >
              About
            </Button>
            <Button
              className={`br0 ${["pricing"].includes(page) && "active-bottom"}`}
              size="large"
              sx={{ height: "100%", padding: 4 }}
              onClick={() => {
                handleRoute("pricing");
              }}
            >
              Pricing
            </Button>
            <Button
              className="br0"
              size="large"
              sx={{ height: "100%", padding: 4 }}
            >
              API Doc
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          {status !== "loading" && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              justifyContent={"flex-end"}
              height={"100%"}
              paddingX={2}
            >
              {user !== null ? (
                <>
                  Welcome Back
                  <ButtonPopover
                    variant="contained"
                    sx_button={{ paddingX: 1, paddingY: 0 }}
                    isIconButton={false}
                    label={`${user?.name}`}
                  >
                    <Stack paddingY={2} minWidth={"150px"}>
                      <MenuItem
                        size="small"
                        onClick={() => router.push("/profile")}
                      >
                        Profile
                      </MenuItem>
                      <Divider />
                      <MenuItem size="small" onClick={handleAuth}>
                        Sign-out
                      </MenuItem>
                    </Stack>
                  </ButtonPopover>
                </>
              ) : (
                <Button size="large" onClick={() => handleAuth()}>
                  Sign-in
                </Button>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
      <Divider />
      <Fade in={true}>
        <Stack height={"100%"} position={"relative"} zIndex={5}>
          {children}
        </Stack>
      </Fade>
    </Stack>
  );
}
