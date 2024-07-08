import { Add, Check, Clear, Engineering, School } from "@mui/icons-material";
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
import ButtonLoading from "../../widgets/buttons/button-loading";
import MyAPIs from "../../../pages/api-functions/MyAPIs";

const work_template = {
  jobTitle: "",
  companyName: "",
  location: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

export default function WorkExperience({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([work_template]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.workExperience?.length > 0) {
      const _works = data.workExperience.map((work) => {
        return {
          ...work,
          responsibilities: work.responsibilities.join(". "),
        };
      });
      setInput(_works);
    }
  }, [data]);

  const handleAddWork = () => {
    setInput((prev) => {
      return [...prev, { ...work_template }];
    });
  };

  const handleRemoveWork = (index) => {
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

  const handleSave = () => {
    setIsSaving(true);
    const res = MyAPIs.Resume().updateResumeWork(data.id, input);
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
        {input.map((work, index) => {
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
                  <Engineering />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {work.jobTitle}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveWork(index)}
                >
                  <Clear />
                </IconButton>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <Input
                    sx={{ width: "100%" }}
                    value={work.jobTitle}
                    label="Job Title"
                    onChange={(e) =>
                      handleInputChange({ jobTitle: e.target.value }, index)
                    }
                  />
                  <Input
                    type="date"
                    value={work.startDate ? work.startDate.split("T")[0] : null}
                    label="From"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ startDate: e.target.value }, index)
                    }
                  />
                  <Input
                    type="date"
                    value={work.endDate ? work.endDate.split("T")[0] : null}
                    label="To"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ endDate: e.target.value }, index)
                    }
                  />
                </Stack>

                <Input
                  value={work.companyName}
                  label="Company"
                  onChange={(e) =>
                    handleInputChange({ companyName: e.target.value }, index)
                  }
                />
                <Input
                  value={work.location}
                  label="Location"
                  onChange={(e) =>
                    handleInputChange({ location: e.target.value }, index)
                  }
                />
                <Input
                  value={work.responsibilities}
                  multiline={true}
                  rows={5}
                  label="Responsibilities"
                  onChange={(e) =>
                    handleInputChange(
                      { responsibilities: e.target.value },
                      index
                    )
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
        <Button startIcon={<Add />} color="primary" onClick={handleAddWork}>
          Add workcation
        </Button>
        <ButtonLoading
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
