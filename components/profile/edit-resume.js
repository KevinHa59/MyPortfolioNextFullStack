import React, { createContext, useContext, useEffect, useState } from "react";

import { getCookie } from "cookies-next";
import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Slide,
  Stack,
  Switch,
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
  Settings,
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
import ButtonDialog from "../widgets/buttons/button_dialog";
import Sections from "../admin/resumes/sections";
import MenuRenderer from "../menu-renderer";

export const resumeContext = createContext(null);

export default function EditResume() {
  const { addNote } = useContext(asyncNoteContext);

  const [isGettingResume, setIsGettingResume] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const [steps, setSteps] = useState(_steps);
  const [step, setStep] = useState(_steps[0]);
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
    resumeSections: {},
  });
  useEffect(() => {
    const { id } = router.query;
    if (id !== undefined && id !== "new") {
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
  }, [router]);

  // {
  //   title: "Summary",
  //   Icon: <Badge />,
  //   visible: true,
  // },
  const getResume = async (id) => {
    try {
      const res = await addNote(
        "Get Resume",
        MyAPIs.Resume().getResumeByID(id)
      );
      const resume = { ...res.data };
      delete resume.userID;
      const sections = resume.resumeSections;

      // setStep(_steps);
      // console.log(_steps);
      initSections(sections);
      setResumeData(resume);
      setIsGettingResume(false);
    } catch (error) {
      console.log(error);
      setIsGettingResume(false);
    }
  };

  const initSections = (resumeSections) => {
    const _steps = constructSteps(resumeSections);
    setSteps(_steps);
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
        pathtitle: router.pathname,
        query: {
          ...router.query,
          id: id,
        },
      });
      // // update resume data
      // handleResumeDataChange({ id: id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSummary = async (data = null) => {
    try {
      const res = await addNote(
        "Save Summary",
        MyAPIs.Resume().updateResume(
          resumeData.id,
          data
            ? data
            : {
                summary: resumeData.summary,
              }
        )
      );
      setIsSummaryEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <resumeContext.Provider
      value={{
        handleResumeDataChange: handleResumeDataChange,
        handleUpdateSteps: initSections,
      }}
    >
      <Stack width={"100%"} height={"100%"} gap={"1px"} position={"relative"}>
        <Header title={"My Resumes"} subWidth="100%" icon={<Article />}>
          <Stack direction={"row"} gap={1} width={"100%"}>
            <Typography fontWeight={"bold"} variant="h5">
              /
            </Typography>
            {resumeData.id !== null && (
              <Stack
                sx={{
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 2,
                }}
                direction={"row"}
                alignItems={"center"}
              >
                <Label />
                <Input
                  value={resumeData.title}
                  onChange={(e) =>
                    handleResumeDataChange({ title: e.target.value })
                  }
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
                {isTitleEditable && (
                  <Stack direction={"row"}>
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => {
                        handleSaveSummary({ title: resumeData.title });
                        setIsTitleEditable(false);
                      }}
                    >
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
                )}
              </Stack>
            )}
          </Stack>
        </Header>
        {resumeData.id === null && router.query.id === "new" ? (
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
          isGettingResume === false &&
          resumeData.id !== null && (
            <Stack direction={"row"} height={"calc(100% - 100px)"}>
              <Paper
                className="normal br0"
                sx={{
                  minWidth: "250px",
                  height: "100%",
                  position: "sticky",
                  top: 0,
                  overflowX: "hidden",
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  paddingX={1}
                >
                  <Typography>Sections</Typography>
                  {steps?.length > 0 && (
                    <Sections
                      data={steps.filter((st) => st.visible !== undefined)}
                      resumeID={resumeData.id}
                    />
                  )}
                </Stack>
                <Divider />
                <Stack
                  sx={{
                    overflowY: "auto",
                  }}
                >
                  {steps
                    ?.filter((st) => {
                      return st.visible === true;
                    })
                    .map((_step, index) => {
                      return (
                        <>
                          <a
                            href={`#${_step.title}`}
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
                              className={`${
                                step?.title === _step.title
                                  ? "active"
                                  : "inactive"
                              } br0`}
                              sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: "flex-start",
                                transition: "ease 0.1s",
                                position: "relative",
                                width: "100%",
                              }}
                            >
                              {_step.title}
                            </Button>
                          </a>
                        </>
                      );
                    })}
                </Stack>
              </Paper>
              <Divider orientation="vertical" />
              <Stack width={"100%"} alignItems={"center"}>
                <Stack
                  width={"100%"}
                  height={"calc(100%)"}
                  gap={2}
                  position={"relative"}
                  sx={{
                    paddingX: 2,
                    paddingBottom: 2,
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                    opacity: 0.8,
                    background: `repeating-linear-gradient( -45deg, transparent, transparent 5px, ${theme.palette.background.paper} 5px, ${theme.palette.background.paper} 25px )`,
                  }}
                >
                  <Stack
                    id={steps[0]?.title}
                    width={"100%"}
                    height={"100%"}
                    sx={{
                      marginTop: 2,
                      // background: theme.palette.background.default,
                    }}
                  >
                    <Paper
                      variant="outlined"
                      className="normal"
                      width={"100%"}
                      sx={{
                        height: "100%",
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
                              <Button
                                color="success"
                                onClick={handleSaveSummary}
                              >
                                Save
                              </Button>
                              <Button
                                color="error"
                                onClick={() => setIsSummaryEdit(false)}
                              >
                                Close
                              </Button>
                            </>
                          ) : (
                            <Button
                              color="warning"
                              onClick={() => setIsSummaryEdit(true)}
                            >
                              Edit
                            </Button>
                          )}
                        </Stack>
                      </Stack>
                    </Paper>
                  </Stack>
                  {steps?.map((section, index) => {
                    if (index > 0) {
                      return (
                        <Paper
                          key={index}
                          id={section?.title}
                          className="normal"
                          variant="outlined"
                          sx={{
                            width: "100%",
                            background: theme.palette.background.default,
                            display: section?.visible ? "block" : "none",
                          }}
                        >
                          <section.Comp
                            resumeID={resumeData.id}
                            data={resumeData[section.key]}
                            step={section}
                          />
                        </Paper>
                      );
                    }
                  })}
                </Stack>
              </Stack>
            </Stack>
          )
        )}
      </Stack>
    </resumeContext.Provider>
  );
}

