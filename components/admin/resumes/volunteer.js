import {
  Add,
  CastForEducation,
  Check,
  Clear,
  Diversity1,
  Engineering,
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
import Input from "../../widgets/input/Input";

const work_template = {
  role: "",
  organizationName: "",
  location: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

export default function VolunteerExperience({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([work_template]);

  // useEffect(() => {
  //   setInput(data);
  // }, [data]);

  const handleAddVolunteer = () => {
    setInput((prev) => {
      return [...prev, { ...work_template }];
    });
  };

  const handleRemoveVolunteer = (index) => {
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
                  <Diversity1 />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {edu.role}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveVolunteer(index)}
                >
                  <Clear />
                </IconButton>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <Input
                    sx={{ width: "100%" }}
                    value={edu.role}
                    label="Role"
                    onChange={(e) =>
                      handleInputChange({ role: e.target.value }, index)
                    }
                  />
                  <Input
                    type="date"
                    value={edu.startDate}
                    label="From"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ startDate: e.target.value }, index)
                    }
                  />
                  <Input
                    type="date"
                    value={edu.endDate}
                    label="To"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ endDate: e.target.value }, index)
                    }
                  />
                </Stack>

                <Input
                  value={edu.organizationName}
                  label="Organization Name"
                  onChange={(e) =>
                    handleInputChange(
                      { organizationName: e.target.value },
                      index
                    )
                  }
                />
                <Input
                  value={edu.location}
                  label="Location"
                  onChange={(e) =>
                    handleInputChange({ location: e.target.value }, index)
                  }
                />
                <Input
                  multiline={true}
                  rows={5}
                  value={edu.responsibilities}
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
        <Button
          startIcon={<Add />}
          color="primary"
          onClick={handleAddVolunteer}
        >
          Add Volunteer
        </Button>
        <Button startIcon={<Check />} color="success">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
