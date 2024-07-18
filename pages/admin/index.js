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
import ButtonAccount from "../../components/widgets/buttons/button-account";

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
    <Stack height={"100vh"} gap={"1px"}>
      <Paper className="flat" sx={{ zIndex: 2 }}>
        <Stack
          height={"40px"}
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          paddingX={2}
        >
          <ThemeButton />
          <ButtonAccount />
        </Stack>
      </Paper>
      <Divider />
      <Stack
        zIndex={1}
        direction={"row"}
        height={"calc(100vh - 40px)"}
        // gap={"1px"}
      >
        <Stack height={"100%"} width="250px">
          <Menu />
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          height={"100%"}
          width={"100%"}
          paddingX={2}
          paddingBottom={"15px"}
          sx={{ overflowY: "auto" }}
        >
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

  return (
    <Slide
      in={true}
      direction="right"
      height="100%"
      style={{ transitionDelay: 100 }}
    >
      <Stack
        paddingY={3}
        // className={"dark"}
        sx={{
          // color: "#fff",
          overflowY: "auto",
        }}
      >
        {menu_data.map((menu, index) => {
          return (
            <>
              <Button
                key={index}
                color="inherit"
                className={
                  router.query.section === menu.param ? "active" : "inactive"
                }
                sx={{
                  display: "flex",
                  gap: 1,
                  // flexDirection: "column",
                  justifyContent: "flex-start",
                  transition: "ease 0.1s",
                  paddingX: 2,
                  minWidth: 0,
                  borderRadius: 0,
                  whiteSpace: "nowrap",
                  textTransform: "none",
                }}
                onClick={() => handleRoute(menu.param)}
              >
                {menu.Icon}
                <Typography
                  variant="body2"
                  sx={{
                    color: "inherit",
                  }}
                >
                  {menu.title}
                </Typography>
              </Button>
              {/* {index < menu_data.length && <Divider />} */}
            </>
          );
        })}
      </Stack>
    </Slide>
  );
}

export default withAuth(Index);
