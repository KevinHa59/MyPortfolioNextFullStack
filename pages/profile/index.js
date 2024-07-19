import { Button, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import { darkStyles } from "../../theme/dark-theme-options";
import { Article, Dashboard, Password, People } from "@mui/icons-material";

export default function Index() {
  const [menu, setMenu] = useState(menus[0].name);
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
              background: darkStyles.background.default,
              width: "100%",
              height: "100%",
              padding: 2,
            }}
          >
            right
          </Paper>
        </Stack>
      </Stack>
    </Paper>
  );
}
const menus = [
  {
    icon: <Dashboard color="error" />,
    name: "Dashboard",
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
            onClick={() => onMenuChange(m.name)}
            size="large"
            className={`br0 flex-start ${selectedMenu !== m.name && "bw"}`}
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
