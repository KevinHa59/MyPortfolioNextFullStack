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

const award_template = {
  awardName: "",
  issuingOrganization: "",
  dateReceived: "",
};

export default function Award({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([award_template]);

  // useEffect(() => {
  //   setInput(data);
  // }, [data]);

  const handleAddAward = () => {
    setInput((prev) => {
      return [...prev, { ...award_template }];
    });
  };

  const handleRemoveAward = (index) => {
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
                    {project.awardName}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveAward(index)}
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
                    value={project.awardName}
                    label="Award Name"
                    onChange={(e) =>
                      handleInputChange({ awardName: e.target.value }, index)
                    }
                  />
                  <TextField
                    variant="filled"
                    focused
                    value={project.dateReceived}
                    label="Date Received"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ dateReceived: e.target.value }, index)
                    }
                  />
                </Stack>

                <TextField
                  variant="filled"
                  value={project.issuingOrganization}
                  label="Issuing Organization"
                  onChange={(e) =>
                    handleInputChange(
                      { issuingOrganization: e.target.value },
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
        <Button startIcon={<Add />} color="primary" onClick={handleAddAward}>
          Add Award
        </Button>
        <Button startIcon={<Check />} color="success">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
