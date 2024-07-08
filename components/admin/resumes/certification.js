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

const edu_template = {
  certificationName: "",
  issuingOrganization: "",
  dateObtained: "",
};

export default function Certification({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([edu_template]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data.certifications?.length > 0) {
      setInput(data.certifications);
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
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <HistoryEdu />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                    color={
                      cer.id
                        ? theme.palette.info.main
                        : theme.palette.text.primary
                    }
                  >
                    {cer.certificationName}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveEducation(index)}
                >
                  {cer.id ? <DeleteForever /> : <Remove />}
                </IconButton>
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
                    value={cer.dateObtained}
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
