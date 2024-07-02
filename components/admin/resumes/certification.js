import {
  Add,
  CastForEducation,
  Check,
  Clear,
  HistoryEdu,
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

const edu_template = {
  certificationName: "",
  issuingOrganization: "",
  dateObtained: "",
};

export default function Certification({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([edu_template]);

  // useEffect(() => {
  //   setInput(data);
  // }, [data]);

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
        {input.map((cer, index) => {
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
                  <HistoryEdu />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {cer.certificationName}
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
                    value={cer.certificationName}
                    label="Certification Name"
                    onChange={(e) =>
                      handleInputChange(
                        { certificationName: e.target.value },
                        index
                      )
                    }
                  />
                  <TextField
                    variant="filled"
                    focused
                    type="date"
                    value={cer.dateObtained}
                    label="Obtained Date"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ dateObtained: e.target.value }, index)
                    }
                  />
                </Stack>

                <TextField
                  variant="filled"
                  value={cer.issuingOrganization}
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
        <Button
          startIcon={<Add />}
          color="primary"
          onClick={handleAddEducation}
        >
          Add Certification
        </Button>
        <Button startIcon={<Check />} color="success">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
