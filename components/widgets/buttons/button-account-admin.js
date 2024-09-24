import React, { useContext, useEffect, useState } from "react";
import ButtonPopover from "./button_popover";
import {
  AccountCircle,
  AdminPanelSettings,
  Logout,
  Password,
  PeopleAlt,
  Person,
} from "@mui/icons-material";
import { Button, Divider, ListItemIcon, MenuItem, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { adminContext } from "../../../pages/admin";

export default function ButtonAccountAdmin() {
  const { mainData } = useContext(adminContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (mainData.user?.userType?.type === "Admin") {
      setIsAdmin(true);
      setUser(mainData.user);
    }
  }, [mainData]);

  return (
    <Stack>
      <ButtonPopover
        size="large"
        label={<AccountCircle sx={{ fontSize: "35px" }} />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack minWidth={"150px"} paddingY={1}>
          <RoutingButton
            Icon={Person}
            path={"/profile"}
            query={{ section: "profile", id: user?.id }}
            title={"User Profile"}
            router={router}
          />
          <Divider />
          <LogoutButton router={router} />
        </Stack>
      </ButtonPopover>
    </Stack>
  );
}
// user setting button
function RoutingButton({ Icon, path, query, title, router }) {
  const handleRoute = () => {
    router.push({
      pathname: path,
      query: query,
    });
  };
  return (
    <MenuItem onClick={handleRoute}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      {title}
    </MenuItem>
  );
}
// user setting button
function UserChangingPasswordButton({ router }) {
  const user = JSON.parse(getCookie("user"));

  const handleChangePassword = () => {
    router.push({
      pathname: "/authentication/password-change",
      query: {
        id: user.id,
      },
    });
  };

  return (
    <Button
      className="flex-start"
      size="small"
      startIcon={<Password />}
      onClick={handleChangePassword}
    >
      Change Password
    </Button>
  );
}
// logout button
function LogoutButton({ router }) {
  const handleLogout = () => {
    if (sessionStorage.getItem("user")) {
      sessionStorage.removeItem("user");
      router.push(`/`);
    } else {
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      Logout
    </MenuItem>
  );
}
