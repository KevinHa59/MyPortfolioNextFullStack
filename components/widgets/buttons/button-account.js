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
import { Button, Divider, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { profileContext } from "../../../pages/profile";

export default function ButtonAccount() {
  const { mainData } = useContext(profileContext);
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
        <Stack padding={1} minWidth={"150px"}>
          <RoutingButton
            Icon={Person}
            path={"/profile"}
            query={{ section: "profile", id: user?.id }}
            title={"User Profile"}
            router={router}
          />
          <RoutingButton
            Icon={Password}
            path={"/profile"}
            query={{ section: "changePassword" }}
            title={"Change Password"}
            router={router}
          />
          <Divider />
          {isAdmin && (
            <RoutingButton
              Icon={AdminPanelSettings}
              path={"/admin"}
              query={{ section: "dashboard" }}
              title={"Admin"}
              router={router}
            />
          )}

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
    <Button
      className="flex-start"
      size="small"
      startIcon={<Icon />}
      onClick={handleRoute}
    >
      {title}
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
    signOut({ callbackUrl: "/" });
    // router.reload();
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
