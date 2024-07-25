import { Button, Paper, Slide, Stack, Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import {
  ArrowRight,
  Article,
  Dashboard as DashboardIcon,
  Password,
  People,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Dashboard from "../../components/profile/dashboard";
import ThemeButton from "../../components/widgets/themeButton";
import ButtonAccount from "../../components/widgets/buttons/button-account";
import PasswordChange from "../authentication/password-change";
import Resume from "../../components/profile/resume";

const menu_data = [
  {
    Icon: DashboardIcon,
    title: "Dashboard",
    param: "dashboard",
    Comp: <Dashboard />,
  },
  {
    Icon: People,
    title: "Profile",
    param: "profile",
  },
  {
    Icon: Article,
    title: "Resume",
    param: "resume",
    Comp: <Resume />,
  },
  {
    Icon: Password,
    title: "Change Password",
    param: "changePassword",
    Comp: <PasswordChange useLoggedInUser={true} />,
  },
];

export const profileContext = createContext(null);

export default function Index() {
  const router = useRouter();
  const [section, setSection] = useState(undefined);
  const [mainData, setMainData] = useState({
    user: null,
  });
  useEffect(() => {
    const _section = router.query.section;

    if (router.isReady === true) {
      initData();
      if (_section && _section !== section) {
        setSection(_section);
        router.push({
          pathname: router.pathname,
          query: {
            section: _section,
          },
        });
      } else if (section === undefined) {
        setSection("dashboard");
        router.push({
          pathname: router.pathname,
          query: {
            section: "dashboard",
          },
        });
      }
    }
  }, [router]);

  function initData() {
    let userData = getCookie("user");
    if (userData) {
      userData = JSON.parse(userData);
      handleUpdateMainData({ user: userData });
    }
  }

  function handleUpdateMainData(newValue) {
    setMainData((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  }

  return (
    <profileContext.Provider value={{ mainData: mainData }}>
      <Stack height={"100vh"} gap={"1px"}>
        <Stack zIndex={1} direction={"row"} height={"100%"}>
          <Stack height={"100%"} width="300px" padding={2}>
            <Paper className="flat" sx={{ zIndex: 2, height: "100%" }}>
              <Menu />
            </Paper>
          </Stack>
          <Stack
            height={"100%"}
            width={"100%"}
            paddingX={2}
            paddingBottom={"15px"}
            sx={{ overflowY: "auto" }}
          >
            <Stack
              height={"60px"}
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              paddingX={2}
            >
              <ThemeButton />
              <ButtonAccount />
            </Stack>
            <Stack height={"calc(100% - 60px)"} sx={{ overflowY: "auto" }}>
              {menu_data.find((menu) => menu.param === section)?.Comp}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </profileContext.Provider>
  );
}

function Menu() {
  const router = useRouter();

  const handleRoute = (section) => {
    router.push({
      pathname: router.pathname,
      query: {
        section: section,
      },
    });
  };

  return (
    <Stack
      paddingY={3}
      gap={2}
      alignItems={"center"}
      sx={{
        overflowY: "auto",
      }}
    >
      {menu_data.map((menu, index) => {
        return (
          <Slide
            key={index}
            in={true}
            direction="right"
            height="100%"
            style={{ transitionDelay: 50 * index }}
          >
            <Stack>
              <Button
                key={index}
                color="inherit"
                className={
                  router.query.section === menu.param ? "active" : "inactive"
                }
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-start",
                  transition: "ease 0.1s",
                  width: "180px",
                  position: "relative",
                }}
                onClick={() => {
                  handleRoute(menu.param);
                }}
              >
                <Slide
                  direction="right"
                  in={router.query.section === menu.param}
                >
                  <ArrowRight sx={{ position: "absolute", right: "95%" }} />
                </Slide>
                <menu.Icon fontSize="15px" />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  {menu.title}
                </Typography>
              </Button>
            </Stack>
          </Slide>
        );
      })}
    </Stack>
  );
}
