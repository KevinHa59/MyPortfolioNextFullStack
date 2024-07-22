import {
  Add,
  CastForEducation,
  Check,
  Clear,
  DeleteForever,
  Diversity1,
  Engineering,
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
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import { StyleMode, styles } from "../../../styles/useStyle";
import { darkStyles } from "../../../theme/dark-theme-options";

const volunteer_template = {
  role: "",
  organizationName: "",
  location: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

export default function VolunteerExperience({ data, step, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([volunteer_template]);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (data?.volunteerExperience?.length > 0) {
      setInput(data?.volunteerExperience);
    }
  }, [data]);

  const handleAddVolunteer = () => {
    setInput((prev) => {
      return [...prev, { ...volunteer_template }];
    });
  };

  const handleRemoveVolunteer = async (index, id, setOpen) => {
    if (id !== undefined) {
      const res = await MyAPIs.Resume().deleteResumeVolunteer(id);
      setOpen(false);
    }
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
    const res = await MyAPIs.Resume().updateResumeVolunteer(data.id, input);
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
            onClick={handleAddVolunteer}
          >
            Add Volunteer
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
        {input.map((volunteer, index) => {
          return (
            <Paper key={index} variant="outlined">
              <Stack
                direction={"row"}
                paddingX={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <Diversity1 sx={{ color: "#fff" }} />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {volunteer.role}
                  </Typography>
                </Stack>
                <ButtonDialogConfirm
                  variant={"contained"}
                  size="small"
                  color={"error"}
                  dialog_color="error"
                  dialog_title={"Delete Volunteer"}
                  dialog_message={"Are You Sure?"}
                  onConfirm={(setOpen) =>
                    handleRemoveVolunteer(index, volunteer.id, setOpen)
                  }
                  startIcon={volunteer.id ? <DeleteForever /> : <Remove />}
                  isConfirmRequired={volunteer.id !== undefined}
                >
                  {volunteer.id ? "Delete" : "Remove"}
                </ButtonDialogConfirm>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <Input
                    sx={{ width: "100%" }}
                    value={volunteer.role}
                    label="Role"
                    onChange={(e) =>
                      handleInputChange({ role: e.target.value }, index)
                    }
                  />
                  <Input
                    type="date"
                    value={volunteer.startDate.split("T")[0]}
                    label="From"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ startDate: e.target.value }, index)
                    }
                  />
                  <Input
                    type="date"
                    value={volunteer.endDate?.split("T")[0] || null}
                    label="To"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ endDate: e.target.value }, index)
                    }
                  />
                </Stack>

                <Input
                  value={volunteer.organizationName}
                  label="Organization Name"
                  onChange={(e) =>
                    handleInputChange(
                      { organizationName: e.target.value },
                      index
                    )
                  }
                />
                <Input
                  value={volunteer.location}
                  label="Location"
                  onChange={(e) =>
                    handleInputChange({ location: e.target.value }, index)
                  }
                />
                <Input
                  multiline={true}
                  rows={10}
                  value={volunteer.responsibilities}
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
    </Stack>
  );
}
