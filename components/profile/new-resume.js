import React, { useContext, useEffect, useState } from "react";

import { getCookie } from "cookies-next";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../admin/header";
import {
  Badge,
  Diversity1,
  EmojiEvents,
  FitnessCenter,
  HistoryEdu,
  Pool,
  School,
  SensorOccupied,
  Work,
  Language as LanguageIcon,
  Article,
  ArrowRight,
  DeleteForever,
  Remove,
  Add,
  Tag,
  Label,
  Edit,
  Check,
  Clear,
} from "@mui/icons-material";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import Input from "../widgets/input/Input";
import Education from "../admin/resumes/education";
import Certification from "../admin/resumes/certification";
import Skill from "../admin/resumes/skill";
import Project from "../admin/resumes/project";
import WorkExperience from "../admin/resumes/work";
import VolunteerExperience from "../admin/resumes/volunteer";
import Award from "../admin/resumes/award";
import Language from "../admin/resumes/language";
import Hobby from "../admin/resumes/hobby";
import { useRouter } from "next/router";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import MyAPIs from "../../pages/api-functions/MyAPIs";

export default function NewResume() {
  const { addNote } = useContext(asyncNoteContext);

  const [isGettingResume, setIsGettingResume] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(steps[0]);
  const [error, setError] = useState(null);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [resumeData, setResumeData] = useState({
    id: null,
    user: null,
    title: "New Resume",
    summary: "",
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    awards: [],
    volunteerExperience: [],
    languages: [],
    hobbies: [],
  });

  useEffect(() => {
    const { id } = router.query;

    if (id) {
      setIsGettingResume(true);
      getResume(id);
    } else {
      let user = getCookie("user");
      if (user) {
        user = JSON.parse(user);
      }
      handleResumeDataChange({ user: user });
      setIsGettingResume(false);
    }
  }, []);

  const getResume = async (id) => {
    try {
      const res = await addNote(
        "Get Resume",
        MyAPIs.Resume().getResumeByID(id)
      );
      const resume = { ...res.data };
      delete resume.userID;
      setResumeData(resume);
      setIsGettingResume(false);
    } catch (error) {
      console.log(error);
      setIsGettingResume(false);
    }
  };

  const handleResumeDataChange = (newData) => {
    setResumeData((prev) => {
      return {
        ...prev,
        ...newData,
      };
    });
  };

  const handleCreateResume = async () => {
    try {
      // create resume
      const res = await addNote(
        "Create New Resume",
        MyAPIs.Resume().createResume(resumeData.user.id, resumeData.title)
      );
      // if error
      if (res.data.error) {
        setError(res.data.error);
        return;
      }
      setError(null);
      // get new resume id from res
      const id = res.data.id;
      // push id to url
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          id: id,
        },
      });
      // update resume data
      handleResumeDataChange({ id: id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"} position={"relative"}>
      <Header title={"New Resumes"} icon={<Article />}>
        <Stack direction={"row"} gap={1}></Stack>
      </Header>
      {resumeData.id === null && router.query.id === undefined ? (
        <Stack
          width="100%"
          height={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Input
            inputClassName={"center"}
            value={resumeData.title}
            sx={{ width: "500px" }}
            label={"Name Your New Resume"}
            onChange={(e) => handleResumeDataChange({ title: e.target.value })}
          />
          <Button variant="contained" size="small" onClick={handleCreateResume}>
            Create
          </Button>
          {error && <Typography color={"red"}>{error}</Typography>}
        </Stack>
      ) : router.query.id && isGettingResume ? (
        <Stack width="100%" alignItems={"center"}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          paddingX={2}
          height={"calc(100% - 100px)"}
          gap={4}
        >
          <Paper
            sx={{
              minWidth: "250px",
              height: "100%",
              position: "sticky",
              top: 0,
              overflowX: "hidden",
            }}
          >
            <Stack
              gap={1}
              padding={2}
              sx={{
                overflowY: "auto",
              }}
            >
              {steps.map((_step, index) => {
                return (
                  <>
                    <a
                      href={`#${_step.name}`}
                      key={index}
                      style={{ width: "100%" }}
                    >
                      <Button
                        onClick={() => {
                          setStep(null);
                          setTimeout(() => {
                            setStep(_step);
                          }, 100);
                        }}
                        startIcon={_step.Icon}
                        className={
                          step?.name === _step.name ? "active" : "inactive"
                        }
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "flex-start",
                          transition: "ease 0.1s",
                          position: "relative",
                        }}
                      >
                        <Slide direction="right" in={step?.name === _step.name}>
                          <ArrowRight
                            sx={{ position: "absolute", left: "-15px" }}
                          />
                        </Slide>
                        {_step.name}
                      </Button>
                    </a>
                  </>
                );
              })}
            </Stack>
          </Paper>
          <Stack width={"100%"} alignItems={"center"}>
            <Stack
              sx={{
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 2,
                height: "50px",
              }}
              direction={"row"}
              alignItems={"center"}
              gap={1}
            >
              <Input
                inputProps={{
                  startAdornment: <Label sx={{ paddingRight: 1 }} />,
                  endAdornment: (
                    <Stack direction={"row"} gap={1}>
                      <IconButton size="small" color="success">
                        <Check />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setIsTitleEditable(false)}
                      >
                        <Clear />
                      </IconButton>
                    </Stack>
                  ),
                }}
                value={resumeData.title}
                isEdit={isTitleEditable}
                // fullWidth
                // sx={{ width: "100%" }}
              />
              {!isTitleEditable && (
                <IconButton
                  size="small"
                  color="warning"
                  onClick={() => setIsTitleEditable(true)}
                >
                  <Edit />
                </IconButton>
              )}
            </Stack>
            <Stack
              width={"100%"}
              // width={"calc(500px, 100%, 1000px)"}
              height={"calc(100% - 50px)"}
              gap={10}
              position={"relative"}
              sx={{ overflowY: "auto", scrollBehavior: "smooth" }}
            >
              <Stack id={steps[0].name} width={"100%"} height={"100%"}>
                <Stack
                  width={"100%"}
                  sx={{
                    height: "100%",
                    borderRadius: 0,
                    overflowX: "hidden",
                  }}
                >
                  <Stack sx={{ overflowY: "auto" }} gap={3} paddingX={5}>
                    <Input
                      label="Write short cool summary about yourself here... "
                      fullWidth
                      multiline
                      rows={10}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack id={steps[1].name} width={"100%"}>
                <Education
                  resumeID={resumeData.id}
                  data={resumeData.education}
                  step={steps[1]}
                />
              </Stack>
              <Stack id={steps[2].name} width={"100%"}>
                <Certification
                  data={resumeData.certifications}
                  step={steps[2]}
                />
              </Stack>
              <Stack id={steps[3].name} width={"100%"}>
                <Skill data={resumeData.skills} step={steps[3]} />
              </Stack>
              <Stack id={steps[4].name} width={"100%"}>
                <Project data={resumeData.projects} step={steps[4]} />
              </Stack>
              <Stack id={steps[5].name} width={"100%"}>
                <WorkExperience
                  data={resumeData.workExperience}
                  step={steps[5]}
                />
              </Stack>
              <Stack id={steps[6].name} width={"100%"}>
                <VolunteerExperience
                  data={resumeData.volunteerExperience}
                  step={steps[6]}
                />
              </Stack>
              <Stack id={steps[7].name} width={"100%"}>
                <Award data={resumeData.awards} step={steps[7]} />
              </Stack>
              <Stack id={steps[8].name} width={"100%"}>
                <Language data={resumeData.languages} step={steps[8]} />
              </Stack>
              <Stack id={steps[9].name} width={"100%"}>
                <Hobby data={resumeData.hobbies} step={steps[9]} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

const steps = [
  {
    name: "Summary",
    Icon: <Badge />,
  },
  {
    name: "Education",
    Icon: <School />,
  },
  {
    name: "Certifications",
    Icon: <HistoryEdu />,
  },
  {
    name: "Skills",
    Icon: <FitnessCenter />,
  },
  {
    name: "Projects",
    Icon: <SensorOccupied />,
  },
  {
    name: "Work Experience",
    Icon: <Work />,
  },
  {
    name: "Volunteer Experience",
    Icon: <Diversity1 />,
  },
  {
    name: "Awards",
    Icon: <EmojiEvents />,
  },
  {
    name: "Languages",
    Icon: <LanguageIcon />,
  },
  {
    name: "Hobbies",
    Icon: <Pool />,
  },
];
