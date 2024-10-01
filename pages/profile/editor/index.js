import { Button, Divider, Paper, Stack } from "@mui/material";
import React from "react";
import { controllerTags, layoutTags, tags } from "./tags";
import Stepper, { Step } from "../../../components/widgets/stepper/stepper";

export default function Index() {
  return (
    <Stack minHeight={"100vh"} direction={"row"} width={"100%"} gap={2}>
      <Paper
        gap={1}
        sx={{
          width: "350px",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Stepper>
          <Step title={"Layouts"} step={0}>
            <LayoutComponents />
          </Step>
          <Step title={"Controllers"} step={1}>
            <ControllerComponents />
          </Step>
        </Stepper>
      </Paper>
      <Paper
        variant="outlined"
        sx={{ width: "100%", background: "transparent" }}
      >
        Hello
      </Paper>
      <Paper sx={{ width: "350px", maxHeight: "100vh" }}></Paper>
    </Stack>
  );
}

function LayoutComponents() {
  return (
    <Stack>
      {layoutTags.map((tag, index) => {
        return (
          <Button key={index} size="small">
            {tag.tagName}
          </Button>
        );
      })}
    </Stack>
  );
}
function ControllerComponents() {
  return (
    <Stack>
      {controllerTags.map((tag, index) => {
        return (
          <Button key={index} size="small">
            {tag.tagName}
          </Button>
        );
      })}
    </Stack>
  );
}
