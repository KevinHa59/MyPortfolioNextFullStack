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

export default function PasswordChange({ useLoggedInUser = false }) {
  let user = getCookie("user");
  if (user) {
    user = JSON.parse(user);
  }
  const router = useRouter();
  const { setNote } = useContext(mainContext);
  const [input, setInput] = useState({
    email: useLoggedInUser ? user.email : "",
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
        input.newPassword
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
  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Paper sx={{ padding: 2, minWidth: "300px" }}>
        <Typography fontWeight={"bold"}>Change Password</Typography>
        <Divider />
        <Stack padding={2} gap={1}>
          <Input
            id="email"
            value={input.email}
            onChange={(e) => handleUpdateInput({ email: e.target.value })}
            label={"Email"}
          />
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
          <Input
            type={"password"}
            value={input.newPassword}
            onChange={(e) => handleUpdateInput({ newPassword: e.target.value })}
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

        <Divider />
        <Stack direction={"row"} gap={1} padding={1} width={"100%"}>
          <ButtonLoading
            isLoading={isLoading}
            onClick={handleUpdatePassword}
            sx={{ width: "100%" }}
            size="small"
            variant="contained"
          >
            Change
          </ButtonLoading>
          {useLoggedInUser === false && (
            <Button
              onClick={handleBackHome}
              fullWidth
              size="small"
              variant="contained"
            >
              Home
            </Button>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
