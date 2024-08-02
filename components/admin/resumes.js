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
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
import { ResumeIcon } from "../../icons/resume";
import Link from "next/link";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import { useRouter } from "next/router";

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
  // {
  //   name: "",
  //   key: "actions",
  //   xs: 2,
  //   align: "right",
  // },
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
  const router = useRouter();
  const { addNote } = useContext(asyncNoteContext);
  const [generalData, setGeneralData] = useState({
    users: [],
    resumes: [],
  });
  const [isGettingData, setIsGettingData] = useState(false);
  const [tableHeader, setTableHeader] = useState(headers);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setIsGettingData(true);
    let APIs = [];

    if (defaultUser) {
      APIs = [
        addNote(
          "Get Resumes",
          MyAPIs.Resume().getResumesByUser(defaultUser.id)
        ),
      ];
      const res = await axios.all(APIs);
      let _resumes = res[0].data;
      handleUpdateGeneralData({
        resumes: _resumes,
      });
      setTableHeader(userHeaders);
    } else {
      APIs = [
        addNote("Get Users", MyAPIs.User().getUsers()),
        addNote("Get Resumes", MyAPIs.Resume().getResumes()),
      ];
      const res = await axios.all(APIs);
      let _resumes = res[1].data;
      handleUpdateGeneralData({
        users: res[0].data,
        resumes: _resumes,
      });
    }

    setIsGettingData(false);
  };

  const handleRouteEdit = (id) => {
    router.push({
      pathname: router.pathname,
      query: {
        section: "newResume",
        id: id,
      },
    });
  };

  const handleUpdateGeneralData = (newValue) => {
    setGeneralData((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleRemoveResume = async (id, setOpen) => {
    try {
      const res = await addNote(
        "Resume Removing",
        MyAPIs.Resume().deleteResumeByID(id)
      );
      setOpen(false);
      // filter out deleted from state
      const newResumes = generalData.resumes.filter((r) => r.id !== id);
      handleUpdateGeneralData({ resumes: newResumes });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"My Resumes"} icon={<Article />}>
        <Stack direction={"row"} gap={1}></Stack>
      </Header>
      <Stack
        sx={{
          height: "100%",

          overflow: "hidden",
        }}
      >
        {defaultUser ? (
          <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
            {generalData?.resumes.map((re, index) => {
              return (
                <ResumeCard
                  key={index}
                  index={index}
                  data={re}
                  onEdit={() => handleRouteEdit(re.id)}
                  onRemove={(setOpen) => handleRemoveResume(re.id, setOpen)}
                />
              );
            })}
          </Stack>
        ) : (
          <Table
            isLoading={isGettingData}
            data={generalData?.resumes}
            headers={tableHeader}
            callback_cell={(row, key) => (
              <Cell row={row} header={key} onRemoveSuccess={initData} />
            )}
          />
        )}
      </Stack>
    </Stack>
  );
}

function ResumeCard({ index, data, onEdit, onRemove }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Zoom in={true} style={{ transitionDelay: index * 100 }}>
      <Button
        onClick={onEdit}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        sx={{ overflow: "hidden" }}
      >
        <Stack
          alignItems={"center"}
          width={"clamp(100px, 10vw, 300px)"}
          height="100%"
          position={"relative"}
          sx={{ aspectRatio: "1/1" }}
        >
          <Stack
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              overflow: "hidden",
            }}
          >
            <Slide
              in={isHover}
              direction="right"
              // timeout={500}
              style={{ transition: "ease-in" }}
            >
              <Tooltip title="Delete Resume" placement="right">
                <Stack>
                  <ButtonDialogConfirm
                    size={"small"}
                    color={"error"}
                    dialog_color={"error"}
                    dialog_title={"Delete Resume"}
                    dialog_message={"Are You Sure?"}
                    sx={{ padding: 0, minWidth: "0" }}
                    onConfirm={onRemove}
                  >
                    <DeleteForever color="error" />
                  </ButtonDialogConfirm>
                </Stack>
              </Tooltip>
            </Slide>
          </Stack>
          <Stack alignItems={"center"}>
            <ResumeIcon
              sx={{
                width: "80%",
                height: "100%",
                aspectRatio: "0.8/1",
              }}
            />
          </Stack>
          <Typography variant="body2">{data.title}</Typography>
        </Stack>
      </Button>
    </Zoom>
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

function ResumeCreator({ data, onRefresh, onDelete, onClose }) {
  const theme = useTheme();
  const [step, setStep] = useState(steps[0]);
  return (
    <Stack
      direction={"row"}
      height={"calc(100vh - 120px)"}
      padding={2}
      sx={{ background: theme.palette.background.default }}
    >
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
          height={"calc(100% - 100px)"}
          gap={1}
          padding={2}
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
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
        {data.id && (
          <>
            <Divider />
            <ButtonDialogConfirm
              size={"small"}
              className="br0"
              fullWidth
              color="error"
              dialog_color={"error"}
              dialog_title={"Delete Resume"}
              dialog_message={"Are You Sure?"}
              onConfirm={onDelete}
            >
              Delete Resume
            </ButtonDialogConfirm>
          </>
        )}
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
