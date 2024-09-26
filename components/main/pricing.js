import React, { useContext, useState } from "react";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { homeContext } from "../../pages/[page]";
import { stringUtil } from "../../utils/stringUtil";

const pricing = [
  {
    title: "Free",
    cost: "$0 USD/Month",
    benefits: ["Max 1 Portfolio Page", "Limit Portfolio Sections"],
  },
  {
    title: "Basic",
    cost: "$1.99 USD/Month",
    benefits: [
      "Max 5 Portfolio Pages",
      "Unlimited Portfolio Sections",
      "Access to Resumes",
    ],
  },
  {
    title: "Dev",
    cost: "$2.99 USD/Month",
    benefits: [
      "Max 10 Portfolio Pages",
      "Unlimited Portfolio Sections",
      "Access to Resumes",
      "Access to API",
    ],
  },
];

export default function Pricing() {
  const theme = useTheme();
  const { membership } = useContext(homeContext);
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={5}
      minHeight={"calc(100vh - 61px)"}
    >
      {membership?.map((type, index) => {
        return (
          <Paper
            variant="outlined"
            key={index}
            sx={{
              position: "relative",
              width: "300px",
              zoom: index === 1 ? 1.2 : 1,
              zIndex: index === 1 ? 2 : 1,
              boxShadow: index === 1 && "0 0 20px rgba(0,0,0,0.5 )",
              height: "max-content",
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
                  <Stack direction={"row"} gap={2}>
                    {type.feature.isResumeAccess ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Cancel color="error" />
                    )}{" "}
                    Resume Access
                  </Stack>
                  <Stack direction={"row"} gap={2}>
                    {type.feature.isAPIAccess ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Cancel color="error" />
                    )}{" "}
                    API Access
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
