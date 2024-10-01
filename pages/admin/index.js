import {
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Fade,
  Link,
  Paper,
  Slide,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import UserTypes from "../../components/admin/user-types";
import { useRouter } from "next/router";
import Users from "../../components/admin/users";
import Resumes from "../../components/admin/resumes";
import useStyle, { styles } from "../../styles/useStyle";
import {
  AdminPanelSettings,
  ArrowRight,
  Article,
  DashboardCustomize,
  Hub,
  Logout,
  PagesRounded,
  People,
} from "@mui/icons-material";
import withAuth from "../../utils/withAuth";
import { deleteCookie, getCookie } from "cookies-next";
import Pages from "../../components/admin/pages";
import Permissions from "../../components/admin/permissions";
import Dashboard from "../../components/admin/dashboard";
import ThemeButton, { getMode } from "../../components/widgets/themeButton";
import ButtonAccount from "../../components/widgets/buttons/button-account";
import Courses from "../../components/admin/courses";
import MenuRenderer, {
  findComponentByParam,
} from "../../components/menu-renderer";
import { menu_admin } from "../../components/menu-admin";
import { LogoRow } from "../../icons/logo";
import { useSession } from "next-auth/react";
import MyAPIs from "../api-functions/MyAPIs";
import ButtonAccountAdmin from "../../components/widgets/buttons/button-account-admin";
import axios from "axios";

const menu_data = [
  {
    title: "Dashboard",
    param: "dashboard",
    Icon: DashboardCustomize,
    Comp: <Dashboard />,
  },
  {
    title: "User Types",
    param: "userTypes",
    Icon: Hub,
    Comp: <UserTypes />,
  },
  {
    title: "Pages",
    param: "pages",
    Icon: PagesRounded,
    Comp: <Pages />,
  },
  {
    title: "Permissions",
    param: "permissions",
    Icon: AdminPanelSettings,
    Comp: <Permissions />,
  },
  {
    title: "Users",
    param: "users",
    Icon: People,
    Comp: <Users />,
  },
  {
    title: "Resumes",
    param: "resumes",
    Icon: Article,
    Comp: <Resumes />,
  },
  {
    title: "Courses",
    param: "courses",
    Icon: Article,
    Comp: <Courses />,
  },
];

export const adminContext = createContext(null);

function Index() {
  const router = useRouter();
  const [section, setSection] = useState(null);
  const [isInitDone, setIsInitDone] = useState(false);
  const { data: session, status } = useSession();
  const [mainData, setMainData] = useState({
    dashboard: null,
    user: null,
    resumes: null,
    users: null,
    userTypes: null,
    status: [],
    courses: null,
    pages: null,
    permissions: null,
    membershipTypes: null,
  });

  useEffect(() => {
    const _section = router.query.section;
    if (_section && _section !== section) {
      setSection(_section);
    } else if (section === null) {
      setSection("dashboard");
      router.push({
        pathname: router.pathname,
        query: {
          section: "dashboard",
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (status === "authenticated") {
      getUser(session.user);
    } else if (status === "unauthenticated") {
      // check local session
      let localSession = sessionStorage.getItem("user");

      if (localSession) {
        localSession = JSON.parse(atob(localSession));
        getUser(localSession);
        setSection("profile");
        router.push({
          pathname: router.pathname,
          query: {
            section: "profile",
          },
        });
      }
    }
  }, [status]);

  const initData = async () => {
    const APIs = [MyAPIs.Status().getStatus()];
    try {
      const res = await axios.all(APIs);

      const _status = res[0].data;

      handleUpdateMainData({
        status: _status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function getUser(user) {
    try {
      const _user = await MyAPIs.User().getUserByEmail(user.email);
      handleUpdateMainData({ user: _user.data });
      await initData(_user.data.id);
      setIsInitDone(true);
    } catch (error) {}
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
    <adminContext.Provider
      value={{
        router: router,
        mainData: mainData,
        updateMainData: handleUpdateMainData,
      }}
    >
      <Stack height={"100vh"} width={"clamp(500px, 100%, 100%)"}>
        <Paper>
          <Stack
            height={"60px"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack height={"60px"}>
              <Button className="hoverLink" onClick={() => router.push("/")}>
                <LogoRow
                  sx={{
                    width: "clamp(100px, 30vw, 200px)",
                    height: "100%",
                  }}
                />
              </Button>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <ThemeButton />
              <ButtonAccountAdmin />
            </Stack>
          </Stack>
        </Paper>
        <Stack
          zIndex={1}
          direction={"row"}
          height={"calc(100vh - 63px)"}
          width={"100%"}
          gap={"1px"}
        >
          <Stack height={"100%"} width="300px">
            <Paper
              className="br0 flat"
              sx={{ zIndex: 2, height: "100%", paddingY: 4, overflowY: "auto" }}
            >
              <MenuRenderer value={menu_admin} />
            </Paper>
          </Stack>
          <Stack height={"100%"} width={"100%"} sx={{ overflow: "auto" }}>
            {!isInitDone && (
              <Stack alignItems={"center"} width={"100%"}>
                <CircularProgress />
              </Stack>
            )}
            <Fade in={isInitDone}>
              <Stack
                height={"100%"}
                sx={{
                  scrollBehavior: "smooth",
                }}
              >
                {findComponentByParam(section, menu_admin)}
              </Stack>
            </Fade>
          </Stack>
        </Stack>
      </Stack>
    </adminContext.Provider>
  );
}

export function Menu() {
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
      // gap={2}
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
            <Stack width={"100%"}>
              <Button
                key={index}
                color="inherit"
                fullWidth
                className={`${
                  router.query.section === menu.param ? "active" : "inactive"
                } br0`}
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-start",
                  transition: "ease 0.1s",
                  // width: "150px",
                  position: "relative",
                }}
                onClick={() => handleRoute(menu.param)}
              >
                <Slide
                  direction="right"
                  in={router.query.section === menu.param}
                >
                  <ArrowRight sx={{ position: "absolute", right: "100%" }} />
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

export default withAuth(Index);
