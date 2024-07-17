import React, { useContext, useEffect, useState } from "react";
import UsersAPI from "../../pages/api-functions/UsersAPI";
import {
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import Header from "./header";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import axios from "axios";
import { styles } from "../../styles/useStyle";
import { useRouter } from "next/router";
import ButtonLoading from "../widgets/buttons/button-loading";
import { mainContext } from "../../pages/_app";
import { getCookie, getCookies } from "cookies-next";
import { AdminPanelSettings } from "@mui/icons-material";

export default function Permissions() {
  const router = useRouter();
  const { setNote } = useContext(mainContext);
  const [data, setData] = useState({
    userTypes: [],
    pages: [],
  });
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [isGettingData, setIsGettingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  // get data
  async function initData() {
    const APIs = [
      MyAPIs.User().getUserTypes(false, true),
      MyAPIs.Page().getPages(),
    ];
    const res = await axios.all(APIs);
    if (router.query.user_type) {
      const _type = res[0]?.find((item) => item.id === router.query.user_type);
      if (_type) {
        setSelectedUserType(_type);
      } else {
        handleRoute(null);
      }
    } else {
      if (res[0].length > 0) {
        const _type = res[0][0];
        setSelectedUserType(_type);
        handleRoute(_type.id);
      }
    }
    setIsGettingData(false);
    handleUpdateData({
      userTypes: res[0],
      pages: res[1],
    });
  }

  const handleUpdateData = (newValue) => {
    setData((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleTypeSelect = (type) => {
    setSelectedUserType(null);
    setTimeout(() => {
      setSelectedUserType(type);
      handleRoute(type.id);
    }, 0);
  };

  const handleRoute = (id) => {
    if (id) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          user_type: id,
        },
      });
    } else {
      const queries = router.query;
      delete queries.user_type;
      router.push({
        pathname: router.pathname,
        query: queries,
      });
    }
  };

  // save
  const handleSave = async () => {
    setIsSaving(true);
    const pages = document.querySelectorAll(".pageItem");
    const newLinks = [];
    const removeLinks = [];
    Array.from(pages).forEach((item) => {
      const currentCheck = item.querySelector("input[type='checkbox']").checked;
      const pageInfo = JSON.parse(item.getAttribute("data-page"));

      if (currentCheck && !pageInfo.defaultChecked) {
        newLinks.push({
          userTypeID: selectedUserType.id,
          pageID: pageInfo.id,
        });
      } else if (!currentCheck && pageInfo.defaultChecked) {
        removeLinks.push(pageInfo.linkID);
      }
    });
    const APIs = [];
    if (newLinks.length > 0) {
      APIs.push(MyAPIs.Permission().createPermissions(newLinks));
    }
    if (removeLinks.length > 0) {
      APIs.push(MyAPIs.Permission().deletePage(removeLinks));
    }

    try {
      const res = await axios.all(APIs);
      initData();
      setNote.success("Save Permissions Success");
      setIsSaving(false);
    } catch (error) {
      setNote.error("Save Permissions Fail");
      setIsSaving(false);
      console.log(error);
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Permissions"} icon={<AdminPanelSettings />}></Header>
      {isGettingData && <LinearProgress />}
      {!isGettingData && (
        <Paper
          sx={{
            height: "100%",

            overflow: "hidden",
          }}
        >
          <Stack alignItems={"flex-start"} direction={"row"} height={"100%"}>
            {/* user type */}
            <Stack width={"300px"} height={"100%"}>
              <Stack
                minHeight="30px"
                sx={{ background: styles.background.menu, color: "#fff" }}
              >
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  User Types
                </Typography>
              </Stack>
              <Divider />
              <Stack height={"100%"} paddingX={1}>
                <Stack
                  width={"100%"}
                  height={"calc(100% - 50px)"}
                  padding={1}
                  sx={{ overflowY: "auto" }}
                >
                  {data.userTypes?.map((type, index) => {
                    return (
                      <Slide
                        key={index}
                        in={true}
                        direction="right"
                        style={{ transitionDelay: index * 100 }}
                      >
                        <Button
                          variant={
                            router.query.user_type === type.id
                              ? "contained"
                              : "text"
                          }
                          fullWidth
                          onClick={() => handleTypeSelect(type)}
                        >
                          {type.type}
                        </Button>
                      </Slide>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
            <Divider orientation="vertical" flexItem />
            {/* pages list */}
            <Stack width={"100%"} height={"100%"}>
              <Stack
                minHeight="30px"
                sx={{ background: styles.background.menu, color: "#fff" }}
              >
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Pages
                </Typography>
              </Stack>
              <Divider />
              <Stack height={"100%"}>
                <Stack
                  width={"100%"}
                  height={"calc(100% - 50px)"}
                  padding={1}
                  sx={{ overflowY: "auto" }}
                >
                  {selectedUserType ? (
                    data.pages?.map((page, index) => {
                      const existPage = selectedUserType.pages.find(
                        (_page) => _page.id === page.id
                      );
                      const isChecked = existPage !== undefined;
                      return (
                        <Slide
                          key={index}
                          in={true}
                          direction="right"
                          style={{ transitionDelay: index * 100 }}
                        >
                          <Stack width={"100%"}>
                            <Stack
                              direction={"row"}
                              width={"100%"}
                              sx={{
                                alignItems: "center",
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={isChecked}
                                    className="pageItem"
                                    data-page={JSON.stringify({
                                      defaultChecked: isChecked,
                                      id: page.id,
                                      linkID: isChecked
                                        ? existPage.linkID
                                        : null,
                                    })}
                                  />
                                }
                                label={page.path}
                                sx={{ width: "40%" }}
                              />
                              <Typography sx={{ width: "60%" }}>
                                {page.description}
                              </Typography>
                            </Stack>
                            {index < data.pages.length - 1 && (
                              <Divider flexItem />
                            )}
                          </Stack>
                        </Slide>
                      );
                    })
                  ) : (
                    <Typography textAlign={"center"}>
                      No UserType Selected
                    </Typography>
                  )}
                </Stack>
                <Stack height={"50px"} gap={1} alignItems={"flex-end"}>
                  <Divider flexItem />
                  <ButtonLoading
                    isLoading={isSaving}
                    variant={"contained"}
                    sx={{ width: "max-content", marginX: 1 }}
                    size="small"
                    onClick={handleSave}
                  >
                    Save
                  </ButtonLoading>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
