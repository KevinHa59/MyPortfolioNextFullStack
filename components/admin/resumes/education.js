import {
  Add,
  CastForEducation,
  Check,
  Clear,
  School,
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
import PublicAPI from "../../../pages/api-functions/PublicAPI";
import AutocompleteCustom from "../../widgets/autocomplete/autocomplete";

const edu_template = {
  degree: "",
  schoolName: "",
  location: "",
  startDate: "",
  endDate: "",
  fieldOfStudy: "",
  gpa: "",
};

export default function Education({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([edu_template]);
  const [universitySearch, setUniversitySearch] = useState({
    search: "",
    data: [],
  });
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const data = await getUniversity("Houston");
    console.log(data);
  };

  const handleAddEducation = () => {
    setInput((prev) => {
      return [...prev, { ...edu_template }];
    });
  };

  const handleRemoveEducation = (index) => {
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
        {input.map((edu, index) => {
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
                  <School />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {edu.schoolName}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <Clear />
                </IconButton>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <TextField
                    variant="filled"
                    fullWidth
                    value={edu.schoolName}
                    label="School"
                    onChange={(e) =>
                      handleInputChange({ schoolName: e.target.value }, index)
                    }
                  />
                  <TextField
                    variant="filled"
                    focused
                    type="date"
                    value={edu.startDate}
                    label="From"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ startDate: e.target.value }, index)
                    }
                  />
                  <TextField
                    variant="filled"
                    focused
                    type="date"
                    value={edu.endDate}
                    label="To"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ endDate: e.target.value }, index)
                    }
                  />
                </Stack>

                <TextField
                  variant="filled"
                  value={edu.location}
                  label="Location"
                  onChange={(e) =>
                    handleInputChange({ location: e.target.value }, index)
                  }
                />
                <Stack direction={"row"} gap={1}>
                  <TextField
                    variant="filled"
                    fullWidth
                    value={edu.degree}
                    label="Degree"
                    onChange={(e) =>
                      handleInputChange({ degree: e.target.value }, index)
                    }
                  />
                  <TextField
                    variant="filled"
                    fullWidth
                    value={edu.fieldOfStudy}
                    label="Field"
                    onChange={(e) =>
                      handleInputChange({ fieldOfStudy: e.target.value }, index)
                    }
                  />
                  <TextField
                    variant="filled"
                    value={edu.gpa}
                    label="GPA"
                    sx={{ minWidth: "100px" }}
                    onChange={
                      ((e) => handleInputChange({ gpa: e.target.value }), index)
                    }
                  />
                </Stack>
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
        <Button
          startIcon={<Add />}
          color="primary"
          onClick={handleAddEducation}
        >
          Add Education
        </Button>
        <Button startIcon={<Check />} color="success">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}

async function getUniversity(search) {
  try {
    const res = await PublicAPI.getUniversity(search);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
