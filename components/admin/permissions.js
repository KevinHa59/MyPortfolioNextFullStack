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
import { AdminPanelSettings, Save } from "@mui/icons-material";
import Table from "../widgets/tables/table";

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
      const _type = res[0]?.data?.find(
        (item) => item.id === router.query.user_type
      );
      if (_type) {
        setSelectedUserType(_type);
      } else {
        handleRoute(null);
      }
    } else {
      if (res[0]?.data?.length > 0) {
        const _type = res[0]?.data[0];
        setSelectedUserType(_type);
        handleRoute(_type.id);
      }
    }
    setIsGettingData(false);
    handleUpdateData({
      userTypes: res[0]?.data,
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
      APIs.push(MyAPIs.Permission().deletePermissions(removeLinks));
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
        <Stack
          sx={{
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Stack></Stack>
          {/* <Divider /> */}
          <Stack
            alignItems={"flex-start"}
            gap={4}
            direction={"row"}
            height={"100%"}
          >
            {/* user type */}
            <Stack width={"300px"} height={"100%"}>
              {/* <Divider /> */}
              <Paper height={"100%"} sx={{ height: "max-content" }}>
                <Stack minHeight="30px" padding={1}>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    textAlign={"left"}
                    sx={{ color: "inherit" }}
                  >
                    User Types
                  </Typography>
                </Stack>
                {/* <Divider /> */}
                <Stack width={"100%"} padding={1} sx={{ overflowY: "auto" }}>
                  {data.userTypes?.map((type, index) => {
                    return (
                      <Slide
                        key={index}
                        in={true}
                        direction="right"
                        style={{ transitionDelay: index * 50 }}
                      >
                        <Stack>
                          <Button
                            className={
                              router.query.user_type === type.id
                                ? "active"
                                : "inactive"
                            }
                            color="inherit"
                            sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "flex-start",
                              transition: "ease 0.1s",
                              // width: "150px",
                            }}
                            fullWidth
                            onClick={() => handleTypeSelect(type)}
                          >
                            {type.type}
                          </Button>
                        </Stack>
                      </Slide>
                    );
                  })}
                </Stack>
              </Paper>
            </Stack>
            {/* <Divider orientation="vertical" flexItem /> */}
            {/* pages list */}
            <Stack width={"100%"} height={"100%"} gap={1}>
              <Stack
                minHeight="30px"
                direction={"row"}
                alignItems={"center"}
                gap={2}
                // className="reverse"
                // sx={{ background: styles.background.menu }}
              >
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  textAlign={"center"}
                  sx={{ color: "inherit" }}
                >
                  Pages
                </Typography>
                <ButtonLoading
                  startIcon={<Save />}
                  variant={"contained"}
                  // className={"br0"}
                  isLoading={isSaving}
                  sx={{ width: "max-content", minWidth: 0 }}
                  size="small"
                  onClick={handleSave}
                >
                  Save
                </ButtonLoading>
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
                    <Table
                      isLoading={isGettingData}
                      data={data.pages}
                      headers={headers}
                      callback_cell={(row, key) => (
                        <Cell
                          row={row}
                          header={key}
                          pages={data.pages}
                          selectedUserType={selectedUserType}
                        />
                      )}
                    />
                  ) : (
                    <Typography textAlign={"center"}>
                      No UserType Selected
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
function Cell({ row, header, selectedUserType }) {
  if (header === "path") {
    const existPage = selectedUserType.pages.find(
      (_page) => _page.id === row.id
    );
    const isChecked = existPage !== undefined;
    return (
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
                id: row.id,
                linkID: isChecked ? existPage.linkID : null,
              })}
            />
          }
          label={row.path}
          sx={{ width: "40%" }}
        />
      </Stack>
    );
  } else return row[header];
}

const headers = [
  {
    name: "Path",
    key: "path",
    xs: 5,
  },
  {
    name: "Description",
    key: "description",
    xs: 7,
  },
];
