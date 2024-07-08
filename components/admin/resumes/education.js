import {
  Add,
  CastForEducation,
  Check,
  Clear,
  DeleteForever,
  DeleteForeverRounded,
  DeleteForeverSharp,
  DeleteForeverTwoTone,
  Remove,
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
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";

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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data.education?.length > 0) {
      setInput(data.education);
    }
  }, [data]);

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

  const handleUpdateEducation = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResumeEducation(data.id, input);
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
        {input.map((edu, index) => {
          return (
            <Paper key={index} variant="outlined">
              <Stack
                direction={"row"}
                paddingX={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <School />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                    color={
                      edu.id
                        ? theme.palette.info.main
                        : theme.palette.text.primary
                    }
                  >
                    {edu.schoolName}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveEducation(index)}
                >
                  {edu.id ? <DeleteForever /> : <Remove />}
                </IconButton>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <Input
                    label={"School"}
                    fullWidth={true}
                    value={edu.schoolName}
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange({ schoolName: e.target.value }, index)
                    }
                  />
                  <Input
                    label={"From"}
                    type={"date"}
                    value={edu.startDate ? edu.startDate.split("T")[0] : null}
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ startDate: e.target.value }, index)
                    }
                  />
                  <Input
                    label={"To"}
                    type={"date"}
                    value={edu.endDate ? edu.endDate.split("T")[0] : null}
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ endDate: e.target.value }, index)
                    }
                  />
                </Stack>
                <Input
                  label={"Location"}
                  fullWidth={true}
                  value={edu.location}
                  sx={{ width: "100%" }}
                  onChange={(e) =>
                    handleInputChange({ location: e.target.value }, index)
                  }
                />
                <Stack direction={"row"} gap={1}>
                  <Input
                    fullWidth
                    value={edu.degree}
                    label="Degree"
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange({ degree: e.target.value }, index)
                    }
                  />
                  <Input
                    fullWidth
                    value={edu.fieldOfStudy}
                    label="Field"
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange({ fieldOfStudy: e.target.value }, index)
                    }
                  />
                  <Input
                    value={edu.gpa}
                    label="GPA"
                    sx={{ minWidth: "100px" }}
                    onChange={(e) =>
                      handleInputChange({ gpa: e.target.value }, index)
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
        <ButtonLoading
          isLoading={isSaving}
          onClick={handleUpdateEducation}
          startIcon={<Check />}
          color="success"
        >
          Save
        </ButtonLoading>
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
