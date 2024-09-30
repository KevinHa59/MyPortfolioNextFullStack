import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import PaperForm from "../../components/widgets/paper/paper-form";
import Input from "../../components/widgets/input/Input";
import { useRouter } from "next/router";
import MyAPIs from "../api-functions/MyAPIs";
import { validateChangePasswordForm } from "../../utils/account";
import ErrorRenderer from "../../components/widgets/texts/error-renderer";
import ButtonLoading from "../../components/widgets/buttons/button-loading";
import { mainContext } from "../_app";
import { getCookie } from "cookies-next";
import { profileContext } from "../profile";

export default function PasswordChange({}) {
  const { mainData, updateMainData } = useContext(profileContext);
  const { user } = mainData;
  const router = useRouter();
  const { setNote } = useContext(mainContext);
  const [input, setInput] = useState({
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleUpdateInput = (newValue) => {
    setInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };
  const handleBackHome = () => {
    router.push("/");
  };

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    const _errors = validateChangePasswordForm(
      input.email,
      input.currentPassword,
      input.newPassword,
      input.confirmPassword
    );
    setErrors(_errors);
    if (_errors.length === 0) {
      const res = await MyAPIs.User().updatePassword(
        input.email,
        input.newPassword,
        input.currentPassword
      );
      if ([401, 400].includes(res.status)) {
        setErrors([res.data.err]);
      } else {
        setErrors([]);
        setNote.success("Change password success");
      }
    }
    setIsLoading(false);
  };

  const handleCreatePassword = async () => {
    if (
      input.newPassword.length > 0 &&
      input.newPassword === input.confirmPassword
    ) {
      setIsLoading(true);
      try {
        const res = await MyAPIs.User().updatePassword(
          input.email,
          input.newPassword
        );
        if ([401, 400].includes(res.status)) {
          setErrors([res.data.err]);
        } else {
          updateMainData({
            user: {
              ...mainData.user,
              ...res.data,
              hasPassword: true,
            },
          });
          handleUpdateInput({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setErrors([]);
          setNote.success("Create password success");
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      setErrors(["Invalid Password"]);
    }
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Paper className="normal" sx={{ padding: 4, minWidth: "300px" }}>
        <Stack gap={4}>
          <Typography fontWeight={"bold"}>
            {user?.hasPassword ? "Change" : "Create a"} Password
          </Typography>

          {user?.hasPassword === false && (
            <Typography
              variant="body2"
              textAlign={"center"}
              sx={{
                whiteSpace: "pre-wrap",
                paddingY: 2,
                color: "success.main",
                maxWidth: "400px",
              }}
            >{`Your account is currently set up to log in using [Google/Facebook/etc.], and does not have a password associated with it.
            \nIf you would like to use a password for future logins, please set one up now.
            \nAfter created a password, you still can log in using [Google/Facebook/etc.]`}</Typography>
          )}
          <Stack gap={1}>
            {user?.hasPassword === true && (
              <>
                <Input
                  id={"password"}
                  type={"password"}
                  value={input.currentPassword}
                  onChange={(e) =>
                    handleUpdateInput({ currentPassword: e.target.value })
                  }
                  label={"Current Password"}
                />
                <Divider />
              </>
            )}

            <Input
              type={"password"}
              value={input.newPassword}
              onChange={(e) =>
                handleUpdateInput({ newPassword: e.target.value })
              }
              label={"New Password"}
            />
            <Input
              type={"password"}
              value={input.confirmPassword}
              onChange={(e) =>
                handleUpdateInput({ confirmPassword: e.target.value })
              }
              label={"Confirm New Password"}
            />
            <ErrorRenderer errors={errors} />
          </Stack>

          <Stack direction={"row"} gap={1} padding={1} width={"100%"}>
            <ButtonLoading
              isLoading={isLoading}
              onClick={
                user.hasPassword === false
                  ? handleCreatePassword
                  : handleUpdatePassword
              }
              sx={{ width: "100%" }}
              size="small"
              variant="contained"
            >
              {user.hasPassword === false ? "Create" : "Change"}
            </ButtonLoading>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
