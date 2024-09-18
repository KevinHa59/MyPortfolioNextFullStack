import {
  Button,
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
import React, { useEffect, useState } from "react";
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
} from "../components/menu-renderer";
import { menu_admin } from "../components/menu-admin";

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

function Index() {
  const router = useRouter();
  const [section, setSection] = useState(null);

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
  return (
    <Stack height={"100vh"} gap={"1px"} width={"clamp(500px, 100%, 100%)"}>
      <Stack zIndex={1} direction={"row"} height={"100%"} gap={2}>
        <Stack height={"100%"} width="300px">
          <Paper className="flat br0" sx={{ zIndex: 2, height: "100%" }}>
            <MenuRenderer value={menu_admin} />
            {/* <Menu /> */}
          </Paper>
        </Stack>
        <Stack
          height={"100%"}
          width={"100%"}
          // paddingX={2}
          // paddingBottom={"15px"}
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
            {findComponentByParam(section, menu_admin)}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
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
