import { Label } from "@mui/icons-material";
import {
  Button,
  Divider,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ButtonDialog from "../widgets/buttons/button_dialog";
import Summary from "./resumes/summary";
import Education from "./resumes/education";
import Certification from "./resumes/certification";
import Skill from "./resumes/skill";
import Project from "./resumes/project";
import WorkExperience from "./resumes/work";
import VolunteerExperience from "./resumes/volunteer";
import Award from "./resumes/award";
import Language from "./resumes/language";
import Hobby from "./resumes/hobby";

export default function Resumes() {
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  return (
    <Stack width={"100%"}>
      <Stack
        direction={"row"}
        gap={1}
        paddingX={1}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Label />
          <Typography variant="h6" fontWeight={"bold"}>
            Resumes
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <ButtonDialog
            paperProps={{ sx: { minWidth: "max-content" } }}
            open={isNewUserOpen}
            isCloseOnClickOut={false}
            onClick={() => setIsNewUserOpen(true)}
            sx_button={{ borderRadius: 0 }}
            variant={"contained"}
            button_label="Create New Resume"
            size="small"
          >
            <ResumeCreator onClose={() => setIsNewUserOpen(false)} />
          </ButtonDialog>
        </Stack>
      </Stack>
      <Divider sx={{ background: "rgba(100,100,100,1)" }} />
      {/* {isGettingData && <LinearProgress />}
          {!isGettingData && (
            <Stack gap={"1px"} padding={1} paddingX={10}>
              <Table
                data={users}
                headers={headers}
                callback_cell={(row, key) => <Cell row={row} header={key} />}
              />
            </Stack>
          )} */}
    </Stack>
  );
}
const steps = [
  {
    name: "Summary",
    Comp: Summary,
  },
  {
    name: "Education",
    Comp: Education,
  },
  {
    name: "Certifications",
    Comp: Certification,
  },
  {
    name: "Skills",
    Comp: Skill,
  },
  {
    name: "Projects",
    Comp: Project,
  },
  {
    name: "Work Experience",
    Comp: WorkExperience,
  },
  {
    name: "Volunteer Experience",
    Comp: VolunteerExperience,
  },
  {
    name: "Awards",
    Comp: Award,
  },
  {
    name: "Languages",
    Comp: Language,
  },
  //   {
  //     name: "Publications",
  //     Comp: null,
  //   },
  {
    name: "Hobbies",
    Comp: Hobby,
  },
];

function ResumeCreator({ onClose }) {
  const [step, setStep] = useState(steps[0]);
  return (
    <Stack
      margin={"1px"}
      direction={"row"}
      height={"90vh"}
      sx={{ background: "rgba(0,0,0,0.1)" }}
    >
      <Stack width={"300px"} justifyContent={"space-evenly"}>
        <Typography textAlign={"center"} fontWeight={"bold"}>
          New Resume
        </Typography>
        <Divider />
        <Stack height={"100%"}>
          {steps.map((_step, index) => {
            return (
              <Button
                key={index}
                onClick={() => {
                  setStep(null);
                  setTimeout(() => {
                    setStep(_step);
                  }, 100);
                }}
                sx={{
                  borderRadius: 0,
                  background: step?.name === _step.name && "#fff",
                  height: "100%",
                }}
              >
                {_step.name}
              </Button>
            );
          })}
        </Stack>
        <Divider />
        <Button color="error" onClick={onClose}>
          Close
        </Button>
      </Stack>

      <Stack minWidth={"1000px"} height={"100%"}>
        <Paper
          sx={{
            height: "100%",
            borderRadius: 0,

            overflowX: "hidden",
          }}
        >
          {step?.Comp && (
            <Slide
              in={true}
              direction="right"
              timeout={500}
              style={{ transition: "ease" }}
            >
              <Stack height={"100%"}>
                <step.Comp data={null} onChange={null} />
              </Stack>
            </Slide>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
}
