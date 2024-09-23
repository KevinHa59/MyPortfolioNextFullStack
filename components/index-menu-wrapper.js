import {
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonPopover from "./widgets/buttons/button_popover";
import BackgroundPattern from "./background-pattern";
import { LogoRow } from "../icons/logo";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import ButtonDialog from "./widgets/buttons/button_dialog";
import {
  AccountBox,
  AdminPanelSettings,
  Facebook,
  GitHub,
  Google,
  LogoutOutlined,
} from "@mui/icons-material";
import MyAPIs from "../pages/api-functions/MyAPIs";
import { pages } from "../pages/[page]";
import ButtonLoading from "./widgets/buttons/button-loading";

export default function IndexMenuWrapper({ children, page }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthDone, setIsAuthDone] = useState(false);
  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthDone === false) {
      if (status === "authenticated") {
        if (session.user) {
          checkUser(session.user.email, session.user);
        } else {
          setIsAuthDone(true);
        }
      } else if (status === "unauthenticated") {
        // check manually login session
        let localSession = sessionStorage.getItem("user");
        if (localSession) {
          localSession = atob(localSession);
          localSession = JSON.parse(localSession);
          checkUser(localSession.email, localSession);
        }
        setIsAuthDone(true);
      }
    }
  }, [status, isAuthDone]);

  async function checkUser(email, user) {
    try {
      const res = await MyAPIs.User().getUserByEmail(email);
      setUser(res.data);
      setIsAuthDone(true);
    } catch (error) {
      console.log(error);
      setIsAuthDone(true);
    }
  }

  const handleSignOut = () => {
    if (sessionStorage.getItem("user")) {
      sessionStorage.removeItem("user");
      router.push(`/${router.query.page}`);
      setUser(null);
    } else {
      signOut({ callbackUrl: `/${router.query.page}` });
    }
  };

  const handleRoute = (nextRoute) => {
    router.push(`/${nextRoute}`);
  };

  const handleSignInChange = (newValue) => {
    setSignInInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };
  const handleSignIn = async () => {
    setIsLogin(true);
    const res = await MyAPIs.User().login(
      signInInput.email,
      signInInput.password
    );
    if (res?.data) {
      const session = res.data.session;
      sessionStorage.setItem("user", btoa(JSON.stringify(session)));
      setIsAuthDone(false);
    }

    setIsLogin(false);
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
            {Object.keys(pages).map((menu, index) => {
              return (
                <Button
                  key={index}
                  className={`br0 ${[menu].includes(page) && "active-bottom"}`}
                  size="large"
                  sx={{ height: "100%", padding: 4 }}
                  onClick={() => {
                    handleRoute(menu);
                  }}
                >
                  {menu.toUpperCase()}
                </Button>
              );
            })}
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
              {isAuthDone === false ? (
                <CircularProgress sx={{ fontSize: "5px" }} />
              ) : user !== null ? (
                <>
                  Welcome Back
                  <ButtonPopover
                    variant="contained"
                    sx_button={{ paddingX: 1, paddingY: 0 }}
                    isIconButton={false}
                    label={`${
                      user?.name || `${user?.firstName}${user?.lastName || ""}`
                    }`}
                  >
                    <Stack paddingY={2} minWidth={"150px"}>
                      <MenuItem
                        size="small"
                        onClick={() => router.push("/profile")}
                      >
                        <ListItemIcon>
                          <AccountBox />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      {user?.userType?.type === "Admin" && (
                        <MenuItem
                          size="small"
                          onClick={() => router.push("/admin")}
                        >
                          <ListItemIcon>
                            <AdminPanelSettings />
                          </ListItemIcon>
                          Admin Dashboard
                        </MenuItem>
                      )}
                      <Divider />
                      <MenuItem size="small" onClick={handleSignOut}>
                        <ListItemIcon>
                          <LogoutOutlined />
                        </ListItemIcon>
                        Sign-out
                      </MenuItem>
                    </Stack>
                  </ButtonPopover>
                </>
              ) : (
                <ButtonDialog button_label="Sign-in" size="large">
                  <Stack padding={4} gap={3} minWidth="350px">
                    <Typography variant="body2" fontWeight={"bold"}>
                      Sign-in
                    </Typography>
                    <Stack gap={1} paddingX={2}>
                      <TextField
                        value={signInInput.email}
                        size="small"
                        label={"Email"}
                        onChange={(e) =>
                          handleSignInChange({ email: e.target.value })
                        }
                      />
                      <TextField
                        value={signInInput.password}
                        size="small"
                        label={"Password"}
                        onChange={(e) =>
                          handleSignInChange({ password: e.target.value })
                        }
                      />
                      <ButtonLoading
                        isLoading={isLogin}
                        variant="contained"
                        onClick={handleSignIn}
                      >
                        Sign In
                      </ButtonLoading>
                    </Stack>
                    <Divider />
                    <Stack gap={2} paddingX={2}>
                      <Button
                        startIcon={<Google />}
                        variant="contained"
                        onClick={() => {
                          signIn("google", {
                            callbackUrl: `/${router.query.page}`,
                          });
                        }}
                      >
                        Sign In with Google
                      </Button>
                      <Button
                        disabled={true}
                        startIcon={<GitHub />}
                        variant="contained"
                      >
                        Sign In with Github
                      </Button>
                      <Button
                        startIcon={<Facebook />}
                        variant="contained"
                        onClick={() =>
                          signIn("facebook", {
                            callbackUrl: `/${router.query.page}`,
                          })
                        }
                      >
                        Sign In with Facebook
                      </Button>
                    </Stack>
                  </Stack>
                </ButtonDialog>
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

async function createUser(
  email,
  firstName,
  lastName = "",
  dbo = null,
  password = null
) {
  try {
    const res = await MyAPIs.User().createUser(
      email,
      firstName,
      lastName,
      dbo,
      password
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}
