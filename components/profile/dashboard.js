import { AccountBoxRounded, Email, Phone } from "@mui/icons-material";
import { Divider, Fade, Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import LabelText from "../widgets/texts/label-text";
import { phoneFormat } from "../../utils/stringUtil";
import { profileContext } from "../../pages/profile";

export default function Dashboard() {
  const { mainData } = useContext(profileContext);

  return (
    <Fade in={true}>
      <Stack gap={2} height={"100%"}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"50%"}
          sx={{ aspectRatio: "1/1" }}
        >
          <Paper
            className="brMAX"
            sx={{ height: "100%", aspectRatio: "1/1" }}
          ></Paper>
        </Stack>
        <Typography
          //   fontWeight={"bold"}
          textAlign={"center"}
          sx={{ fontSize: "3vw" }}
        >{`${mainData.user?.firstName} ${mainData.user?.lastName}`}</Typography>
        <Divider />
        <Stack direction={"row"} justifyContent={"center"} gap={3}>
          <Stack alignItems={"flex-end"} sx={{ paddingX: 2, width: "50%" }}>
            <LabelText
              sx={{
                flexDirection: "row",
                width: "max-content",
                letterSpacing: "2px",
                alignItems: "center",
              }}
              sx_typo={{ fontSize: "clamp(13px, 1vw, 17px)" }}
              label={<Email sx={{ fontSize: "clamp(13px, 1vw, 18px)" }} />}
            >
              {mainData.user?.email}
            </LabelText>
          </Stack>
          <Divider orientation="vertical" />
          <Stack sx={{ paddingX: 2, width: "50%" }}>
            <LabelText
              sx={{
                flexDirection: "row",
                width: "max-content",
                letterSpacing: "2px",
                alignItems: "center",
              }}
              sx_typo={{ fontSize: "clamp(13px, 1vw, 17px)" }}
              label={<Phone sx={{ fontSize: "clamp(13px, 1vw, 18px)" }} />}
            >
              {phoneFormat(mainData.user?.cellPhone)}
            </LabelText>
          </Stack>
        </Stack>
        <Stack
          gap={2}
          width={"clamp(300px, 100%, 400px)"}
          height={"100%"}
        ></Stack>
      </Stack>
    </Fade>
  );
}
