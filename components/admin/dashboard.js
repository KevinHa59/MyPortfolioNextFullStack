import React, { useEffect, useState } from "react";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import axios from "axios";
import {
  CircularProgress,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { styles } from "../../styles/useStyle";
import FormHeader from "../widgets/texts/form-header";

export default function Dashboard() {
  const [isGettingData, setIsGettingData] = useState(false);
  const [statistic, setStatistic] = useState({
    users: null,
    userTypes: null,
    pages: null,
    resumes: null,
  });

  useEffect(() => {
    initData();
  }, []);

  const handleUpdateStatistic = (newValue) => {
    setStatistic((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const initData = async () => {
    setIsGettingData(true);
    const APIs = [
      MyAPIs.User().getUsers(true),
      MyAPIs.User().getUserTypes(false, false, true),
      MyAPIs.Page().getPages(null, true),
      MyAPIs.Resume().getResumes(true),
    ];
    const res = await axios.all(APIs);
    handleUpdateStatistic({
      users: res[0],
      userTypes: res[1],
      pages: res[2],
      resumes: res[3],
    });
    setIsGettingData(false);
  };

  return (
    <Stack padding={5}>
      {isGettingData && (
        <Typography textAlign={"center"}>
          <CircularProgress />
        </Typography>
      )}
      <Grid container spacing={5}>
        {statistic.users && (
          <StatsItem index={1} title={"Users"} value={statistic.users || 0} />
        )}
        {statistic.userTypes && (
          <StatsItem
            index={2}
            title={"User Types"}
            value={statistic.userTypes || 0}
          />
        )}
        {statistic.pages && (
          <StatsItem index={3} title={"Pages"} value={statistic.pages || 0} />
        )}
        {statistic.resumes && (
          <StatsItem
            index={4}
            title={"Resumes"}
            value={statistic.resumes || 0}
          />
        )}
      </Grid>
    </Stack>
  );
}

function StatsItem({ index = 0, title, value }) {
  return (
    <Grid item xs={3}>
      <Zoom in={true} style={{ transitionDelay: index * 50 }}>
        <Paper
          className="normal"
          variant="outlined"
          sx={{ overflow: "hidden" }}
        >
          <Stack
            paddingX={2}
            width="100%"
            height={"150px"}
            sx={{ position: "relative" }}
          >
            <Stack
              sx={{
                position: "absolute",
                width: "200%",
                height: "150%",
                transform: "translate(-50%)",
                top: "-50%",
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(150,150,150,0.1) 100%)",
                rotate: "-25deg",
                transformOrigin: "top left",
              }}
            />
            <FormHeader title={title} variant="h3" sx={{ height: "100%" }} />
            <Typography
              variant="h4"
              textAlign={"right"}
              sx={{ height: "100%" }}
            >
              {value}
            </Typography>
          </Stack>
        </Paper>
      </Zoom>
    </Grid>
  );
}
