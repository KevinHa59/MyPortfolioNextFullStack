import { Checkbox, Divider, FormControlLabel, Stack } from "@mui/material";
import React, { useState } from "react";
import PaperForm from "../../components/widgets/paper/paper-form";
import Input from "../../components/widgets/input/input";
import ButtonLoading from "../../components/widgets/buttons/button-loading";
import MyAPIs from "../api-functions/MyAPIs";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLogin, setIsLogin] = useState(false);
  // const cookies = getCookie("user");

  const handleInputChange = (newValue) => {
    setLoginInput((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleLogin = async () => {
    setIsLogin(true);
    const res = await MyAPIs.User().login(
      loginInput.email,
      loginInput.password
    );
    if (res) {
      const currentPath = localStorage.getItem("redirectPath")
        ? localStorage.getItem("redirectPath")
        : "/";
      router.push(currentPath);
      // Clear the stored path after successful login
      localStorage.removeItem("redirectPath");
    }

    setIsLogin(false);
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
    >
      <PaperForm title={"Login"}>
        <Stack gap={1} paddingY={1} alignItems={"center"}>
          <Stack gap={2} paddingX={2}>
            <Input
              value={loginInput.email}
              onChange={(e) => handleInputChange({ email: e.target.value })}
              label={"Email"}
              size="small"
            />
            <Input
              value={loginInput.password}
              onChange={(e) => handleInputChange({ password: e.target.value })}
              label={"Password"}
              type={"password"}
              size="small"
            />
            <FormControlLabel
              checked={loginInput.rememberMe}
              control={
                <Checkbox
                  defaultChecked
                  color="default"
                  onChange={(e) =>
                    handleInputChange({ rememberMe: e.target.checked })
                  }
                />
              }
              label="Remember Me"
            />
          </Stack>
          <ButtonLoading
            isLoading={isLogin}
            onClick={handleLogin}
            size="small"
            variant={"contained"}
          >
            Login
          </ButtonLoading>
        </Stack>
      </PaperForm>
    </Stack>
  );
}
