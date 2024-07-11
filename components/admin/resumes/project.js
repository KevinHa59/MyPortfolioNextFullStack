import {
  Add,
  CastForEducation,
  Check,
  Clear,
  DeleteForever,
  Remove,
  School,
  TipsAndUpdates,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";

const project_template = {
  title: "",
  role: "",
  technologies: "",
  description: "",
  achievements: "",
};

export default function Project({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([project_template]);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (data.projects?.length > 0) {
      const _projects = data.projects.map((pro) => {
        return {
          ...pro,
          technologies: pro.technologies.join(", "),
        };
      });
      setInput(_projects);
    }
  }, [data]);

  const handleAddProject = () => {
    setInput((prev) => {
      return [...prev, { ...project_template }];
    });
  };

  const handleRemoveProject = (index) => {
    const copy = _.cloneDeep(input);
    copy.splice(index, 1);
    setInput(copy);
  };

  const handleInputChange = (newValue, index) => {
    const copy = _.cloneDeep(input);
    copy[index] = {
      ...copy[index],
      ...newValue,
    };
    setInput(copy);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResumeProject(data.id, input);
    setIsSaving(false);
  };

  return (
    <Stack height={"100%"}>
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={5}
      >
        {input.map((project, index) => {
          return (
            <Paper key={index} variant="outlined">
              <Stack
                direction={"row"}
                paddingX={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <TipsAndUpdates />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                    color={
                      project.id
                        ? theme.palette.info.main
                        : theme.palette.text.primary
                    }
                  >
                    {project.title}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveProject(index)}
                >
                  {project.id ? <DeleteForever /> : <Remove />}
                </IconButton>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <Input
                    sx={{ width: "100%" }}
                    value={project.title}
                    label="Title"
                    onChange={(e) =>
                      handleInputChange({ title: e.target.value }, index)
                    }
                  />
                  <Input
                    value={project.role}
                    label="Role"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ role: e.target.value }, index)
                    }
                  />
                </Stack>

                <Input
                  value={project.technologies}
                  label="Technologies"
                  onChange={(e) =>
                    handleInputChange({ technologies: e.target.value }, index)
                  }
                />
                <Input
                  value={project.achievements}
                  label="Achievements"
                  onChange={(e) =>
                    handleInputChange({ achievements: e.target.value }, index)
                  }
                />
                <Input
                  value={project.description}
                  label="Description"
                  multiline={true}
                  rows={5}
                  onChange={(e) =>
                    handleInputChange({ description: e.target.value }, index)
                  }
                />
              </Stack>
            </Paper>
          );
        })}
      </Stack>
      <Divider />
      <Stack
        direction={"row"}
        gap={"1px"}
        justifyContent={"flex-end"}
        height={"37px"}
        paddingX={1}
      >
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          color="primary"
          onClick={handleAddProject}
        >
          Add Project
        </Button>
        <ButtonLoading
          size="small"
          variant="contained"
          isLoading={isSaving}
          onClick={handleSave}
          startIcon={<Check />}
          color="success"
        >
          Save
        </ButtonLoading>
      </Stack>
    </Stack>
  );
}
