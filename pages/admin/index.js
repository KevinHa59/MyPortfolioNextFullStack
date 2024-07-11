import {
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserTypes from "../../components/admin/user-types";
import { useRouter } from "next/router";
import Users from "../../components/admin/users";
import Resumes from "../../components/admin/resumes";
import useStyle from "../../styles/useStyle";
import { Article, Hub, People } from "@mui/icons-material";

const menu_data = [
  {
    title: "User Types",
    param: "userTypes",
    Icon: <Hub />,
    Comp: <UserTypes />,
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

export default function Index() {
  const style = useStyle();
  const router = useRouter();
  const [section, setSection] = useState(null);

  useEffect(() => {
    const _section = router.query.section;
    if (_section && _section !== section) {
      setSection(_section);
    }
  }, [router]);

  return (
    <Stack height={"100vh"}>
      <Stack height={"40px"} sx={{ background: style.background.menu }}></Stack>
      <Stack
        direction={"row"}
        height={"calc(100vh - 40px)"}
        sx={{ background: style.background.default }}
      >
        <Stack
          height={"100%"}
          sx={{
            height: "100%",
            borderRadius: 0,
            overflowY: "auto",
            background: style.background.menu,
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

  return (
    <Stack paddingY={2} sx={{ color: "#fff" }}>
      {menu_data.map((menu, index) => {
        return (
          <>
            <Button
              key={index}
              variant={
                router.query.section === menu.param ? "contained" : "text"
              }
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
              onClick={() => handleRoute(menu.param)}
            >
              {menu.Icon}
              <Typography fontWeight={"bold"} variant="body2">
                {menu.title}
              </Typography>
            </Button>
            {index < menu_data.length - 1 && <Divider />}
          </>
        );
      })}
    </Stack>
  );
}
