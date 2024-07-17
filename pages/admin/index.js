import {
  Button,
  Collapse,
  Divider,
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

const menu_data = [
  {
    title: "Dashboard",
    param: "dashboard",
    Icon: <DashboardCustomize />,
    Comp: <Dashboard />,
  },
  {
    title: "User Types",
    param: "userTypes",
    Icon: <Hub />,
    Comp: <UserTypes />,
  },
  {
    title: "Pages",
    param: "pages",
    Icon: <PagesRounded />,
    Comp: <Pages />,
  },
  {
    title: "Permissions",
    param: "permissions",
    Icon: <AdminPanelSettings />,
    Comp: <Permissions />,
  },
  {
    title: "Users",
    param: "users",
    Icon: <People />,
    Comp: <Users />,
  },
  {
    title: "Resumes",
    param: "resumes",
    Icon: <Article />,
    Comp: <Resumes />,
  },
];

function Index() {
  const style = useStyle();
  const router = useRouter();
  const [section, setSection] = useState(null);
  const theme = useTheme();
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
    <Stack height={"100vh"}>
      <Stack
        height={"40px"}
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        paddingX={2}
        // className={getMode()}
      >
        <ThemeButton />
      </Stack>
      <Divider />
      <Stack direction={"row"} height={"calc(100vh - 40px)"}>
        <Stack
          height={"max-content"}
          paddingY={2}
          sx={{
            borderRadius: 0,
            // overflowY: "auto",
          }}
        >
          <Menu />
        </Stack>
        <Stack height={"100%"} width={"100%"} sx={{ overflowY: "auto" }}>
          {menu_data.find((menu) => menu.param === section)?.Comp}
        </Stack>
      </Stack>
    </Stack>
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

  const handleLogout = () => {
    deleteCookie("user");
    router.reload();
  };

  return (
    <Slide in={true} direction="right" style={{ transitionDelay: 100 }}>
      <Stack
        paddingY={3}
        className={getMode()}
        sx={{
          color: "#fff",
          borderRadius: "0 20px 20px 0",

          overflowY: "auto",
        }}
      >
        {menu_data.map((menu, index) => {
          return (
            <>
              <Button
                key={index}
                color="inherit"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  transition: "ease 0.1s",
                  padding: 1,
                  minWidth: 0,
                  borderRadius: 0,
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  color: router.query.section === menu.param ? "#000" : "#fff",
                  background:
                    router.query.section === menu.param
                      ? "#fff"
                      : styles.background.menu,
                }}
                onClick={() => handleRoute(menu.param)}
              >
                {menu.Icon}
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  sx={{
                    color: "inherit",
                  }}
                >
                  {menu.title}
                </Typography>
              </Button>
              {index < menu_data.length && <Divider />}
            </>
          );
        })}
        <Button
          variant={"text"}
          color="inherit"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            transition: "ease 0.1s",
            padding: 1,
            minWidth: 0,
            borderRadius: 0,
            whiteSpace: "nowrap",
            textTransform: "none",
            color: "#fff",
          }}
          onClick={() => handleLogout()}
        >
          <Logout />
          <Typography
            fontWeight={"bold"}
            variant="body2"
            sx={{ color: "#fff" }}
          >
            Logout
          </Typography>
        </Button>
      </Stack>
    </Slide>
  );
}

export default withAuth(Index);
