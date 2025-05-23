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
  Chip,
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
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import { resumeContext } from "../../profile/edit-resume";
import { getCookie } from "cookies-next";

const edu_template = {
  id: null,
  degree: "",
  schoolName: "",
  location: "",
  startDate: "",
  endDate: "",
  fieldOfStudy: "",
  gpa: "",
  relevantCourseworks: [],
};

export default function Education({ resumeID, data, step }) {
  const { addNote } = useContext(asyncNoteContext);
  const { handleResumeDataChange } = useContext(resumeContext);
  const [input, setInput] = useState([]);

  useEffect(() => {
    setInput(data);
  }, [data]);

  const handleAddEducation = () => {
    // only allow add new one once per time
    if (!input.some((edu) => edu.id === null)) {
      setInput((prev) => {
        return [{ ...edu_template }, ...prev];
      });
    }
  };

  const handleRemoveEducation = async (id, index, setOpen) => {
    try {
      const copy = _.cloneDeep(input);
      copy.splice(index, 1);
      if (id) {
        await addNote(
          "Remove Education",
          MyAPIs.Resume().deleteResumeEducation(id)
        );
      }
      handleResumeDataChange({ education: copy });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCertification = (newCer) => {
    setInput(newCer);
    handleResumeDataChange({ education: newCer });
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
            <Typography>{step.title}</Typography>
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
      <Stack gap={3} padding={5}>
        {input.map((edu, index) => {
          return (
            <Form
              resumeID={resumeID}
              data={edu}
              onRemoveEducation={(setOpen) =>
                handleRemoveEducation(edu.id, index, setOpen)
              }
              onChange={handleUpdateCertification}
              key={index}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

function Form({ resumeID, data, onRemoveEducation, onChange }) {
  const { addNote } = useContext(asyncNoteContext);
  const [isEdit, setIsEdit] = useState(false);
  const [edu, setEdu] = useState(null);
  const [searchCourse, setSearchCourse] = useState("");
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
      // create courses
      if (edu.relevantCourseworks.length > 0) {
        const user = getCookie("user");
        await MyAPIs.Resume().createResumeCourses(
          edu.relevantCourseworks,
          JSON.parse(user).id
        );
      }
      const res = await addNote(
        "Update Education",
        MyAPIs.Resume().updateResumeEducation(resumeID, [edu])
      );
      setIsEdit(false);
      onChange && onChange(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRelaventCourseworks = (course) => {
    let newCourses = _.isObject(course) ? course.name : course;
    if (newCourses.length > 0) {
      const newRelevantCourseworks = _.cloneDeep(edu.relevantCourseworks);
      newCourses
        .split(",")
        .map((item) => item.trim())
        .forEach((item) => {
          if (!newRelevantCourseworks.includes(item)) {
            newRelevantCourseworks.push(item);
          }
        });

      handleInputChange({
        relevantCourseworks: newRelevantCourseworks.sort(),
      });
      setSearchCourse("");
    }
  };

  const handleRemoveCourse = (index) => {
    const copy = _.cloneDeep(edu.relevantCourseworks);
    copy.splice(index, 1);
    handleInputChange({ relevantCourseworks: copy });
  };
  return (
    <Paper>
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
        <Stack direction={"row"} alignItems={"center"}>
          {isEdit && (
            <Button color="success" onClick={() => handleUpdateEducation()}>
              Save
            </Button>
          )}
          {edu?.id && (
            <Button
              color={isEdit ? "error" : "warning"}
              onClick={() => setIsEdit((prev) => !prev)}
            >
              {isEdit ? "Discard" : "Edit"}
            </Button>
          )}

          <ButtonDialogConfirm
            size="small"
            color="error"
            dialog_color={"error"}
            dialog_title={"Remove Education"}
            dialog_message={"Are You Sure?"}
            isConfirmRequired={edu?.id === undefined}
            onConfirm={onRemoveEducation}
          >
            {edu?.id ? "Delete" : "Discard"}
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
        <Stack direction={"row"} alignItems={"flex-end"} width={"100%"}>
          <Input
            isAutoComplete={true}
            APIOptions={MyAPIs.Resume().getResumeCourse}
            APIOptionKey={"name"}
            label={"Relevant Courseworks"}
            callbackOption={(r) => {
              return (
                <Stack>
                  <Typography variant="body2" fontWeight={"bold"}>
                    {r.name}
                  </Typography>
                </Stack>
              );
            }}
            fullWidth={true}
            value={searchCourse}
            sx={{ width: "100%" }}
            isEdit={isEdit}
            onChange={(e) => setSearchCourse(e.target.value)}
            onSelect={(value) => handleAddRelaventCourseworks(value)}
          />
          {isEdit && (
            <Button
              size="small"
              onClick={() => handleAddRelaventCourseworks(searchCourse)}
            >
              Add
            </Button>
          )}
        </Stack>
        <Stack
          paddingLeft={1}
          width={"100%"}
          direction="row"
          gap={2}
          flexWrap={"wrap"}
        >
          {isEdit ? (
            edu?.relevantCourseworks?.map((course, index) => {
              return (
                <Chip
                  key={index}
                  label={course}
                  size="small"
                  onDelete={() => handleRemoveCourse(index)}
                />
              );
            })
          ) : (
            <Typography>{edu?.relevantCourseworks.join(", ")}</Typography>
          )}
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
