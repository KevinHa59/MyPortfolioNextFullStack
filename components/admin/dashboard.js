import React, { useContext } from "react";
import { Grid, Paper, Stack, Typography, Zoom } from "@mui/material";
import FormHeader from "../widgets/texts/form-header";
import { adminContext } from "../../pages/admin";

export default function Dashboard() {
  const { mainData } = useContext(adminContext);
  const { resumes, users, userTypes, status, courses, pages, permissions } =
    mainData;
  return (
    <Stack padding={5}>
      <Grid container spacing={5}>
        {users && (
          <StatsItem index={1} title={"Users"} value={users.length || 0} />
        )}
        {userTypes && (
          <StatsItem
            index={2}
            title={"User Types"}
            value={userTypes.length || 0}
          />
        )}
        {pages && (
          <StatsItem index={3} title={"Pages"} value={pages.length || 0} />
        )}
        {resumes && (
          <StatsItem index={4} title={"Resumes"} value={resumes.length || 0} />
        )}
        {courses && (
          <StatsItem index={4} title={"Courses"} value={courses.length || 0} />
        )}
        {status && (
          <StatsItem index={4} title={"Status"} value={status.length || 0} />
        )}
      </Grid>
    </Stack>
  );
}

function StatsItem({ index = 0, title, value }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Zoom in={true} style={{ transitionDelay: index * 50 }}>
        <Paper
          className="normal"
          variant="outlined"
          sx={{ overflow: "hidden" }}
        >
          <Stack
            padding={2}
            width="100%"
            height={"150px"}
            sx={{ position: "relative" }}
            justifyContent={"space-between"}
          >
            <FormHeader title={title} variant="h3" sx={{ height: "100%" }} />
            <Typography variant="h4" textAlign={"right"} fontWeight={200}>
              {value}
            </Typography>
          </Stack>
        </Paper>
      </Zoom>
    </Grid>
  );
}
