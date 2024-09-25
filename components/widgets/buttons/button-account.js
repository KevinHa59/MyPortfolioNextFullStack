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
import { profileContext } from "../../../pages/profile";
import Image from "next/image";
import axios from "axios";

export default function ButtonAccount() {
  const { mainData } = useContext(profileContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // mainData.user && getAvatar(mainData.user.image);
    if (mainData.user?.userType?.type === "Admin") {
      setIsAdmin(true);
      setUser(mainData.user);
    }
  }, [mainData]);

  return (
    <Stack>
      <ButtonPopover
        variant="outlined"
        size="small"
        isIconButton={false}
        label={
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {user?.name}{" "}
            {user?.image ? (
              <Image
                src={user?.image}
                alt="Profile Picture"
                width={25} // Desired width
                height={25} // Desired height
                style={{ borderRadius: "50%" }} // Adjust styles as needed
                priority // Optional: for priority loading
              />
            ) : (
              <AccountCircle sx={{ fontSize: "25px" }} />
            )}
          </Stack>
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
        <Stack paddingY={1} minWidth={"150px"}>
          {isAdmin && (
            <>
              <RoutingButton
                Icon={AdminPanelSettings}
                path={"/admin"}
                query={{ section: "dashboard" }}
                title={"Admin"}
                router={router}
              />
              <Divider />
            </>
          )}

          <RoutingButton
            Icon={Password}
            path={"/profile"}
            query={{ section: "changePassword" }}
            title={"Change Password"}
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
