import {
  Add,
  Check,
  Clear,
  DeleteForever,
  Edit,
  Remove,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import { resumeContext } from "../../profile/new-resume";

const project_template = {
  id: null,
  title: "",
  role: "",
  technologies: "",
  description: "",
  achievements: "",
};

export default function Project({ resumeID, data, step }) {
  const { handleResumeDataChange } = useContext(resumeContext);
  const [input, setInput] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      setInput(data);
    }
  }, [data]);

  const handleAddNew = () => {
    // only allow add new one once per time
    if (!input.some((project) => project.id === null)) {
      setInput((prev) => {
        return [{ ...project_template }, ...prev];
      });
    }
  };

  const handleRemove = (index, setOpen) => {
    const copy = _.cloneDeep(input);
    copy.splice(index, 1);
    setInput(copy);
    setOpen(false);
  };

  const handleChange = (newProject) => {
    setInput(newProject);
    handleResumeDataChange({ projects: newProject });
  };

  return (
    <Stack height={"100%"} width={"100%"}>
      <Paper className="br0" sx={{ position: "sticky", top: 0, zIndex: 5 }}>
        <Stack
          direction={"row"}
          gap={"1px"}
          justifyContent={"space-between"}
          height={"45px"}
          padding={1}
        >
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            {step.Icon}
            <Typography>{step.name}</Typography>
          </Stack>
          <Stack direction={"row"} gap={"1px"} justifyContent={"flex-end"}>
            <Button
              size="small"
              startIcon={<Add />}
              color="primary"
              onClick={handleAddNew}
            >
              Add Project
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Divider />
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={1}
        paddingX={5}
      >
        {input.map((project, index) => {
          return (
            <Form
              resumeID={resumeID}
              data={project}
              onRemove={(setOpen) => handleRemove(index, setOpen)}
              onChange={handleChange}
              key={index}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

function Form({ resumeID, data, onRemove, onChange }) {
  const { addNote } = useContext(asyncNoteContext);
  const [isEdit, setIsEdit] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    setProject({
      ...data,
      technologies: data.technologies.join(", "),
    });
    if (data.id === null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);
  const handleInputChange = (newValue) => {
    setProject((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await addNote(
        "Update Project",
        MyAPIs.Resume().updateResumeProject(resumeID, [project])
      );
      setIsEdit(false);
      onChange && onChange(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper
      className="flat"
      sx={{ background: isEdit === false && "transparent" }}
    >
      <Stack
        direction={"row"}
        paddingX={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Typography fontWeight={"bold"} fontStyle={"italic"} variant="body1">
            {project?.title}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          {project?.id !== null && isEdit && (
            <IconButton color="success" onClick={() => handleUpdate()}>
              <Check />
            </IconButton>
          )}
          <IconButton
            color={isEdit ? "error" : "warning"}
            onClick={() => setIsEdit((prev) => !prev)}
          >
            {isEdit ? <Clear /> : <Edit />}
          </IconButton>

          <ButtonDialogConfirm
            size="small"
            color="error"
            sx={{ minWidth: "40px", paddingX: 0 }}
            dialog_color={"error"}
            dialog_title={"Remove Project"}
            dialog_message={"Are You Sure?"}
            onConfirm={onRemove}
          >
            {project?.id ? <DeleteForever /> : <Remove />}
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={1} paddingX={5} paddingY={3}>
        <Stack direction={"row"} gap={1}>
          <Input
            sx={{ width: "100%" }}
            value={project?.title}
            label="Title"
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ title: e.target.value })}
          />
          <Input
            value={project?.role}
            label="Role"
            isEdit={isEdit}
            sx={{ minWidth: "200px" }}
            onChange={(e) => handleInputChange({ role: e.target.value })}
          />
        </Stack>

        <Input
          value={project?.technologies}
          label="Technologies"
          isEdit={isEdit}
          onChange={(e) => handleInputChange({ technologies: e.target.value })}
        />
        <Input
          value={project?.achievements}
          label="Achievements"
          isEdit={isEdit}
          onChange={(e) => handleInputChange({ achievements: e.target.value })}
        />
        <Input
          value={project?.description}
          label="Description"
          multiline={true}
          rows={5}
          isEdit={isEdit}
          onChange={(e) => handleInputChange({ description: e.target.value })}
        />
      </Stack>
    </Paper>
  );
}
