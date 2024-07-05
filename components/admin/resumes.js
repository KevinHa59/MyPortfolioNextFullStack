import {
  Clear,
  Delete,
  DeleteForever,
  Edit,
  Label,
  Remove,
  RemoveCircle,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
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
import UsersAPI from "../../pages/api-functions/UsersAPI";
import Input from "../widgets/input/Input";
import ResumesAPI from "../../pages/api-functions/ResumesAPI";
import ButtonLoading from "../widgets/buttons/button-loading";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import Table from "../widgets/tables/table";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";

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

export default function Resumes() {
  const [generalData, setGeneralData] = useState({
    users: [],
    resumes: [],
  });
  const [isGettingData, setIsGettingData] = useState(false);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [newResumeData, setNewResumeData] = useState(resume_template);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setIsGettingData(true);
    const APIs = [MyAPIs.User().getUsers(), MyAPIs.Resume().getResumes()];
    const res = await axios.all(APIs);
    handleUpdateGeneralData({
      users: res[0],
      resumes: res[1],
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
            paperProps={{ sx: { minWidth: "max-content", overflow: "hidden" } }}
            open={isNewUserOpen}
            isCloseOnClickOut={false}
            onClick={() => setIsNewUserOpen(true)}
            sx_button={{ borderRadius: 0 }}
            variant={"contained"}
            button_label="Create New Resume"
            size="small"
          >
            {newResumeData.user === null ? (
              <UserSelection
                users={generalData.users}
                onChange={(resume) => handleResumeChange(resume)}
                onClose={() => setIsNewUserOpen(false)}
              />
            ) : (
              <ResumeCreator
                data={newResumeData}
                onClose={() => {
                  setIsNewUserOpen(false);
                  handleResumeChange(resume_template);
                }}
              />
            )}
          </ButtonDialog>
        </Stack>
      </Stack>
      <Divider sx={{ background: "rgba(100,100,100,1)" }} />
      {isGettingData && <LinearProgress />}
      <Stack gap={"1px"} padding={1} paddingX={10}>
        <Table
          data={generalData?.resumes || []}
          headers={headers}
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
function UserSelection({ users, onChange, onClose }) {
  const [input, setInput] = useState({
    user: null,
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
    <Stack width={"500px"} padding={1} gap={1}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="body1" fontWeight={"bold"}>
          Create New Resume
        </Typography>
        <IconButton
          disabled={isCreateResume}
          size="small"
          color="error"
          onClick={onClose}
        >
          <Clear />
        </IconButton>
      </Stack>
      <Divider />
      <Autocomplete
        size="small"
        value={input.user}
        options={users}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastName} - ${option.email}`
        }
        onChange={(event, newValue) => handleInputChange({ user: newValue })}
        renderInput={(params) => <TextField {...params} label="Search User" />}
      />
      <Input
        label={"Resume Title"}
        onChange={(e) => handleInputChange({ title: e.target.value })}
      />
      <Divider />
      <ButtonLoading isLoading={isCreateResume} onClick={handleCreateResume}>
        Create
      </ButtonLoading>
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

function ResumeCreator({ data, onClose }) {
  const theme = useTheme();
  const [step, setStep] = useState(steps[0]);
  return (
    <Stack
      margin={"1px"}
      direction={"row"}
      height={"90vh"}
      // sx={{ background: "rgba(0,0,0,0.1)" }}
    >
      <Stack width={"300px"} justifyContent={"space-evenly"}>
        <Stack
          paddingX={1}
          sx={{ background: theme.palette.background.default }}
        >
          <Typography fontWeight={"bold"}>New Resume</Typography>
          <Typography>{`${data.user.firstName} ${data.user.lastName}`}</Typography>
          <Typography>{`${data.user.email}`}</Typography>
        </Stack>
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
                  borderRight: `5px solid ${
                    step?.name === _step.name
                      ? theme.palette.primary.main
                      : "transparent"
                  }`,
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
                <step.Comp data={data} onChange={null} />
              </Stack>
            </Slide>
          )}
        </Paper>
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
