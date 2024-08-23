import {
  Button,
  Divider,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import {
  Add,
  ArrowRight,
  Article,
  Dashboard as DashboardIcon,
  Password,
  People,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import ThemeButton from "../../components/widgets/themeButton";
import ButtonAccount from "../../components/widgets/buttons/button-account";
import PasswordChange from "../authentication/password-change";
import Resume from "../../components/profile/resume";
import Profile from "../../components/profile/profile";
import NewResume from "../../components/profile/edit-resume";
import withAuth from "../../utils/withAuth";

const menu_data = [
  {
    Icon: People,
    title: "Profile",
    param: "profile",
    Comp: <Profile />,
  },
  {
    Icon: Article,
    title: "My Resumes",
    param: "myResumes",
    Comp: <Resume />,
  },
  {
    Icon: Password,
    title: "Change Password",
    param: "changePassword",
    Comp: <PasswordChange useLoggedInUser={true} />,
  },
];

function findComponentByParam(menu, param) {
  let result = null;
  menu.forEach((comp) => {
    if (comp.param === param && result === null) {
      result = comp;
    } else {
      if (comp.Sub && result === null) {
        result = findComponentByParam(comp.Sub, param);
      }
    }
  });
  return result;
}

export const profileContext = createContext(null);

function Index() {
  const router = useRouter();
  const [section, setSection] = useState(undefined);
  const [mainData, setMainData] = useState({
    user: null,
  });
  const [selectedComponent, setSelectedComponent] = useState(null);
  useEffect(() => {
    const _section = router.query.section;

    if (router.isReady === true) {
      initData();
      if (_section && _section !== section) {
        const comp = findComponentByParam(menu_data, _section);
        setSelectedComponent(comp);
        setSection(_section);
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            section: _section,
          },
        });
      } else if (section === undefined) {
        setSelectedComponent(menu_data[0]);
        setSection(menu_data[0].param);
        router.push({
          pathname: router.pathname,
          query: {
            section: menu_data[0].param,
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
          <Stack height={"100%"} width="300px" padding={2}>
            <Paper className="flat" sx={{ zIndex: 2, height: "100%" }}>
              <Menu onSelect={setSelectedComponent} />
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
              paddingX={2}
            >
              <ThemeButton />
              <ButtonAccount />
            </Stack>
            <Divider />
            <Stack
              height={"calc(100% - 65px)"}
              sx={{
                // overflowY: "auto",
                scrollBehavior: "smooth",
              }}
            >
              {selectedComponent?.Comp}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </profileContext.Provider>
  );
}

function Menu({ onSelect }) {
  const router = useRouter();

  const handleRoute = (section) => {
    router.push({
      pathname: router.pathname,
      query: {
        section: section,
      },
    });
  };

  return (
    <Stack
      paddingY={3}
      gap={2}
      alignItems={"center"}
      sx={{
        overflowY: "auto",
      }}
    >
      {menu_data.map((menu, index) => {
        const subMenu = menu.Sub || null;
        return (
          <Slide
            key={index}
            in={true}
            direction="right"
            height="100%"
            style={{ transitionDelay: 50 * index }}
          >
            <Stack>
              <Button
                key={index}
                color="inherit"
                className={
                  router.query.section === menu.param ? "active" : "inactive"
                }
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-start",
                  transition: "ease 0.1s",
                  width: "180px",
                  position: "relative",
                }}
                // disabled={subMenu !== null}
                onClick={() => {
                  if (subMenu === null) {
                    handleRoute(menu.param);
                    onSelect && onSelect(menu);
                  }
                }}
              >
                <Slide
                  direction="right"
                  in={router.query.section === menu.param}
                >
                  <ArrowRight sx={{ position: "absolute", right: "95%" }} />
                </Slide>
                <menu.Icon fontSize="15px" />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  {menu.title}
                </Typography>
              </Button>
              <Stack paddingLeft={"40px"} width={"max-content"} gap={1}>
                {subMenu?.map((sub, sIndex) => {
                  return (
                    <Button
                      key={sIndex}
                      color="inherit"
                      className={
                        router.query.section === sub.param
                          ? "active"
                          : "inactive"
                      }
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-start",
                        transition: "ease 0.1s",
                        width: "100%",
                        position: "relative",
                      }}
                      onClick={() => {
                        handleRoute(sub.param);
                        onSelect && onSelect(sub);
                      }}
                    >
                      <Slide
                        direction="right"
                        in={router.query.section === sub.param}
                      >
                        <ArrowRight
                          sx={{ position: "absolute", right: "95%" }}
                        />
                      </Slide>
                      {/* <sub.Icon fontSize="15px" /> */}
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "inherit",
                          fontWeight: "inherit",
                        }}
                      >
                        {sub.title}
                      </Typography>
                    </Button>
                  );
                })}
              </Stack>
            </Stack>
          </Slide>
        );
      })}
    </Stack>
  );
}

export default withAuth(Index);
