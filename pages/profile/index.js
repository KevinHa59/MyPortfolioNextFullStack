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

export const profileContext = createContext(null);

function Index() {
  const router = useRouter();
  const [section, setSection] = useState(undefined);
  const [mainData, setMainData] = useState({
    user: null,
  });

  useEffect(() => {
    const _section = router.query.section;

    if (router.isReady === true) {
      initData();
      const _section = router.query.section;
      if (_section && _section !== section) {
        setSection(_section);
      } else if (section === null) {
        setSection("dashboard");
        router.push({
          pathname: router.pathname,
          query: {
            section: "dashboard",
          },
        });
      }
    }
  }, [router]);

  async function initData() {
    let userData = getCookie("user");
    if (userData) {
      userData = JSON.parse(userData);
      handleUpdateMainData({ user: userData });
    }
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
      <Stack height={"100vh"} gap={"1px"} width={"clamp(500px, 100%, 100%)"}>
        <Stack zIndex={1} direction={"row"} height={"100%"}>
          <Stack height={"100%"} width="300px">
            <Paper className="flat" sx={{ zIndex: 2, height: "100%" }}>
              <MenuRenderer value={menu_profile} />
            </Paper>
          </Stack>
          <Stack
            height={"100%"}
            width={"100%"}
            paddingBottom={"15px"}
            sx={{ overflowY: "auto" }}
          >
            <Stack
              height={"60px"}
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <ThemeButton />
              <ButtonAccount />
            </Stack>
            <Divider />
            <Stack
              height={"calc(100% - 65px)"}
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
