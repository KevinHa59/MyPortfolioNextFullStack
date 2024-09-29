import {
  CircularProgress,
  Divider,
  Fade,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import ThemeButton from "../../components/widgets/themeButton";
import ButtonAccount from "../../components/widgets/buttons/button-account";
import withAuth from "../../utils/withAuth";
import MenuRenderer, {
  findComponentByParam,
} from "../../components/menu-renderer";
import { menu_profile } from "../../components/menu-profile";
import { useSession } from "next-auth/react";
import MyAPIs from "../api-functions/MyAPIs";
import { LogoRow } from "../../icons/logo";
import axios from "axios";

export const profileContext = createContext(null);

function Index() {
  const router = useRouter();
  const [section, setSection] = useState(undefined);
  const [isInitDone, setIsInitDone] = useState(false);
  const { data: session, status } = useSession();
  const [mainData, setMainData] = useState({
    user: null,
    resumes: null,
    membershipTypes: [],
  });
  // console.log(mainData?.user?.membership, session.membership);
  useEffect(() => {
    if (router.isReady === true) {
      const _section = router.query.section;
      if (_section && _section !== section) {
        setSection(_section);
      } else {
        setSection("profile");
        router.push({
          pathname: router.pathname,
          query: {
            section: "profile",
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    if (router.isReady && isInitDone) {
      const _section = router.query.section;
      setSection(_section);
    }
  }, [router]);

  useEffect(() => {
    if (status === "authenticated") {
      getUser(session.user);
    } else if (status === "unauthenticated") {
      // check local session
      let localSession = sessionStorage.getItem("user");

      if (localSession) {
        localSession = JSON.parse(atob(localSession));
        getUser(localSession);
        setSection("profile");
        router.push({
          pathname: router.pathname,
          query: {
            section: "profile",
          },
        });
      }
    }
  }, [status]);

  const initData = async (userID) => {
    const APIs = [MyAPIs.MembershipType().getMembershipTypes()];
    try {
      const res = await axios.all(APIs);
      const _membershipTypes = res[0].data;
      handleUpdateMainData({
        // resumes: _resumes,
        membershipTypes: _membershipTypes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function getUser(user) {
    try {
      const _user = await MyAPIs.User().getUserByEmail(user.email);
      handleUpdateMainData({ user: _user.data });
      await initData(_user.data.id);
      setIsInitDone(true);
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
    <profileContext.Provider
      value={{
        router: router,
        mainData: mainData,
        session: session,
        updateMainData: handleUpdateMainData,
      }}
    >
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
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <ThemeButton />
              <ButtonAccount />
            </Stack>
          </Stack>
        </Paper>
        <Divider />
        <Stack
          zIndex={1}
          direction={"row"}
          height={"calc(100% - 63px)"}
          width={"100%"}
        >
          <Stack height={"100%"} width="300px">
            <Paper
              variant="outlined"
              className="br0"
              sx={{ zIndex: 2, height: "100%", paddingY: 4 }}
            >
              <MenuRenderer
                value={menu_profile(
                  mainData?.user?.membership || session.membership
                )}
              />
            </Paper>
          </Stack>

          <Stack height={"100%"} width={"100%"} sx={{ overflowY: "auto" }}>
            {!isInitDone && (
              <Stack alignItems={"center"} width={"100%"}>
                <CircularProgress />
              </Stack>
            )}
            <Fade in={isInitDone}>
              <Stack
                height={"100%"}
                sx={{
                  scrollBehavior: "smooth",
                }}
              >
                {findComponentByParam(
                  section,
                  menu_profile(mainData?.user?.membership || session.membership)
                )}
              </Stack>
            </Fade>
          </Stack>
        </Stack>
      </Stack>
    </profileContext.Provider>
  );
}

export default withAuth(Index);
