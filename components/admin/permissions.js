import React, { useEffect, useState } from "react";
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
import ButtonDialog from "../widgets/buttons/button_dialog";
import FormHeader from "../widgets/texts/form-header";
import ErrorRenderer from "../widgets/texts/error-renderer";
import LoadingComponent from "../widgets/loading/loading-component";
import { Circle, Clear, Delete, Edit, Label } from "@mui/icons-material";
import Header from "./header";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import axios from "axios";
import PaperForm from "../widgets/paper/paper-form";
import { styles } from "../../styles/useStyle";
import { useRouter } from "next/router";

export default function Permissions() {
  const router = useRouter();
  const [data, setData] = useState({
    userTypes: [],
    pages: [],
  });
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [isGettingData, setIsGettingData] = useState(true);

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
    console.log(res);
    if (router.query.user_type) {
      const _type = res[0]?.find((item) => item.id === router.query.user_type);
      if (_type) {
        setSelectedUserType(_type);
      } else {
        handleRoute(null);
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
    setSelectedUserType(type);
    handleRoute(type.id);
  };

  const handleRoute = (type) => {
    if (type) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          user_type: type,
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

  return (
    <Stack width={"100%"} height={"100%"}>
      <Header title={"Permissions"}></Header>

      <Divider sx={{ background: "rgba(100,100,100,1)" }} />
      {isGettingData && <LinearProgress />}
      {!isGettingData && (
        <Paper
          sx={{
            height: "100%",
            marginX: 5,
            marginY: 1,
            overflow: "hidden",
          }}
        >
          <Stack alignItems={"flex-start"} direction={"row"} height={"100%"}>
            <Stack width={"300px"} height={"100%"} gap={1}>
              <Stack
                height="30px"
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
              <Stack height={"100%"} paddingX={1}>
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
            <Divider orientation="vertical" flexItem />
            <Stack width={"100%"} height={"100%"}>
              <Stack
                height="30px"
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
              <Stack height={"100%"}>
                <Stack width={"100%"} padding={1}>
                  {selectedUserType &&
                    data.pages?.map((page, index) => {
                      const isChecked = selectedUserType.pages.some(
                        (_page) => _page.id === page.id
                      );
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
                                    checked={isChecked}
                                    className="page"
                                    data-page={JSON.stringify({
                                      checked: isChecked,
                                      id: page.id,
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
                    })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