function constructSteps(sections) {
  const _section = _.cloneDeep(sections);
  delete _section["id"];
  delete _section["resumeID"];
  let sectionVisibility = Object.entries(_section)
    .filter((section) => {
      return typeof section[1] === "boolean";
    })
    .map((section) => {
      const comp = Components[section[0]];
      if (comp) {
        return {
          title: comp.title,
          Icon: comp.Icon,
          visible: section[1],
          priority: _section[`${section[0]}Priority`],
          Comp: comp.Comp,
          key: section[0],
        };
      } else {
        return null;
      }
    });
  sectionVisibility.unshift({
    title: "Summary",
    Icon: <Badge />,
    visible: true,
    priority: 0,
  });
  sectionVisibility = sectionVisibility
    .filter((item) => item !== null)
    .sort((a, b) => a.priority - b.priority);
  return sectionVisibility;
}

const _steps = [
  {
    title: "Summary",
    Icon: <Badge />,
    visible: true,
  },
];

const Components = {
  workExperience: {
    Comp: WorkExperience,
    title: "Work Experience",
    Icon: <Work />,
  },
  education: { Comp: Education, title: "Education", Icon: <School /> },
  skills: { Comp: Skill, title: "Skills", Icon: <FitnessCenter /> },
  certifications: {
    Comp: Certification,
    title: "Certifications",
    Icon: <HistoryEdu />,
  },
  projects: { Comp: Project, title: "Projects", Icon: <SensorOccupied /> },
  awards: { Comp: Award, title: "Awards", Icon: <EmojiEvents /> },
  volunteerExperience: {
    Comp: VolunteerExperience,
    title: "Volunteer Experience",
    Icon: <Diversity1 />,
  },
  languages: { Comp: Language, title: "Languages", Icon: <LanguageIcon /> },
  publications: null,
  professionalMemberships: null,
  hobbies: { Comp: Hobby, title: "Hobbies", Icon: <Pool /> },
};

// const _steps = [
//   {
//     title: "Summary",
//     Icon: <Badge />,
//     visible: true,
//   },
//   {
//     title: "Education",
//     Icon: <School />,
//     visible: true,
//   },
//   {
//     title: "Certifications",
//     Icon: <HistoryEdu />,
//     visible: true,
//   },
//   {
//     title: "Skills",
//     Icon: <FitnessCenter />,
//     visible: true,
//   },
//   {
//     title: "Projects",
//     Icon: <SensorOccupied />,
//     visible: true,
//   },
//   {
//     title: "Work Experience",
//     Icon: <Work />,
//     visible: true,
//   },
//   {
//     title: "Volunteer Experience",
//     Icon: <Diversity1 />,
//     visible: true,
//   },
//   {
//     title: "Awards",
//     Icon: <EmojiEvents />,
//     visible: true,
//   },
//   {
//     title: "Languages",
//     Icon: <LanguageIcon />,
//     visible: true,
//   },
//   {
//     title: "Hobbies",
//     Icon: <Pool />,
//     visible: true,
//   },
// ];
