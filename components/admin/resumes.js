import {
  Badge,
  Clear,
  Delete,
  DeleteForever,
  Diversity1,
  Edit,
  EmojiEvents,
  FitnessCenter,
  HistoryEdu,
  Label,
  Pool,
  Remove,
  RemoveCircle,
  School,
  SensorOccupied,
  Work,
  Language as LanguageIcon,
  Article,
  ArrowRight,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  Fade,
  IconButton,
  LinearProgress,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import Input from "../widgets/input/Input";
import ResumesAPI from "../../pages/api-functions/ResumesAPI";
import ButtonLoading from "../widgets/buttons/button-loading";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import Table from "../widgets/tables/table";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import Header from "./header";

const resume_template = {
  user: null,
  title: "",
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
};
const headers = [
  {
    name: "Resume Title",
    key: "title",
    xs: 3,
  },
  {
    name: "First Name",
    key: "userFirstName",
    xs: 2,
  },
  {
    name: "Last Name",
    key: "userLastName",
    xs: 2,
  },
  {
    name: "Email",
    key: "userEmail",
    xs: 3,
  },
  {
    name: "",
    key: "actions",
    xs: 2,
    align: "right",
  },
];

const userHeaders = [
  {
    name: "Resume Title",
    key: "title",
    xs: 9,
  },
  {
    name: "",
    key: "actions",
    xs: 3,
    align: "right",
  },
];

export default function Resumes({ defaultUser }) {
  const [generalData, setGeneralData] = useState({
    users: [],
    resumes: [],
  });
  const [isGettingData, setIsGettingData] = useState(false);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [newResumeData, setNewResumeData] = useState(resume_template);
  const [tableHeader, setTableHeader] = useState(headers);
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setIsGettingData(true);
    const APIs = [MyAPIs.User().getUsers(), MyAPIs.Resume().getResumes()];
    const res = await axios.all(APIs);
    let _resumes = res[1];
    if (defaultUser) {
      _resumes = _resumes.filter((res) => res.user.id === defaultUser.id);
      setTableHeader(userHeaders);
    }
    handleUpdateGeneralData({
      users: res[0],
      resumes: _resumes,
    });
    setIsGettingData(false);
  };

  const handleUpdateGeneralData = (newValue) => {
    setGeneralData((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  // update newResumeData onChange
  const handleResumeChange = (newValue) => {
    initData();
    setNewResumeData((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  // on edit resume click
  const handleEditResume = (resumeData) => {
    handleResumeChange(resumeData);
    setIsNewUserOpen(true);
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Resume"} icon={<Article />}>
        <Stack direction={"row"} gap={1}>
          <ButtonDialog
            paperProps={{
              sx: { minWidth: "max-content", overflow: "hidden" },
            }}
            open={isNewUserOpen}
            isCloseOnClickOut={false}
            onClick={() => setIsNewUserOpen(true)}
            variant={"contained"}
            button_label="Create New Resume"
            size="small"
            title={"Resume"}
            onClose={() => {
              setIsNewUserOpen(false);
              handleResumeChange(resume_template);
            }}
          >
            {newResumeData.user === null ? (
              <UserSelection
                defaultUser={defaultUser}
                users={generalData.users}
                onChange={(resume) => handleResumeChange(resume)}
                onClose={() => setIsNewUserOpen(false)}
              />
            ) : (
              <ResumeCreator
                data={newResumeData}
                onRefresh={initData}
                onClose={() => {
                  setIsNewUserOpen(false);
                  handleResumeChange(resume_template);
                }}
              />
            )}
          </ButtonDialog>
        </Stack>
      </Header>
      <Stack
        sx={{
          height: "100%",

          overflow: "hidden",
        }}
      >
        <Table
          isLoading={isGettingData}
          data={generalData?.resumes}
          headers={tableHeader}
          callback_cell={(row, key) => (
            <Cell
              row={row}
              header={key}
              onEdit={() => handleEditResume(row)}
              onRemoveSuccess={initData}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}

function Cell({ row, header, onEdit, onRemoveSuccess }) {
  const [isRemoving, setIsRemoving] = useState(false);
  if (header === "userFirstName") {
    return row["user"].firstName;
  } else if (header === "userLastName") {
    return row["user"].lastName;
  } else if (header === "userEmail") {
    return row["user"].email;
  } else if (header === "actions") {
    const handleRemoveResume = async (setOpen) => {
      setIsRemoving(true);
      const res = await MyAPIs.Resume().deleteResumeByID(row["id"]);
      if (res) {
        onRemoveSuccess && onRemoveSuccess();
        setOpen(false);
      }
      setIsRemoving(false);
    };
    return (
      <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
        <IconButton color="warning" size="small" onClick={onEdit}>
          <Edit />
        </IconButton>
        <ButtonDialogConfirm
          isLoading={isRemoving}
          dialog_color={"error"}
          dialog_title={"Delete Resume"}
          dialog_message={"Are You Sure?"}
          color="error"
          size="small"
          sx={{ paddingX: 0, minWidth: 0 }}
          onConfirm={handleRemoveResume}
        >
          <Delete />
        </ButtonDialogConfirm>
      </Stack>
    );
  } else {
    return row[header];
  }
}

// select user
function UserSelection({ users, defaultUser = null, onChange, onClose }) {
  const [input, setInput] = useState({
    user: defaultUser,
    title: "",
  });
  const [isCreateResume, setIsCreateResume] = useState(false);

  const handleInputChange = (newValue) => {
    setInput((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleCreateResume = async () => {
    setIsCreateResume(true);
    const res = await createResume(input.user.id, input.title);
    onChange && onChange(input);
    setIsCreateResume(false);
  };

  return (
    <Stack width={"400px"} padding={2} gap={2}>
      {defaultUser === null && (
        <Autocomplete
          size="small"
          value={input.user}
          options={users}
          getOptionLabel={(option) =>
            `${option.firstName} ${option.lastName} - ${option.email}`
          }
          onChange={(event, newValue) => handleInputChange({ user: newValue })}
          renderInput={(params) => (
            <TextField {...params} label="Search User" />
          )}
        />
      )}

      <Input
        label={"Resume Title"}
        onChange={(e) => handleInputChange({ title: e.target.value })}
      />
      <Divider />
      <Stack direction={"row"} justifyContent={"flex-end"} gap={1}>
        <ButtonLoading
          variant={"contained"}
          size="small"
          isLoading={isCreateResume}
          onClick={handleCreateResume}
        >
          Create
        </ButtonLoading>
      </Stack>
    </Stack>
  );
}

const steps = [
  {
    name: "Summary",
    Comp: Summary,
    Icon: <Badge />,
  },
  {
    name: "Education",
    Comp: Education,
    Icon: <School />,
  },
  {
    name: "Certifications",
    Comp: Certification,
    Icon: <HistoryEdu />,
  },
  {
    name: "Skills",
    Comp: Skill,
    Icon: <FitnessCenter />,
  },
  {
    name: "Projects",
    Comp: Project,
    Icon: <SensorOccupied />,
  },
  {
    name: "Work Experience",
    Comp: WorkExperience,
    Icon: <Work />,
  },
  {
    name: "Volunteer Experience",
    Comp: VolunteerExperience,
    Icon: <Diversity1 />,
  },
  {
    name: "Awards",
    Comp: Award,
    Icon: <EmojiEvents />,
  },
  {
    name: "Languages",
    Comp: Language,
    Icon: <LanguageIcon />,
  },
  //   {
  //     name: "Publications",
  //     Comp: null,
  //   },
  {
    name: "Hobbies",
    Comp: Hobby,
    Icon: <Pool />,
  },
];

function ResumeCreator({ data, onRefresh, onClose }) {
  const [step, setStep] = useState(steps[0]);
  return (
    <Stack direction={"row"} height={"calc(100vh - 120px)"} padding={2}>
      <Paper
        sx={{
          width: "250px",
        }}
      >
        <Stack
          sx={{
            padding: 1,
          }}
        >
          <Typography
            fontWeight={"bold"}
          >{`${data.user.firstName} ${data.user.lastName}`}</Typography>
          <Typography variant="body2">{`${data.user.email}`}</Typography>
        </Stack>

        <Stack
          height={"100%"}
          gap={1}
          padding={2}
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          {steps.map((_step, index) => {
            return (
              <>
                <Button
                  key={index}
                  onClick={() => {
                    setStep(null);
                    setTimeout(() => {
                      setStep(_step);
                    }, 100);
                  }}
                  startIcon={_step.Icon}
                  className={step?.name === _step.name ? "active" : "inactive"}
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "flex-start",
                    transition: "ease 0.1s",
                    position: "relative",
                  }}
                >
                  <Slide direction="right" in={step?.name === _step.name}>
                    <ArrowRight sx={{ position: "absolute", left: "-15px" }} />
                  </Slide>
                  {_step.name}
                </Button>
              </>
            );
          })}
        </Stack>
      </Paper>
      <Stack minWidth={"1000px"} height={"100%"}>
        <Stack
          width={"100%"}
          sx={{
            height: "100%",
            borderRadius: 0,
            overflowX: "hidden",
          }}
        >
          {step?.Comp && (
            <Fade
              in={true}
              direction="right"
              timeout={500}
              style={{ transition: "ease", width: "100%" }}
            >
              <Stack height={"100%"} width={"100%"}>
                <step.Comp
                  data={data}
                  onRefresh={onRefresh}
                  onChange={null}
                  step={step}
                />
              </Stack>
            </Fade>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

// create resume
async function createResume(userID, title) {
  try {
    const res = await ResumesAPI.createResume(userID, title);
    return res;
  } catch (error) {
    console.error(error);
  }
}
