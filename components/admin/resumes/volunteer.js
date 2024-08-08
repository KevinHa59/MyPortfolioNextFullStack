import {
  Add,
  Check,
  Clear,
  DeleteForever,
  Diversity1,
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
import { resumeContext } from "../../profile/new-resume";
import { asyncNoteContext } from "../../widgets/notification/async-notification";

const volunteer_template = {
  id: null,
  role: "",
  organizationName: "",
  location: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

export default function VolunteerExperience({ resumeID, data, step }) {
  const { handleResumeDataChange } = useContext(resumeContext);
  const [input, setInput] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      setInput(data);
    }
  }, [data]);

  const handleAddNew = () => {
    // only allow add new one once per time
    if (!input.some((vol) => vol.id === null)) {
      setInput((prev) => {
        return [{ ...volunteer_template }, ...prev];
      });
    }
  };

  const handleRemove = (index, setOpen) => {
    const copy = _.cloneDeep(input);
    copy.splice(index, 1);
    setInput(copy);
    setOpen(false);
  };

  const handleChange = (newItem) => {
    setInput(newItem);
    handleResumeDataChange({ volunteerExperience: newItem });
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
              Add Volunteer
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
        {input.map((volunteer, index) => {
          return (
            <Form
              resumeID={resumeID}
              data={volunteer}
              onRemove={(setOpen) => handleRemove(index, setOpen)}
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
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    setVolunteer(data);
    if (data.id === null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);
  const handleInputChange = (newValue) => {
    setVolunteer((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await addNote(
        "Update Volunteer",
        MyAPIs.Resume().updateResumeVolunteer(resumeID, [volunteer])
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
            {volunteer?.role}
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
            dialog_title={"Remove Volunteer"}
            dialog_message={"Are You Sure?"}
            onConfirm={onRemove}
          >
            {volunteer?.id ? <DeleteForever /> : <Remove />}
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={1} paddingX={5} paddingY={3}>
        <Stack direction={"row"} gap={1}>
          <Input
            sx={{ width: "100%" }}
            value={volunteer?.role}
            label="Role"
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ role: e.target.value })}
          />
          <Input
            type="date"
            value={volunteer?.startDate.split("T")[0]}
            label="From"
            sx={{ minWidth: "200px" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ startDate: e.target.value })}
          />
          <Input
            type="date"
            value={volunteer?.endDate?.split("T")[0] || null}
            label="To"
            sx={{ minWidth: "200px" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ endDate: e.target.value })}
          />
        </Stack>

        <Input
          value={volunteer?.organizationName}
          label="Organization Name"
          isEdit={isEdit}
          onChange={(e) =>
            handleInputChange({ organizationName: e.target.value })
          }
        />
        <Input
          value={volunteer?.location}
          label="Location"
          isEdit={isEdit}
          onChange={(e) => handleInputChange({ location: e.target.value })}
        />
        <Input
          multiline={true}
          rows={10}
          value={volunteer?.responsibilities}
          label="Responsibilities"
          isEdit={isEdit}
          onChange={(e) =>
            handleInputChange({ responsibilities: e.target.value })
          }
        />
      </Stack>
    </Paper>
  );
}
