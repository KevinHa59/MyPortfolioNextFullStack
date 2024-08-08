import React, { createContext, useContext, useEffect, useState } from "react";

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

export const resumeContext = createContext(null);

export default function NewResume() {
  const { addNote } = useContext(asyncNoteContext);

  const [isGettingResume, setIsGettingResume] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(steps[0]);
  const [error, setError] = useState(null);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isSummaryEdit, setIsSummaryEdit] = useState(false);
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

  const handleSaveSummary = async () => {
    try {
      const res = await addNote(
        "Save Summary",
        MyAPIs.Resume().updateResume(resumeData.id, {
          summary: resumeData.summary,
        })
      );
      setIsSummaryEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <resumeContext.Provider
      value={{ handleResumeDataChange: handleResumeDataChange }}
    >
      <Stack width={"100%"} height={"100%"} gap={"1px"} position={"relative"}>
        <Header title={"New Resumes"} subWidth="100%" icon={<Article />}>
          <Stack direction={"row"} gap={1} width={"100%"}>
            <Stack
              sx={{
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 2,
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
              />
              {!isTitleEditable && (
                <IconButton
                  size="small"
                  color="warning"
                  sx={{ padding: 0 }}
                  onClick={() => setIsTitleEditable(true)}
                >
                  <Edit />
                </IconButton>
              )}
            </Stack>
          </Stack>
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
              onChange={(e) =>
                handleResumeDataChange({ title: e.target.value })
              }
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleCreateResume}
            >
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
                          <Slide
                            direction="right"
                            in={step?.name === _step.name}
                          >
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
                width={"100%"}
                height={"calc(100%)"}
                gap={2}
                position={"relative"}
                sx={{
                  paddingX: 2,
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                  opacity: 0.8,
                  background: `repeating-linear-gradient( -45deg, transparent, transparent 5px, ${theme.palette.background.paper} 5px, ${theme.palette.background.paper} 25px )`,
                }}
              >
                <Stack
                  id={steps[0].name}
                  width={"100%"}
                  height={"100%"}
                  sx={{
                    background: theme.palette.background.default,
                    paddingY: 2,
                  }}
                >
                  <Stack
                    width={"100%"}
                    sx={{
                      height: "100%",
                      borderRadius: 0,
                      overflowX: "hidden",
                    }}
                  >
                    <Stack
                      width={"100%"}
                      sx={{ overflowY: "auto" }}
                      gap={3}
                      paddingX={5}
                      direction={"row"}
                    >
                      <Input
                        value={resumeData?.summary}
                        label={
                          isSummaryEdit
                            ? "Write short cool summary about yourself here... "
                            : "Summary"
                        }
                        sx={{ width: "100%" }}
                        fullWidth
                        multiline
                        rows={10}
                        isEdit={isSummaryEdit}
                        onChange={(e) =>
                          handleResumeDataChange({ summary: e.target.value })
                        }
                      />
                      <Stack>
                        {isSummaryEdit ? (
                          <>
                            <IconButton
                              color="success"
                              onClick={handleSaveSummary}
                            >
                              <Check />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => setIsSummaryEdit(false)}
                            >
                              <Clear />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            color="warning"
                            onClick={() => setIsSummaryEdit(true)}
                          >
                            <Edit />
                          </IconButton>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Paper
                  id={steps[1].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <Education
                    resumeID={resumeData.id}
                    data={resumeData.education}
                    step={steps[1]}
                  />
                </Paper>
                <Paper
                  id={steps[2].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <Certification
                    resumeID={resumeData.id}
                    data={resumeData.certifications}
                    step={steps[2]}
                  />
                </Paper>
                <Paper
                  id={steps[3].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <Skill
                    resumeID={resumeData.id}
                    data={resumeData.skills}
                    step={steps[3]}
                  />
                </Paper>
                <Paper
                  id={steps[4].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <Project
                    resumeID={resumeData.id}
                    data={resumeData.projects}
                    step={steps[4]}
                  />
                </Paper>
                <Paper
                  id={steps[5].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <WorkExperience
                    resumeID={resumeData.id}
                    data={resumeData.workExperience}
                    step={steps[5]}
                  />
                </Paper>
                <Paper
                  id={steps[6].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <VolunteerExperience
                    resumeID={resumeData.id}
                    data={resumeData.volunteerExperience}
                    step={steps[6]}
                  />
                </Paper>
                <Paper
                  id={steps[7].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <Award
                    resumeID={resumeData.id}
                    data={resumeData.awards}
                    step={steps[7]}
                  />
                </Paper>
                <Paper
                  id={steps[8].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    background: theme.palette.background.default,
                  }}
                >
                  <Language
                    resumeID={resumeData.id}
                    data={resumeData.languages}
                    step={steps[8]}
                  />
                </Paper>
                <Paper
                  id={steps[9].name}
                  className="flat"
                  variant="outlined"
                  sx={{
                    background: theme.palette.background.default,
                  }}
                >
                  <Hobby
                    resumeID={resumeData.id}
                    data={resumeData.hobbies}
                    step={steps[9]}
                  />
                </Paper>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </resumeContext.Provider>
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
