import React from "react";
import ButtonPopover from "./button_popover";
import {
  AccountCircle,
  Logout,
  Password,
  PeopleAlt,
  Person,
} from "@mui/icons-material";
import { Button, Divider, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";

export default function ButtonAccount() {
  const router = useRouter();
  return (
    <ButtonPopover
      size="large"
      label={
        <Button sx={{ padding: 0, minWidth: 0, borderRadius: "50%" }}>
          <AccountCircle sx={{ fontSize: "35px" }} />
        </Button>
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Stack padding={1} minWidth={"150px"}>
        <UserProfileButton router={router} />
        <UserChangingPasswordButton router={router} />
        <Divider />
        <LogoutButton router={router} />
      </Stack>
    </ButtonPopover>
  );
}
// user setting button
function UserProfileButton({ router }) {
  const user = JSON.parse(getCookie("user"));
  const handleViewUserSettings = () => {
    router.push({
      pathname: "/profile",
      query: {
        id: user.id,
      },
    });
  };
  return (
    <Button
      className="flex-start"
      size="small"
      startIcon={<Person />}
      onClick={handleViewUserSettings}
    >
      User Profile
    </Button>
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
    deleteCookie("user");
    router.reload();
  };

  return (
    <Button
      className="flex-start"
      size="small"
      startIcon={<Logout />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
