import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  ArrowUpward,
  Check,
  Clear,
  PriorityHigh,
  Settings,
  Warning,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
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
        const key = (st.title[0].toLowerCase() + st.title.slice(1)).replaceAll(
          " ",
          ""
        );
        newSectionData[key] = st.visible;
        newSectionData[`${key}Priority`] = st.priority;
      });
      delete newSectionData["summary"];
      delete newSectionData["summaryPriority"];
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

  const handleChangeOrder = (isUp, index) => {
    let copy = _.cloneDeep(steps);

    if (isUp) {
      copy[index].priority -= 1;
      copy[index - 1].priority += 1;
    } else {
      copy[index].priority += 1;
      copy[index + 1].priority -= 1;
    }
    copy = copy.sort((a, b) => a.priority - b.priority);
    setSteps(copy);
  };

  return (
    <ButtonDialog
      open={open}
      isCloseOnClickOut={false}
      onClick={() => setOpen(true)}
      onClose={() => {
        setOpen(false);
        setSteps(data);
      }}
      title={
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          paddingX={1}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Sections
          </Typography>
        </Stack>
      }
      icon={<Settings />}
      size="small"
      isIconButton={true}
    >
      <Stack paddingY={2} minWidth={"500px"} alignItems={"center"} gap={2}>
        {steps?.map((section, index) => {
          const isChanged = data[index].visible !== section.visible;
          return (
            index > 0 && (
              <Stack direction={"row"} gap={5} width={"100%"} paddingX={1}>
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
                      {section.title}{" "}
                      {isChanged && <PriorityHigh color="warning" />}
                    </Stack>
                  }
                />
                <Paper variant="outlined">
                  <Stack direction={"row"}>
                    <IconButton
                      size="small"
                      color="secondary"
                      disabled={index === 1}
                      sx={{ paddingY: 0 }}
                      onClick={() => handleChangeOrder(true, index)}
                    >
                      <ArrowDropUp />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton
                      size="small"
                      color="secondary"
                      disabled={index === steps.length - 1}
                      sx={{ paddingY: 0 }}
                      onClick={() => handleChangeOrder(false, index)}
                    >
                      <ArrowDropDown />
                    </IconButton>
                  </Stack>
                </Paper>
              </Stack>
            )
          );
        })}
      </Stack>
      <Divider flexItem />
      <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
        <Button className="br0" color="success" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </ButtonDialog>
  );
}
