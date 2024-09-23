import {
  CircularProgress,
  Dialog,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAPIs from "../api-functions/MyAPIs";
import axios from "axios";
import SelectCustom from "../../components/widgets/select/select-custom";
import ButtonDialogConfirm from "../../components/widgets/buttons/button_dialog_confirm";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [isInit, setIsInit] = useState(true);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isInstallationRequired, setIsInstallationRequired] = useState(false);
  const [data, setData] = useState({
    users: [],
    adminID: "",
  });
  const [selectUser, setSelectUser] = useState(null);
  useEffect(() => {
    verifyInstallation();
  }, []);

  const verifyInstallation = async () => {
    try {
      const res = await MyAPIs.Auth().verifyInstallation();
      const result = res?.data?.isRequired || false;
      if (result === true) {
        const APIs = [MyAPIs.User().getUsers(), MyAPIs.User().getUserTypes()];
        const _data = await axios.all(APIs);
        console.log(_data);
        const _users = _data[0].data;
        const _types = _data[1].data;
        setData((prev) => {
          return {
            ...prev,
            users: _users,
            adminID: _types.find((type) => type.type === "Admin").id,
          };
        });
      } else {
        router.push("/");
      }
      setIsInit(false);
      setIsInstallationRequired(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async (setOpen) => {
    setIsUpdating(true);
    try {
      const res = await MyAPIs.User().updateType([selectUser], data.adminID);
      if (res?.data?.count > 0) {
        setOpen(false);
        router.push("/");
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
    }
  };

  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Dialog open={true}>
        <Stack padding={2}>
          {isInit ? (
            <CircularProgress />
          ) : isInstallationRequired ? (
            <Stack padding={2} variant="outlined" gap={2}>
              <Typography>
                There is no Admin, please select a user as Admin
              </Typography>
              <SelectCustom
                selected_value={selectUser}
                data={data.users}
                item_field={"email"}
                value_field={"id"}
                size="small"
                onChange={(value) => setSelectUser(value)}
              />
              <ButtonDialogConfirm
                isLoading={isUpdating}
                dialog_color={"warning"}
                dialog_message={
                  <Stack maxWidth={"400px"}>
                    <Typography
                      textAlign={"center"}
                      sx={{ whiteSpace: "pre-wrap" }}
                    >{`${
                      data?.users?.find((u) => u.id === selectUser)?.email
                    } will be Admin. Are you sure? \nThe Admin role is unique, and only the existing Admin can assign this role to another user.`}</Typography>
                  </Stack>
                }
                dialog_title={"Admin Selection"}
                onConfirm={handleConfirm}
              >
                Submit
              </ButtonDialogConfirm>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </Dialog>
    </Stack>
  );
}
