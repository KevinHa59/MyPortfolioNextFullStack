import React, { useContext, useEffect, useState } from "react";
import { profileContext } from "../../../pages/profile";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { stringUtil } from "../../../utils/stringUtil";
import { Add } from "@mui/icons-material";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import axios from "axios";

export default function List() {
  const { mainData, router, updateMainData } = useContext(profileContext);
  const { user, resumes } = mainData;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    resumes === null && user && init();
  }, [mainData]);

  const init = async () => {
    setIsLoading(true);
    try {
      const APIs = [MyAPIs.Resume().getResumesByUser(user.id)];
      const res = await axios.all(APIs);
      const resumes = res[0].data;
      updateMainData({ resumes: resumes });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Stack padding={4} gap={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">My Resumes</Typography>
        <Button startIcon={<Add />} color="success">
          Create New Resume
        </Button>
      </Stack>
      {isLoading ? (
        <Typography textAlign={"center"}>
          <CircularProgress />
        </Typography>
      ) : (
        resumes?.length === 0 && (
          <Typography textAlign={"center"}>
            You do not have any resume
          </Typography>
        )
      )}
      <Grid container spacing={4}>
        {resumes?.map((resume, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <ResumeItem resume={resume} index={index} router={router} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

function ResumeItem({ resume, index, router }) {
  const tags = Object.entries(resume).reduce((res, cur) => {
    if (Array.isArray(cur[1]) && cur[1].length > 0) {
      res.push(cur[0]);
    }
    return res;
  }, []);

  const onDetail = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        id: resume.id,
      },
    });
  };

  return (
    <Fade in={true} style={{ transitionDelay: index * 100 }}>
      <Paper
        className="outlined normal"
        variant="outlined"
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack justifyContent={"space-between"} height={"100%"}>
          <Stack padding={2} gap={2}>
            <Typography variant="body1" fontWeight={"bold"}>
              {resume.title}
            </Typography>

            <Stack>
              <Typography
                variant="body2"
                sx={{ textAlign: "justify", opacity: 0.7 }}
              >
                {stringUtil.ellipsis(resume.summary, 150)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} flexWrap={"wrap"} gap={0.5} paddingX={2}>
            {tags?.map((tag, index) => {
              return (
                <Chip
                  color="primary"
                  key={index}
                  label={tag}
                  size="small"
                  sx={{ fontSize: "12px" }}
                />
              );
            })}
          </Stack>
          <Stack>
            <Stack padding={2}>
              <Typography variant="body2" sx={{ color: "info.main" }}>
                Created: {new Date(resume.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ color: "info.main" }}>
                Modified: {new Date(resume.updatedAt).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack width={"100%"}>
              <Divider />
              <Stack direction={"row"} width={"100%"}>
                <Stack width={"50%"}>
                  <ButtonDialogConfirm
                    sx={{ width: "100%" }}
                    className="br0"
                    dialog_title={"Delete Resume"}
                    dialog_message={
                      <Typography
                        textAlign={"center"}
                        sx={{ whiteSpace: "pre-wrap" }}
                      >{`Are you sure?\nResume will not be recovered`}</Typography>
                    }
                    color={"error"}
                    dialog_color={"error"}
                  >
                    Delete
                  </ButtonDialogConfirm>
                </Stack>
                <Divider orientation="vertical" />
                <Button
                  sx={{ width: "50%" }}
                  className="br0"
                  color="success"
                  onClick={onDetail}
                >
                  Detail
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Fade>
  );
}
