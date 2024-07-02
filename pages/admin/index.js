import { Button, Divider, Link, Paper, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserTypes from "../../components/admin/user-types";
import { useRouter } from "next/router";
import Users from "../../components/admin/users";
import Resumes from "../../components/admin/resumes";

const menu_data = [
  {
    title: "User Types",
    param: "userTypes",
    Comp: <UserTypes />,
  },
  {
    title: "Users",
    param: "users",
    Comp: <Users />,
  },
  {
    title: "Resumes",
    param: "resumes",
    Comp: <Resumes />,
  },
];

export default function Index() {
  const router = useRouter();
  const [section, setSection] = useState(null);

  useEffect(() => {
    const _section = router.query.section;
    if (_section && _section !== section) {
      setSection(_section);
    }
  }, [router]);

  return (
    <Stack direction={"row"} height={"100vh"}>
      <Stack height={"100%"} minWidth={"200px"}>
        <Paper sx={{ height: "100%", borderRadius: 0, overflowY: "auto" }}>
          <Menu />
        </Paper>
      </Stack>
      <Stack height={"100vh"} width={"100%"} sx={{ overflowY: "auto" }}>
        {menu_data.find((menu) => menu.param === section)?.Comp}
      </Stack>
    </Stack>
  );
}

function Menu() {
  const theme = useTheme();

  const [menuParam, setMenuParam] = useState(null);
  const router = useRouter();

  const handleRoute = (section) => {
    setMenuParam(section);
    router.push({
      pathname: router.pathname,
      query: {
        section: section,
      },
    });
  };

  return (
    <Stack paddingY={2}>
      {menu_data.map((menu, index) => {
        return (
          <Button
            key={index}
            size="small"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              transition: "ease 0.1s",
              // padding: 0,
              minWidth: 0,
              borderRadius: 0,
              borderLeft:
                menuParam === menu.param
                  ? `10px solid ${theme.palette.primary.main}`
                  : "0px solid transparent",
            }}
            onClick={() => handleRoute(menu.param)}
          >
            {menu.title}
          </Button>
        );
      })}
    </Stack>
  );
}
