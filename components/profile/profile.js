import {
  AccountBoxRounded,
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Phone,
  Public,
  Twitter,
  Web,
} from "@mui/icons-material";
import { Button, Divider, Fade, Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { profileContext } from "../../pages/profile";
import Input from "../widgets/input/Input";

export default function Profile() {
  const { mainData } = useContext(profileContext);

  return (
    <Fade in={true}>
      <Stack
        gap={5}
        direction={"row"}
        height={"100%"}
        paddingX={2}
        position={"relative"}
      >
        <Paper sx={{ width: "50%", height: "max-content" }}>
          <Stack padding={1}>
            <Stack height={"300px"}>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                sx={{ aspectRatio: "1/1" }}
              >
                <Paper
                  className="brMAX"
                  sx={{ height: "100%", aspectRatio: "1/1" }}
                ></Paper>
              </Stack>
              <Typography
                textAlign={"center"}
                sx={{ fontSize: "3vw" }}
              >{`${mainData.user?.firstName} ${mainData.user?.lastName}`}</Typography>
            </Stack>
            <Divider />

            <Stack gap={2} sx={{ padding: 2 }}>
              <Input label={"Email"} value={mainData.user.email} />
              <Input label={"Cell Phone"} value={mainData.user.cellPhone} />
              <Input
                type={"date"}
                label={"Date of Birth"}
                value={mainData.user.dob.split("T")[0]}
              />
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button variant="contained">Save</Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack gap={2} height={"50%"} alignItems={"center"}>
          <Paper sx={{ padding: 2, width: "100%" }}>
            <Stack gap={2}>
              <Stack gap={1}>
                <Input label={"Address"} value={mainData.user.address} />
                <Stack direction={"row"} gap={1}>
                  <Input label={"City"} value={mainData.user.city} />
                  <Input label={"State"} value={mainData.user.state} />
                  <Input label={"Zip Code"} value={mainData.user.zipCode} />
                </Stack>
                <Input label={"Country"} value={mainData.user.country} />
              </Stack>
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button variant="contained">Save</Button>
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{ padding: 2, width: "100%" }}>
            <Stack gap={2}>
              <Input
                inputProps={{
                  startAdornment: (
                    <Stack paddingRight={2}>
                      <LinkedIn />
                    </Stack>
                  ),
                }}
                label={"Linkedin"}
                value={mainData.user.linkedIn || ""}
              />
              <Input
                inputProps={{
                  startAdornment: (
                    <Stack paddingRight={2}>
                      <GitHub />
                    </Stack>
                  ),
                }}
                label={"Github"}
                value={mainData.user.github || ""}
              />
              <Input
                inputProps={{
                  startAdornment: (
                    <Stack paddingRight={2}>
                      <Twitter />
                    </Stack>
                  ),
                }}
                label={"Twitter"}
                value={mainData.user.twitter || ""}
              />
              <Input
                inputProps={{
                  startAdornment: (
                    <Stack paddingRight={2}>
                      <Facebook />
                    </Stack>
                  ),
                }}
                label={"Facebook"}
                value={mainData.user.facebook || ""}
              />
              <Input
                inputProps={{
                  startAdornment: (
                    <Stack paddingRight={2}>
                      <Instagram />
                    </Stack>
                  ),
                }}
                label={"Instagram"}
                value={mainData.user.instagram || ""}
              />
              <Input
                inputProps={{
                  startAdornment: (
                    <Stack paddingRight={2}>
                      <Public />
                    </Stack>
                  ),
                }}
                label={"Portfolio"}
                value={mainData.user.portfolio || ""}
              />
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button variant="contained">Save</Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Fade>
  );
}
