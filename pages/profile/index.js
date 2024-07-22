import { Button, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { darkStyles } from "../../theme/dark-theme-options";
import {
  Article,
  Dashboard as DashboardIcon,
  Password,
  People,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Dashboard from "../../components/profile/dashboard";
import { StyleMode } from "../../styles/useStyle";
import { lightStyles } from "../../theme/light-theme-options";

export default function Index() {
  const [menu, setMenu] = useState(menus[0]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    let userData = getCookie("user");
    if (userData) {
      userData = JSON.parse(userData);
      setUser(userData);
    }
  }, []);

  return (
    <Paper sx={{ height: "100vh" }}>
      <Stack height={"60px"}>main menu</Stack>
      <Stack height={"calc(100% - 60px)"} width={"100%"} direction={"row"}>
        <Stack minWidth={"250px"}>
          <Menu selectedMenu={menu} onMenuChange={setMenu} />
        </Stack>
        <Stack width={"100%"} padding={5} paddingTop={0} paddingLeft={0}>
          <Paper
            className="flat"
            sx={{
              background: StyleMode(
                darkStyles.background.default,
                lightStyles.background.default
              ),
              width: "100%",
              height: "100%",
              padding: 4,
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            {user && menu.Comp && <menu.Comp data={user} />}
          </Paper>
        </Stack>
      </Stack>
    </Paper>
  );
}
const menus = [
  {
    icon: <DashboardIcon color="error" />,
    name: "Dashboard",
    Comp: Dashboard,
  },
  {
    icon: <People color="info" />,
    name: "Profile",
  },
  {
    icon: <Article color="warning" />,
    name: "Resume",
  },
  {
    icon: <Password color="secondary" />,
    name: "Change Password",
  },
];
function Menu({ selectedMenu, onMenuChange }) {
  return (
    <Stack>
      {menus.map((m, index) => {
        return (
          <Button
            onClick={() => onMenuChange(m)}
            size="large"
            className={`br0 flex-start ${selectedMenu.name !== m.name && "bw"}`}
            fullWidth
            key={index}
            startIcon={m.icon}
          >
            {m.name}
          </Button>
        );
      })}
    </Stack>
  );
}
