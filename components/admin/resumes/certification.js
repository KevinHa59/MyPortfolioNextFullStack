import {
  Add,
  CastForEducation,
  Check,
  Clear,
  DeleteForever,
  HistoryEdu,
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
import Input from "../../widgets/input/Input";
import ButtonLoading from "../../widgets/buttons/button-loading";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import { StyleMode, styles } from "../../../styles/useStyle";
import { darkStyles } from "../../../theme/dark-theme-options";

const edu_template = {
  certificationName: "",
  issuingOrganization: "",
  dateObtained: "",
};

export default function Certification({ data, step, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([edu_template]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.length > 0) {
      setInput(data);
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

  const handleSave = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResumeCertification(data.id, input);
    setIsSaving(false);
  };

  return (
    <Stack height={"100%"} width={"100%"}>
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
            onClick={handleAddEducation}
          >
            Add Certification
          </Button>
          <ButtonLoading
            size="small"
            variant="contained"
            isLoading={isSaving}
            onClick={handleSave}
            startIcon={<Check />}
          >
            Save
          </ButtonLoading>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={1}
        paddingX={5}
      >
        {input.map((cer, index) => {
          return (
            <Paper key={index} variant="outlined">
              <Stack
                direction={"row"}
                paddingX={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <HistoryEdu sx={{ color: "#fff" }} />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {cer.certificationName}
                  </Typography>
                </Stack>
                <Button
                  startIcon={cer.id ? <DeleteForever /> : <Remove />}
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleRemoveEducation(index)}
                >
                  {cer.id ? "Delete" : "Remove"}
                </Button>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <Input
                    fullWidth
                    value={cer.certificationName}
                    sx={{ width: "100%" }}
                    label="Certification Name"
                    onChange={(e) =>
                      handleInputChange(
                        { certificationName: e.target.value },
                        index
                      )
                    }
                  />
                  <Input
                    type="date"
                    value={cer.dateObtained.split("T")[0]}
                    label="Obtained Date"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ dateObtained: e.target.value }, index)
                    }
                  />
                </Stack>

                <Input
                  value={cer.issuingOrganization}
                  label="Issuing Organization"
                  sx={{ width: "100%" }}
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
    </Stack>
  );
}
