import {
  Check,
  Clear,
  PriorityHigh,
  Settings,
  Warning,
} from "@mui/icons-material";
import {
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ButtonDialog from "../../widgets/buttons/button_dialog";
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import { resumeContext } from "../../profile/edit-resume";
import MyAPIs from "../../../pages/api-functions/MyAPIs";

export default function Sections({ resumeID, data }) {
  const { addNote } = useContext(asyncNoteContext);
  const { handleResumeDataChange, handleUpdateSteps } =
    useContext(resumeContext);
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setSteps(data);
  }, []);

  const handleStepChange = (index) => {
    const copy = _.cloneDeep(steps);
    copy[index].visible = !copy[index].visible;
    setSteps(copy);
  };

  const handleSave = async () => {
    try {
      const newSectionData = {};
      steps.forEach((st) => {
        const key = (st.name[0].toLowerCase() + st.name.slice(1)).replaceAll(
          " ",
          ""
        );
        newSectionData[key] = st.visible;
      });
      const res = await addNote(
        "Save Sections",
        MyAPIs.Resume().updateResumeSections(resumeID, newSectionData)
      );
      handleUpdateSteps(res.data);
      handleResumeDataChange({ resumeSections: res.data });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ButtonDialog
      open={open}
      isCloseOnClickOut={false}
      onClick={() => setOpen(true)}
      title={
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          paddingX={1}
        >
          <Typography variant="body1" fontWeight={"bold"}>
            Sections
          </Typography>
          <Stack direction={"row"} width={"max-content"}>
            <IconButton size="small" color="success" onClick={handleSave}>
              <Check />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setOpen(false);
                setSteps(data);
              }}
            >
              <Clear />
            </IconButton>
          </Stack>
        </Stack>
      }
      icon={<Settings />}
      size="small"
      isIconButton={true}
    >
      <Stack paddingY={2} minWidth={"400px"} alignItems={"center"} gap={2}>
        {steps?.map((section, index) => {
          const isChanged = data[index].visible !== section.visible;
          return (
            <FormControlLabel
              key={index}
              labelPlacement="start"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "calc(100% - 50px)",
              }}
              control={
                <ToggleButtonGroup
                  color="primary"
                  value={section.visible}
                  exclusive
                  onChange={(e, value) => handleStepChange(index)}
                  aria-label="Platform"
                >
                  <ToggleButton
                    sx={{ paddingY: 0 }}
                    color="secondary"
                    size="small"
                    value={true}
                  >
                    Active
                  </ToggleButton>
                  <ToggleButton
                    sx={{ paddingY: 0 }}
                    color="error"
                    size="small"
                    value={false}
                  >
                    Deactive
                  </ToggleButton>
                </ToggleButtonGroup>
              }
              label={
                <Stack direction={"row"} gap={1}>
                  {section.name} {isChanged && <PriorityHigh color="warning" />}
                </Stack>
              }
            />
          );
        })}
      </Stack>
    </ButtonDialog>
  );
}
