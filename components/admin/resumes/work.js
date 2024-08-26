import {
  Add,
  ArrowRight,
  Check,
  Clear,
  DeleteForever,
  Edit,
  Engineering,
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
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import { resumeContext } from "../../profile/edit-resume";

const work_template = {
  id: null,
  jobTitle: "",
  companyName: "",
  location: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

export default function WorkExperience({ resumeID, data, step }) {
  const { addNote } = useContext(asyncNoteContext);
  const { handleResumeDataChange } = useContext(resumeContext);
  const [input, setInput] = useState([]);

  useEffect(() => {
    setInput(data);
  }, [data]);

  const handleAddNew = () => {
    // only allow add new one once per time
    if (!input.some((work) => work.id === null)) {
      setInput((prev) => {
        return [{ ...work_template }, ...prev];
      });
    }
  };

  const handleRemove = async (id, index, setOpen) => {
    try {
      const copy = _.cloneDeep(input);
      copy.splice(index, 1);
      await addNote(
        "Remove Work Experience",
        MyAPIs.Resume().deleteResumeWork(id)
      );
      handleResumeDataChange({ workExperience: copy });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newItem) => {
    setInput(newItem);
    handleResumeDataChange({ workExperience: newItem });
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
              Add Work
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
        {input.map((work, index) => {
          return (
            <Form
              resumeID={resumeID}
              data={work}
              onRemove={(setOpen) => handleRemove(work.id, index, setOpen)}
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
  const [work, setWork] = useState(null);

  useEffect(() => {
    setWork(data);
    if (data.id === null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);
  const handleInputChange = (newValue) => {
    setWork((pre) => {
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
        MyAPIs.Resume().updateResumeWork(resumeID, [work])
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
            {work?.jobTitle}
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
            dialog_title={"Remove Work"}
            dialog_message={"Are You Sure?"}
            onConfirm={onRemove}
          >
            {work?.id ? <DeleteForever /> : <Remove />}
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={1} paddingX={5} paddingY={3}>
        <Stack direction={"row"} gap={1}>
          <Input
            sx={{ width: "100%" }}
            value={work?.jobTitle}
            label="Job Title"
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ jobTitle: e.target.value })}
          />
          <Input
            type="date"
            value={work?.startDate ? work?.startDate.split("T")[0] : null}
            label="From"
            sx={{ minWidth: "200px" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ startDate: e.target.value })}
          />
          <Input
            type="date"
            value={work?.endDate ? work?.endDate.split("T")[0] : null}
            label="To"
            nullReplacement={"Current"}
            sx={{ minWidth: "200px" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ endDate: e.target.value })}
          />
        </Stack>

        <Input
          value={work?.companyName}
          label="Company"
          isEdit={isEdit}
          onChange={(e) => handleInputChange({ companyName: e.target.value })}
        />
        <Input
          value={work?.location}
          label="Location"
          isEdit={isEdit}
          onChange={(e) => handleInputChange({ location: e.target.value })}
        />
        <Input
          value={isEdit ? work?.responsibilities : ""}
          multiline={true}
          rows={5}
          label="Responsibilities"
          isEdit={isEdit}
          onChange={(e) =>
            handleInputChange({ responsibilities: e.target.value })
          }
        />
        {!isEdit && (
          <Stack paddingLeft={2}>
            <ul>
              {work?.responsibilities.split("\n").map((res, index) => {
                return <li key={index}>{res}</li>;
              })}
            </ul>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
