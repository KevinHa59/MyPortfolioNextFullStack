import {
  Add,
  CastForEducation,
  Check,
  Clear,
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

  // useEffect(() => {
  //   setInput(data);
  // }, [data]);

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
                sx={{ background: theme.palette.grey[200] }}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <TipsAndUpdates />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {project.title}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveProject(index)}
                >
                  <Clear />
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
        gap={1}
        justifyContent={"flex-end"}
        height={"37px"}
      >
        <Button startIcon={<Add />} color="primary" onClick={handleAddProject}>
          Add Project
        </Button>
        <Button startIcon={<Check />} color="success">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
