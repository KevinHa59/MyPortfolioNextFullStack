import React, { useContext, useEffect } from "react";
import {
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  Link,
  ListItem,
  MenuItem,
  Paper,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import FormHeader from "../widgets/texts/form-header";
import { adminContext } from "../../pages/admin";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import LabelText from "../../pages/profile/portfolio-collection/components/label-text";
import ChartPie from "../charts/pie-chart";
import { chartUtils } from "../charts/utils";
import ChartColumn from "../charts/column-chart";

export default function Dashboard() {
  const { mainData, updateMainData } = useContext(adminContext);
  const { dashboard } = mainData;

  useEffect(() => {
    dashboard === null && init();
  }, []);
  const init = async () => {
    try {
      const res = await MyAPIs.Dashboard().getDashboard();
      updateMainData({ dashboard: res.data });
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack padding={5} gap={2}>
      {dashboard && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <UserStat
                users={dashboard.users}
                userTypes={dashboard.userTypes}
              />
            </Grid>
            <Grid item xs={6}>
              <MembershipStat memberships={dashboard.membershipTypes} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <StatsItem
              index={4}
              title={"Resumes"}
              value={dashboard.resumes || 0}
            />
            <StatsItem
              index={4}
              title={"Courses"}
              value={dashboard.courses || 0}
            />
            {/* <StatsItem index={4} title={"Status"} value={status.length || 0} /> */}
          </Grid>
        </>
      )}
    </Stack>
  );
}

function StatsItem({ index = 0, title, value }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Zoom in={true} style={{ transitionDelay: index * 50 }}>
        <Paper className="normal" sx={{ overflow: "hidden" }}>
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

function UserStat({ users, userTypes }) {
  const chartData = { label: [], data: [], color: [] };
  userTypes.forEach((item) => {
    chartData["label"].push(item.type);
    chartData["color"].push(item.color);
    chartData["data"].push(item._count.users);
  });
  return (
    <Paper
      className="normal"
      sx={{ overflow: "hidden", height: "100%", padding: 2 }}
    >
      <Stack gap={2}>
        <FormHeader title={"User"} variant="h5" sx={{ height: "100%" }} />
        <LabelText label={"Total"}>{users}</LabelText>
        <Divider />

        <Stack
          padding={2}
          gap={2}
          width="100%"
          sx={{ position: "relative" }}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <Stack
            minWidth={"50%"}
            height={"250px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ChartColumn data={chartData} color={chartData.color} />
          </Stack>
          <Stack gap={2} width={"50%"}>
            <Grid container>
              <Grid item xs={6}>
                <Typography fontWeight={"bold"}>User Type</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign={"right"} fontWeight={"bold"}>
                  Quantity
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Stack>
              {userTypes.map((type, index) => {
                return (
                  <MenuItem
                    key={index}
                    sx={{ padding: 0, minWidth: 0, cursor: "default" }}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>{type.type}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography textAlign={"right"}>
                          {type._count.users}
                        </Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
function MembershipStat({ memberships }) {
  const chartData = memberships.map((item) => {
    return {
      label: item.type,
      value: item._count.memberships,
    };
  });
  return (
    <Paper
      className="normal"
      sx={{ overflow: "hidden", height: "100%", padding: 2 }}
    >
      <Stack gap={2}>
        <FormHeader title={"Membership"} variant="h5" sx={{ height: "100%" }} />
        <LabelText label={"Total"}>{memberships?.length || 0}</LabelText>
        <Divider />

        <Stack
          padding={2}
          gap={2}
          width="100%"
          sx={{ position: "relative" }}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <Stack
            minWidth={"50%"}
            height={"250px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ChartPie data={chartData} showLabel={true} height={200} />
          </Stack>
          <Stack gap={2} width={"50%"}>
            <Grid container>
              <Grid item xs={6}>
                <Typography fontWeight={"bold"}>Membership</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign={"right"} fontWeight={"bold"}>
                  User Quantity
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Stack>
              {memberships.map((membership, index) => {
                return (
                  <MenuItem
                    key={index}
                    sx={{ padding: 0, minWidth: 0, cursor: "default" }}
                  >
                    <Grid container sx={{ width: "100%" }}>
                      <Grid item xs={6}>
                        <Typography>{membership.type}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography textAlign={"right"}>
                          {membership._count.memberships}
                        </Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
