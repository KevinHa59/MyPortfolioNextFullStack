import {
  Add,
  Check,
  Clear,
  DeleteForever,
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
import ButtonLoading from "../../widgets/buttons/button-loading";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import { StyleMode, styles } from "../../../styles/useStyle";
import { darkStyles } from "../../../theme/dark-theme-options";

const work_template = {
  jobTitle: "",
  companyName: "",
  location: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

export default function WorkExperience({ data, onRefresh, onChange }) {
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

  const handleRemoveWork = async (index, id, setOpen) => {
    if (id !== undefined) {
      const res = await MyAPIs.Resume().deleteResumeWork(id);
      onRefresh && onRefresh();
    }
    const copy = _.cloneDeep(input);
    copy.splice(index, 1);
    setInput(copy);
    setOpen(false);
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
    onRefresh && onRefresh();
  };

  return (
    <Stack height={"100%"} width={"100%"}>
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
                sx={{ background: styles.background.menu, color: "#fff" }}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <Engineering sx={{ color: "#fff" }} />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                  >
                    {work.jobTitle}
                  </Typography>
                </Stack>
                <ButtonDialogConfirm
                  variant={"contained"}
                  size="small"
                  color={"error"}
                  dialog_color="error"
                  dialog_title={"Delete Work Experience"}
                  dialog_message={"Are You Sure?"}
                  onConfirm={(setOpen) =>
                    handleRemoveWork(index, work.id, setOpen)
                  }
                  startIcon={work.id ? <DeleteForever /> : <Remove />}
                  isConfirmRequired={work.id !== undefined}
                >
                  {work.id ? "Delete" : "Remove"}
                </ButtonDialogConfirm>
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
        gap={"1px"}
        justifyContent={"flex-end"}
        height={"45px"}
        padding={1}
        sx={{
          background: StyleMode(
            darkStyles.background.default,
            darkStyles.background.paper
          ),
        }}
      >
        <Button
          size="small"
          startIcon={<Add />}
          color="primary"
          onClick={handleAddWork}
        >
          Add workcation
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
  );
}
