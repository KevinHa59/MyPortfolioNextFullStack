import {
  Add,
  CastForEducation,
  Check,
  Clear,
  DeleteForever,
  Remove,
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
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import { styles } from "../../../styles/useStyle";

const award_template = {
  awardName: "",
  issuingOrganization: "",
  dateReceived: "",
};

export default function Award({ data, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([award_template]);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (data?.awards?.length > 0) {
      setInput(data?.awards);
    }
  }, [data]);

  const handleAddAward = () => {
    setInput((prev) => {
      return [...prev, { ...award_template }];
    });
  };

  const handleRemoveAward = async (index, id, setOpen) => {
    if (id !== undefined) {
      const res = await MyAPIs.Resume().deleteResumeAward(id);
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
    const res = await MyAPIs.Resume().updateResumeAward(data.id, input);
    setIsSaving(false);
  };

  return (
    <Stack height={"100%"} width={"100%"}>
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={5}
      >
        {input.map((award, index) => {
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
                  <TipsAndUpdates sx={{ color: "#fff" }} />{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    variant="body1"
                    color={
                      award.id
                        ? theme.palette.info.main
                        : theme.palette.text.primary
                    }
                  >
                    {award.awardName}
                  </Typography>
                </Stack>
                <ButtonDialogConfirm
                  variant={"contained"}
                  size="small"
                  color={"error"}
                  dialog_color="error"
                  dialog_title={"Delete Award"}
                  dialog_message={"Are You Sure?"}
                  onConfirm={(setOpen) =>
                    handleRemoveAward(index, award.id, setOpen)
                  }
                  startIcon={award.id ? <DeleteForever /> : <Remove />}
                  isConfirmRequired={award.id !== undefined}
                >
                  {award.id ? "Delete" : "Remove"}
                </ButtonDialogConfirm>
              </Stack>
              <Divider />
              <Stack gap={1} paddingX={5} paddingY={3}>
                <Stack direction={"row"} gap={1}>
                  <Input
                    sx={{ width: "100%" }}
                    value={award.awardName}
                    label="Award Name"
                    onChange={(e) =>
                      handleInputChange({ awardName: e.target.value }, index)
                    }
                  />
                  <Input
                    type={"date"}
                    value={award.dateReceived?.split("T")[0] || null}
                    label="Date Received"
                    sx={{ minWidth: "200px" }}
                    onChange={(e) =>
                      handleInputChange({ dateReceived: e.target.value }, index)
                    }
                  />
                </Stack>

                <Input
                  value={award.issuingOrganization}
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
        gap={"1px"}
        justifyContent={"flex-end"}
        height={"37px"}
      >
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          color="primary"
          onClick={handleAddAward}
        >
          Add Award
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
