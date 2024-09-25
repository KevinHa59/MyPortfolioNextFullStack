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
  Add,
  AddCircle,
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
import { asyncNoteContext } from "../widgets/notification/async-notification";
import { useRouter } from "next/router";
import { adminContext } from "../../pages/admin";

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
    xs: 2,
  },
  {
    name: "Created At",
    key: "createdAt",
    xs: 2,
  },
  {
    name: "",
    key: "actions",
    xs: 1,
    align: "right",
  },
];

export default function Resumes({ defaultUser }) {
  const router = useRouter();
  const { addNote } = useContext(asyncNoteContext);
  const { mainData } = useContext(adminContext);
  const [tableHeader, setTableHeader] = useState(headers);

  const handleRouteEdit = (id) => {
    router.push({
      pathname: router.pathname,
      query: {
        // section: "edit",
        ...router.query,
        id: id,
      },
    });
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Resumes"} icon={<Article />}>
        <Stack direction={"row"} gap={1}></Stack>
      </Header>
      <Stack
        sx={{
          height: "100%",

          overflow: "hidden",
        }}
      >
        <Paper className="flat br0">
          <Table
            data={mainData?.resumes}
            headers={tableHeader}
            callback_cell={(row, key) => {
              return <Cell row={row} header={key} onRemoveSuccess={() => {}} />;
            }}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}

function Cell({ row, header, onRemoveSuccess }) {
  const [isRemoving, setIsRemoving] = useState(false);
  if (header === "userFirstName") {
    return row["user"].firstName;
  } else if (header === "userLastName") {
    return row["user"].lastName;
  } else if (header === "userEmail") {
    return row["user"].email;
  } else if (header === "createdAt") {
    return new Date(row[header]).toLocaleString();
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
        <ButtonDialogConfirm
          isLoading={isRemoving}
          dialog_color={"error"}
          dialog_title={"Delete Resume"}
          dialog_message={"Are You Sure?"}
          color="error"
          size="small"
          onConfirm={handleRemoveResume}
        >
          Block
        </ButtonDialogConfirm>
      </Stack>
    );
  } else {
    return row[header];
  }
}
