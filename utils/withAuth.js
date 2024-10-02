const { useRouter } = require("next/router");
import { useEffect, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { Logo } from "../icons/logo";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession();
    useEffect(() => {
      if (status === "authenticated") {
        if (session.user) {
          // verify path permission
          const pages = session.user.userType.pageLinks.map(
            (page) => page.path
          );
          if (!pages.includes(router.pathname)) {
            router.replace("/401");
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
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
          <Logo sx={{ fontSize: "150px" }} />
          <CircularProgress />
        </Stack>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
