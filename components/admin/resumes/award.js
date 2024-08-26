import {
  Add,
  Check,
  Clear,
  DeleteForever,
  Edit,
  Remove,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import { resumeContext } from "../../profile/edit-resume";
import { asyncNoteContext } from "../../widgets/notification/async-notification";

const award_template = {
  id: null,
  awardName: "",
  issuingOrganization: "",
  dateReceived: "",
};

export default function Award({ resumeID, data, step }) {
  const { addNote } = useContext(asyncNoteContext);
  const { handleResumeDataChange } = useContext(resumeContext);
  const [input, setInput] = useState([]);
  useEffect(() => {
    data && setInput(data);
  }, [data]);

  const handleAddNew = () => {
    // only allow add new one once per time
    if (!input.some((work) => work.id === null)) {
      setInput((prev) => {
        return [{ ...award_template }, ...prev];
      });
    }
  };

  const handleRemove = async (id, index, setOpen) => {
    try {
      const copy = _.cloneDeep(input);
      copy.splice(index, 1);
      await addNote("Remove Award", MyAPIs.Resume().deleteResumeAward(id));
      handleResumeDataChange({ awards: copy });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newItem) => {
    setInput(newItem);
    handleResumeDataChange({ awards: newItem });
  };

  return (
    <Stack height={"100%"} width={"100%"}>
      <Paper sx={{ position: "sticky", top: 0, zIndex: 5 }}>
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
              onClick={handleAddNew}
            >
              Add Award
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Divider />
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={1}
        paddingX={5}
      >
        {input.map((award, index) => {
          return (
            <Form
              resumeID={resumeID}
              data={award}
              onRemove={(setOpen) => handleRemove(award.id, index, setOpen)}
              onChange={handleChange}
              key={index}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

function Form({ resumeID, data, onRemove, onChange }) {
  const { addNote } = useContext(asyncNoteContext);
  const [isEdit, setIsEdit] = useState(false);
  const [award, setAward] = useState(null);

  useEffect(() => {
    setAward(data);
    if (data.id === null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);
  const handleInputChange = (newValue) => {
    setAward((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await addNote(
        "Update Project",
        MyAPIs.Resume().updateResumeAward(resumeID, [award])
      );
      setIsEdit(false);
      onChange && onChange(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper
      className="flat"
      sx={{ background: isEdit === false && "transparent" }}
    >
      <Stack
        direction={"row"}
        paddingX={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Typography fontWeight={"bold"} fontStyle={"italic"} variant="body1">
            {award?.awardName}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          {isEdit && (
            <IconButton color="success" onClick={() => handleUpdate()}>
              <Check />
            </IconButton>
          )}
          <IconButton
            color={isEdit ? "error" : "warning"}
            onClick={() => setIsEdit((prev) => !prev)}
          >
            {isEdit ? <Clear /> : <Edit />}
          </IconButton>

          <ButtonDialogConfirm
            size="small"
            color="error"
            sx={{ minWidth: "40px", paddingX: 0 }}
            dialog_color={"error"}
            dialog_title={"Remove Award"}
            dialog_message={"Are You Sure?"}
            onConfirm={onRemove}
          >
            {award?.id ? <DeleteForever /> : <Remove />}
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={1} paddingX={5} paddingY={3}>
        <Stack direction={"row"} gap={1}>
          <Input
            sx={{ width: "100%" }}
            value={award?.awardName}
            label="Award Name"
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ awardName: e.target.value })}
          />
          <Input
            type={"date"}
            value={award?.dateReceived?.split("T")[0] || null}
            nullReplacement={""}
            label="Date Received"
            sx={{ minWidth: "200px" }}
            isEdit={isEdit}
            onChange={(e) =>
              handleInputChange({ dateReceived: e.target.value })
            }
          />
        </Stack>

        <Input
          value={award?.issuingOrganization}
          label="Issuing Organization"
          isEdit={isEdit}
          onChange={(e) =>
            handleInputChange({ issuingOrganization: e.target.value })
          }
        />
      </Stack>
    </Paper>
  );
}
