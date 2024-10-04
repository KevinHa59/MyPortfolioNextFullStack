import {
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { profileContext } from "../../pages/profile";
import {
  Cancel,
  CheckCircle,
  CheckOutlined,
  ClearOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { stringUtil } from "../../utils/stringUtil";
import ButtonDialog from "../widgets/buttons/button_dialog";
import LabelText from "../../pages/profile/portfolio-collection/components/label-text";
import { mainContext } from "../../pages/_app";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import axios from "axios";

export default function Membership() {
  const theme = useTheme();
  const { setNote } = useContext(mainContext);
  const { mainData, updateMainData } = useContext(profileContext);
  const { membershipTypes, user } = mainData;
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.membershipHistory === undefined) {
        init();
      }
    }
  }, [user]);

  const init = async (isReturn = false) => {
    const APIs = [MyAPIs.User().getUserMembership(user.id)];
    const res = await axios.all(APIs);
    const membershipHistory = res[0].data;
    if (!isReturn) {
      updateMainData({
        user: {
          ...user,
          membershipHistory,
        },
      });
    } else {
      return membershipHistory;
    }
  };

  const handleCreateNewMembership = async () => {
    const newPlanID = selectedPlan.id;
    try {
      const res = await MyAPIs.User().createUserMembership(
        user.id,
        newPlanID,
        selectedPlan.cost
      );
      if (res) {
        const newHistory = await init();
        updateMainData({
          user: {
            ...mainData.user,
            membership: res.data,
            membershipHistory: newHistory,
          },
        });

        setNote.success("Change Membership Success");
        return true;
      } else {
        setNote.error("Change Membership Fail");
        return false;
      }
    } catch (error) {
      setNote.error("Change Membership Fail");
      console.log(error);
      return false;
    }
  };

  return (
    <Stack direction={"row"} width={"100%"} height={"100%"}>
      <Stack
        padding={4}
        gap={5}
        width={"100%"}
        height={"100%"}
        sx={{ overflowY: "auto" }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h5">Subscription</Typography>
        </Stack>
        <Stack gap={2} direction={"row"} justifyContent={"center"}>
          <Paper sx={{ width: "100%" }}>
            <Grid container padding={2} spacing={2}>
              <Grid item xs={6}>
                <Stack gap={1} width={"100%"}>
                  <LabelText
                    label_sx={{ width: "150px" }}
                    label={"Subscription ID"}
                  >
                    : {user?.membership?.id}
                  </LabelText>
                  <LabelText label_sx={{ width: "150px" }} label={"Status"}>
                    : {user?.membership?.status?.name}
                  </LabelText>
                  <LabelText label_sx={{ width: "150px" }} label={"Start Date"}>
                    :{" "}
                    {user?.membership?.startDate
                      ? new Date(user?.membership?.startDate).toLocaleString()
                      : "N/A"}
                  </LabelText>
                  <LabelText label_sx={{ width: "150px" }} label={"End Date"}>
                    :{" "}
                    {user?.membership?.endDate
                      ? new Date(user?.membership?.endDate).toLocaleString()
                      : "N/A"}
                  </LabelText>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack gap={1}>
                  <LabelText label_sx={{ width: "150px" }} label={"Plan"}>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                      : {user?.membership?.membershipType?.type}{" "}
                      <ButtonDialog
                        className={"hoverLink"}
                        button_label="Change Plan"
                        size="small"
                        color="info"
                        sx_button={{ padding: 0 }}
                        paperProps={{
                          className: "normal",
                          variant: "outlined",
                          style: {
                            maxWidth: "100%",
                            background: theme.palette.background.default,
                            overflow: "visible",
                          },
                        }}
                      >
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          gap={2}
                          padding={2}
                          paddingX={4}
                        >
                          {membershipTypes?.map((type, index) => {
                            return (
                              <MembershipDetail
                                key={index}
                                type={type}
                                currentID={user?.membership?.membershipType.id}
                                theme={theme}
                                selectedPlan={selectedPlan}
                                onSelectPlan={setSelectedPlan}
                                onChange={handleCreateNewMembership}
                              />
                            );
                          })}
                        </Stack>
                      </ButtonDialog>
                    </Stack>
                  </LabelText>
                  <LabelText label_sx={{ width: "150px" }} label={"Cost"}>
                    : {`$${user?.membership?.membershipType?.cost} /Month`}
                  </LabelText>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
        <Divider />
        <Typography variant="h5">Details</Typography>
        <Paper>
          <Stack padding={2} gap={2}>
            <Typography>Features</Typography>
            <Stack gap={1} paddingLeft={2}>
              <Item
                isValid={
                  user?.membership?.membershipType?.feature?.isResumeAccess
                }
                title={"Resume Access"}
                description="Download your resume as a PDF"
              />
              <Item
                isValid={user?.membership?.membershipType?.feature?.isAPIAccess}
                title={"API Access"}
                description="Access to API to retrieve your information and use on your own project"
              />
            </Stack>
          </Stack>
          <Stack padding={2} gap={2}>
            <Typography>Portfolio Sections Access</Typography>
            <Stack gap={1} paddingLeft={2}>
              {user?.membership?.membershipType?.feature
                ?.membershipResumeSection &&
                Object.entries(
                  user?.membership?.membershipType?.feature
                    ?.membershipResumeSection
                ).map((item, _index) => {
                  const section = item[0];
                  const value = item[1];
                  if (section !== "id") {
                    return (
                      <Stack key={_index} direction={"row"} gap={2}>
                        {value ? (
                          <CheckOutlined color="secondary" />
                        ) : (
                          <ClearOutlined color="disabled" />
                        )}
                        <Typography
                          variant="subtitle2"
                          sx={
                            value === false && {
                              fontWeight: "100",
                              opacity: 0.7,
                            }
                          }
                        >
                          {stringUtil.camelToTitle(section)}
                        </Typography>
                      </Stack>
                    );
                  }
                })}
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Paper sx={{ width: "400px", height: "100%", overflowY: "auto" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={2}
        >
          <Typography variant="h6">Subscription History</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Grid container sx={{ fontWeight: "bold" }} paddingX={1}>
            <Grid item xs={2}>
              Plan
            </Grid>
            <Grid item xs={4}>
              Start
            </Grid>
            <Grid item xs={4}>
              End
            </Grid>
            <Grid item xs={2}>
              Paid
            </Grid>
          </Grid>
          <Divider />
          {user?.membershipHistory?.map((history, index) => {
            return (
              <Grid
                key={index}
                container
                paddingX={1}
                fontSize={"15px"}
                sx={{
                  color: history.status.name === "Active" && "secondary.main",
                }}
              >
                <Grid item xs={2}>{`${history.membershipType.type}`}</Grid>
                <Grid item xs={4}>{`${new Date(
                  history.startDate
                ).toLocaleDateString()}`}</Grid>
                <Grid item xs={4}>{`${
                  new Date(history.endDate)?.toLocaleDateString() || ""
                }`}</Grid>
                <Grid item xs={2}>{`$${history.paid || 0.0}`}</Grid>
              </Grid>
            );
          })}
        </Stack>
      </Paper>
    </Stack>
  );
}

function MembershipDetail({
  type,
  currentID,
  theme,
  selectedPlan,
  onSelectPlan,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  return (
    <Paper
      className="normal "
      sx={{
        transform: `scale(${
          selectedPlan && selectedPlan.id === type.id ? 1.2 : 1
        })`,
        zIndex: selectedPlan && selectedPlan.id === type.id ? 2 : 1,
        height: "max-content",
        transition: "0.5s ease",
      }}
    >
      <Stack justifyContent={"space-between"} height={"100%"}>
        <Stack>
          <Stack alignItems={"center"} padding={2} gap={1}>
            <Typography variant="h4">{type.type}</Typography>
            <Typography variant="h6">
              {`$${type.cost || 0} USD/Month`}
            </Typography>
          </Stack>
          <Stack padding={3} gap={2}>
            <Stack direction={"row"} gap={2}>
              <CheckCircle color="success" />
              {`Max ${type.feature?.portfolioQuantity} Portfolio Page(s)`}
            </Stack>
            <Stack
              sx={{
                marginLeft: 1.5,
                borderLeft: `1px solid ${theme.palette.success.main}`,
              }}
            >
              <Typography
                fontStyle={"italic"}
                variant="body2"
                sx={{ paddingX: 1 }}
              >
                Portfolio Sections
              </Typography>
              <Stack padding={1}>
                {Object.entries(type.feature.membershipResumeSection).map(
                  (item, _index) => {
                    const section = item[0];
                    const value = item[1];
                    if (section !== "id") {
                      return (
                        <Stack key={_index} direction={"row"} gap={2}>
                          -
                          <Typography
                            variant="subtitle2"
                            sx={
                              value === false && {
                                textDecoration: "line-through",
                                fontStyle: "italic",
                                fontWeight: "100",
                                opacity: 0.7,
                              }
                            }
                          >
                            {stringUtil.camelToTitle(section)}
                          </Typography>
                        </Stack>
                      );
                    }
                  }
                )}
              </Stack>
            </Stack>
            <Item
              isValid={type.feature.isResumeAccess}
              title={"Resume Access"}
              info="Download your resume as a PDF"
            />
            <Item
              isValid={type.feature.isAPIAccess}
              title={"API Access"}
              info="Access to all API to retrieve your information and use on your own project"
            />
          </Stack>
        </Stack>
        <Divider />
        <Stack>
          <ButtonDialog
            open={open}
            isCloseOnClickOut={false}
            title={"Make Payment"}
            button_label={currentID === type.id ? "Current Plan" : "Select"}
            disabled={currentID === type.id}
            className="br0"
            fullWidth={true}
            sx_button={{ width: "100%" }}
            onClick={() => {
              setOpen(true);
              onSelectPlan(type);
            }}
          >
            <ClickAwayListener
              onClickAway={() => {
                setOpen(false);
                onSelectPlan(null);
              }}
            >
              <Stack onClick={(e) => e.stopPropagation()}>
                <Stack padding={2}>Enter Card Information</Stack>
                <Stack minWidth={"300px"}>
                  <Divider />
                  <Button
                    className="br0"
                    onClick={async () => {
                      const isSuccess = await onChange();
                      if (isSuccess) {
                        setOpen(false);
                        onSelectPlan(null);
                      }
                    }}
                  >
                    Pay
                  </Button>
                </Stack>
              </Stack>
            </ClickAwayListener>
          </ButtonDialog>
        </Stack>
      </Stack>
    </Paper>
  );
}

function Item({ isValid, title, description = null, info = null }) {
  return (
    <Stack
      direction={info ? "row" : "column"}
      alignItems={info ? "center" : "flex-start"}
      justifyContent={"space-between"}
      gap={1}
    >
      <Stack direction={"row"} gap={2}>
        {isValid ? <CheckCircle color="success" /> : <Cancel color="error" />}
        {title}
      </Stack>
      {description && (
        <Stack paddingLeft={5}>
          <Typography
            variant="body2"
            fontStyle={"italic"}
            sx={{ opacity: 0.7 }}
          >
            {description}
          </Typography>
        </Stack>
      )}

      {info && (
        <Tooltip title={info}>
          <InfoOutlined />
        </Tooltip>
      )}
    </Stack>
  );
}
