const { useRouter } = require("next/router");
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import MyAPIs from "../pages/api-functions/MyAPIs";
import { CircularProgress, Stack } from "@mui/material";
import { useSession } from "next-auth/react";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession();
    useEffect(() => {
      if (status === "authenticated") {
        if (session.user) {
        }
        setIsLoading(false);
      } else if (status === "unauthenticated") {
        // check local session
        let localSession = sessionStorage.getItem("user");

        if (localSession) {
          setIsLoading(false);
        } else {
          router.replace("/401");
        }
      }
    }, [status]);

    if (isLoading) {
      return (
        <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
          <CircularProgress />
        </Stack>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
