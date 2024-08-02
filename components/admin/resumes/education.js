import {
  Add,
  CastForEducation,
  Check,
  Clear,
  DeleteForever,
  DeleteForeverRounded,
  DeleteForeverSharp,
  DeleteForeverTwoTone,
  Edit,
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
import React, { useContext, useEffect, useState } from "react";
import PublicAPI from "../../../pages/api-functions/PublicAPI";
import AutocompleteCustom from "../../widgets/autocomplete/autocomplete";
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import { StyleMode, styles } from "../../../styles/useStyle";
import { darkStyles } from "../../../theme/dark-theme-options";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import * as XLSX from "xlsx";
import { asyncNoteContext } from "../../widgets/notification/async-notification";
const edu_template = {
  id: null,
  degree: "",
  schoolName: "",
  location: "",
  startDate: "",
  endDate: "",
  fieldOfStudy: "",
  gpa: "",
};

export default function Education({ resumeID, data, step, onChange }) {
  const theme = useTheme();
  const [input, setInput] = useState([edu_template]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.length > 0) {
      setInput(data);
    }
  }, [data]);

  const init = async () => {
    try {
      const res = await MyAPIs.Generals().getUniversities("houston", 10);
      console.log(res.data);
    } catch (error) {}
  };

  const handleAddEducation = () => {
    // only allow add new one once per time
    if (!input.some((edu) => edu.id === null)) {
      setInput((prev) => {
        return [{ ...edu_template }, ...prev];
      });
    }
  };

  const handleRemoveEducation = (index, setOpen) => {
    const copy = _.cloneDeep(input);
    copy.splice(index, 1);
    setInput(copy);
    setOpen(false);
  };

  const handleUpdateEducation = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResumeEducation(data.id, input);
    setIsSaving(false);
  };

  return (
    <Stack width={"100%"} position={"relative"}>
      <Paper className="br0" sx={{ position: "sticky", top: 0, zIndex: 5 }}>
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
          <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
            <Button
              size="small"
              startIcon={<Add />}
              color="primary"
              onClick={handleAddEducation}
            >
              Add Education
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Divider />
      <Stack gap={3} padding={1} paddingX={5}>
        {input.map((edu, index) => {
          return (
            <Form
              resumeID={resumeID}
              data={edu}
              onRemoveEducation={(setOpen) =>
                handleRemoveEducation(index, setOpen)
              }
              key={index}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

function Form({ resumeID, data, onRemoveEducation }) {
  const { addNote } = useContext(asyncNoteContext);
  const [isEdit, setIsEdit] = useState(false);
  const [edu, setEdu] = useState(null);

  useEffect(() => {
    setEdu(data);
    if (data.id === null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);
  const handleInputChange = (newValue) => {
    setEdu((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleUpdateEducation = async () => {
    try {
      const res = await addNote(
        "Update Education",
        MyAPIs.Resume().updateResumeEducation(resumeID, [edu])
      );
      setIsEdit(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper
      // variant="outlined"
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
            {edu?.schoolName}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          {edu?.id !== null && isEdit && (
            <IconButton color="success" onClick={() => handleUpdateEducation()}>
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
            dialog_title={"Remove Education"}
            dialog_message={"Are You Sure?"}
            onConfirm={onRemoveEducation}
          >
            {edu?.id ? <DeleteForever /> : <Remove />}
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={1} paddingX={5} paddingY={3}>
        <Stack direction={"row"} gap={1}>
          <Input
            isAutoComplete={true}
            APIOptions={MyAPIs.Generals().getUniversities}
            APIOptionKey={"name"}
            label={"School"}
            callbackOption={(r) => {
              return (
                <Stack>
                  <Typography variant="body2" fontWeight={"bold"}>
                    {r.name}
                  </Typography>
                  <Typography variant="body2">{r.address}</Typography>
                </Stack>
              );
            }}
            fullWidth={true}
            value={edu?.schoolName}
            sx={{ width: "100%" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ schoolName: e.target.value })}
            onSelect={(value) =>
              handleInputChange({
                schoolName: value.name,
                location: value.address,
              })
            }
          />
          <Input
            label={"From"}
            type={"date"}
            value={edu?.startDate ? edu?.startDate.split("T")[0] : null}
            sx={{ minWidth: "200px" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ startDate: e.target.value })}
          />
          <Input
            label={"To"}
            type={"date"}
            nullReplacement={"Current"}
            value={edu?.endDate ? edu?.endDate.split("T")[0] : null}
            sx={{ minWidth: "200px" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ endDate: e.target.value })}
          />
        </Stack>
        <Input
          label={"Location"}
          fullWidth={true}
          value={edu?.location}
          sx={{ width: "100%" }}
          isEdit={isEdit}
          onChange={(e) => handleInputChange({ location: e.target.value })}
        />
        <Stack direction={"row"} gap={1}>
          <Input
            fullWidth
            value={edu?.degree}
            label="Degree"
            sx={{ width: "100%" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ degree: e.target.value })}
          />
          <Input
            fullWidth
            value={edu?.fieldOfStudy}
            label="Field"
            sx={{ width: "100%" }}
            isEdit={isEdit}
            onChange={(e) =>
              handleInputChange({ fieldOfStudy: e.target.value })
            }
          />
          <Input
            value={edu?.gpa}
            label="GPA"
            sx={{ minWidth: "100px" }}
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ gpa: e.target.value })}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

async function getUniversity(search) {
  try {
    const res = await PublicAPI.getUniversity(search);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
