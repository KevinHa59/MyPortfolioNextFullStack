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
import { asyncNoteContext } from "../widgets/notification/async-notification";
import { adminContext } from "../../pages/admin";

export default function Permissions() {
  const router = useRouter();
  const { setNote } = useContext(mainContext);
  const { mainData, updateMainData } = useContext(adminContext);
  const { pages, userTypes, permissions } = mainData;
  const [currentPermissions, setCurrentPermissions] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentPermissions(permissions);
    if (userTypes.length > 0) {
      const userTypeID = userTypes[0].id;
      const { user_type } = router.query;
      if (user_type === undefined) {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            user_type: userTypeID,
          },
        });
        setSelectedUserType(userTypes[0]);
      } else {
        const _userType = userTypes.find((item) => item.id === user_type);
        if (_userType) {
          setSelectedUserType(_userType);
        }
      }
    }
  }, [permissions]);

  const handleTypeSelect = (type) => {
    setSelectedUserType(type);
    handleRoute(type.id);
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
    const newLinks = currentPermissions.filter((item) => item.id === undefined);
    const removeLinks = [];
    permissions.forEach((item) => {
      if (
        currentPermissions.some(
          (_item) =>
            item.userTypeID === _item.userTypeID && item.pageID === _item.pageID
        ) === false
      ) {
        removeLinks.push(item.id);
      }
    });

    const APIs = [];
    APIs.push(MyAPIs.Permission().createPermissions(newLinks));
    APIs.push(MyAPIs.Permission().deletePermissions(removeLinks));

    try {
      const res = await axios.all(APIs);
      if (res) {
        handleUpdateMainData(res[0].data, removeLinks);
        setNote.success("Update Success");
      } else {
        setNote.error("Update Fail");
      }
      setIsSaving(false);
    } catch (error) {
      setNote.error("Update Fail");
      setIsSaving(false);
      console.log(error);
    }
  };

  const handleUpdateMainData = (newLinks, removeLinks) => {
    let copy = _.cloneDeep(mainData.permissions);
    if (newLinks.length > 0) {
      copy.push(...newLinks);
    }
    if (removeLinks.length > 0) {
      copy = copy.filter(
        (link) => !removeLinks.some((item) => item === link.id)
      );
    }
    updateMainData({ ...mainData, permissions: copy });
  };

  const handleUpdatePermissions = (permission, isChecked) => {
    let copy = _.cloneDeep(currentPermissions);
    if (isChecked) {
      copy.push(permission);
    } else {
      const index = copy.findIndex(
        (item) =>
          item.userTypeID === permission.userTypeID &&
          item.pageID === permission.pageID
      );
      copy.splice(index, 1);
    }
    setCurrentPermissions(copy);
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Permissions"} icon={<AdminPanelSettings />}></Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Stack alignItems={"flex-start"} direction={"row"} height={"100%"}>
          {/* user type */}
          <Stack width={"300px"} height={"100%"}>
            {/* <Divider /> */}
            <Paper className="flat br0" sx={{ height: "100%" }}>
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

              <Stack width={"100%"} paddingY={1} sx={{ overflowY: "auto" }}>
                {userTypes?.map((type, index) => {
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
                            borderRadius: 0,
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
          <Divider orientation="vertical" />
          {/* pages list */}
          <Stack width={"100%"} height={"100%"} gap={1}>
            <Stack height={"100%"}>
              <Stack
                width={"100%"}
                height={"calc(100% - 50px)"}
                sx={{ overflowY: "auto" }}
              >
                <Paper className="flat br0">
                  {selectedUserType ? (
                    <Table
                      data={pages}
                      headers={headers}
                      callback_extension_search_area={
                        <Stack
                          minHeight="30px"
                          direction={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <ButtonLoading
                            startIcon={<Save />}
                            variant={"contained"}
                            isLoading={isSaving}
                            sx={{ width: "max-content", minWidth: 0 }}
                            size="small"
                            onClick={handleSave}
                          >
                            Save
                          </ButtonLoading>
                        </Stack>
                      }
                      callback_cell={(row, key) => (
                        <Cell
                          row={row}
                          header={key}
                          selectedUserType={selectedUserType}
                          permissions={currentPermissions}
                          onChange={handleUpdatePermissions}
                        />
                      )}
                    />
                  ) : (
                    <Typography textAlign={"center"}>
                      No UserType Selected
                    </Typography>
                  )}
                </Paper>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
function Cell({ row, header, selectedUserType, permissions, onChange }) {
  if (header === "path") {
    const permission = permissions.find(
      (item) =>
        item.pageID === row.id && item.userTypeID === selectedUserType.id
    );
    const isChecked = permission !== undefined;
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
              checked={isChecked}
              className="pageItem"
              onChange={(e) =>
                onChange(
                  { userTypeID: selectedUserType.id, pageID: row.id },
                  e.target.checked
                )
              }
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
