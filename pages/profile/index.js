import { Divider, Paper, Stack } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import ThemeButton from "../../components/widgets/themeButton";
import ButtonAccount from "../../components/widgets/buttons/button-account";
import withAuth from "../../utils/withAuth";
import MenuRenderer, {
  findComponentByParam,
} from "../components/menu-renderer";
import { menu_profile } from "../components/menu-profile";
import { useSession } from "next-auth/react";
import MyAPIs from "../api-functions/MyAPIs";
import { LogoRow } from "../../icons/logo";

export const profileContext = createContext(null);

function Index() {
  const router = useRouter();
  const [section, setSection] = useState(undefined);
  const { data: session, status } = useSession();
  const [mainData, setMainData] = useState({
    user: null,
  });

  useEffect(() => {
    const _section = router.query.section;

    if (router.isReady === true) {
      const _section = router.query.section;
      if (_section && _section !== section) {
        setSection(_section);
      } else if (section === null) {
        setSection("profile");
        router.push({
          pathname: router.pathname,
          query: {
            section: "profile",
          },
        });
      }
    }
  }, [router]);

  useEffect(() => {
    if (status === "authenticated") {
      getUser(session.user);
      setSection("profile");
      router.push({
        pathname: router.pathname,
        query: {
          section: "profile",
        },
      });
    } else if (status === "unauthenticated") {
      router.push({ pathname: "/401" });
    }
  }, [status]);

  async function getUser(user) {
    try {
      const _user = await MyAPIs.User().getUserByEmail(user.email);
      handleUpdateMainData({ user: _user.data });
    } catch (error) {}
  }

  function handleUpdateMainData(newValue) {
    setMainData((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  }

  return (
    <profileContext.Provider value={{ mainData: mainData }}>
      <Stack height={"100vh"} width={"clamp(500px, 100%, 100%)"}>
        <Paper variant="outlined">
          <Stack
            height={"60px"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack height={"60px"}>
              <LogoRow
                sx={{
                  width: "clamp(100px, 30vw, 200px)",
                  height: "100%",
                }}
              />
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <ThemeButton />
              <ButtonAccount />
            </Stack>
          </Stack>
        </Paper>
        <Divider />
        <Stack zIndex={1} direction={"row"} height={"calc(100% - 63px)"}>
          <Stack height={"100%"} width="300px">
            <Paper
              variant="outlined"
              className="br0"
              sx={{ zIndex: 2, height: "100%", paddingY: 4 }}
            >
              <MenuRenderer value={menu_profile} />
            </Paper>
          </Stack>

          <Stack height={"100%"} width={"100%"} sx={{ overflowY: "auto" }}>
            <Stack
              height={"100%"}
              sx={{
                scrollBehavior: "smooth",
              }}
            >
              {findComponentByParam(section, menu_profile)}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </profileContext.Provider>
  );
}

export default withAuth(Index);
