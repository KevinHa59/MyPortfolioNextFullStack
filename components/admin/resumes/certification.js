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
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import { resumeContext } from "../../profile/new-resume";

const cer_template = {
  id: null,
  certificationName: "",
  issuingOrganization: "",
  dateObtained: "",
};

export default function Certification({ resumeID, data, step }) {
  const { handleResumeDataChange } = useContext(resumeContext);
  const [input, setInput] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      setInput(data);
    }
  }, [data]);

  const handleAddEducation = () => {
    setInput((prev) => {
      return [...prev, { ...cer_template }];
    });
  };

  const handleRemoveEducation = (index) => {
    const copy = _.cloneDeep(input);
    copy.splice(index, 1);
    setInput(copy);
  };

  const handleUpdateCertification = (newCer) => {
    setInput(newCer);
    handleResumeDataChange({ certifications: newCer });
  };

  return (
    <Stack height={"100%"} width={"100%"}>
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
          <Stack direction={"row"} gap={"1px"} justifyContent={"flex-end"}>
            <Button
              size="small"
              startIcon={<Add />}
              color="primary"
              onClick={handleAddEducation}
            >
              Add Certification
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
        {input.map((cer, index) => {
          return (
            <Form
              resumeID={resumeID}
              data={cer}
              onRemoveCertification={(setOpen) =>
                handleRemoveEducation(index, setOpen)
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

function Form({ resumeID, data, onRemoveCertification, onChange }) {
  const { addNote } = useContext(asyncNoteContext);
  const [isEdit, setIsEdit] = useState(false);
  const [cer, setCer] = useState(null);

  useEffect(() => {
    setCer(data);
    if (data.id === null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);
  const handleInputChange = (newValue) => {
    setCer((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleUpdateCertification = async () => {
    try {
      const res = await addNote(
        "Update Certification",
        MyAPIs.Resume().updateResumeCertification(resumeID, [cer])
      );
      setIsEdit(false);
      onChange && onChange(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper // variant="outlined"
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
            {cer?.certificationName}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          {cer?.id !== null && isEdit && (
            <IconButton
              color="success"
              onClick={() => handleUpdateCertification()}
            >
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
            onConfirm={onRemoveCertification}
          >
            {cer?.id ? <DeleteForever /> : <Remove />}
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={1} paddingX={5} paddingY={3}>
        <Stack direction={"row"} gap={1}>
          <Input
            isEdit={isEdit}
            fullWidth
            value={cer?.certificationName}
            sx={{ width: "100%" }}
            label="Certification Name"
            onChange={(e) =>
              handleInputChange({ certificationName: e.target.value })
            }
          />
          <Input
            isEdit={isEdit}
            type="date"
            value={cer?.dateObtained?.split("T")[0]}
            label="Obtained Date"
            sx={{ minWidth: "200px" }}
            onChange={(e) =>
              handleInputChange({ dateObtained: e.target.value })
            }
          />
        </Stack>

        <Input
          isEdit={isEdit}
          value={cer?.issuingOrganization}
          label="Issuing Organization"
          sx={{ width: "100%" }}
          onChange={(e) =>
            handleInputChange({ issuingOrganization: e.target.value })
          }
        />
      </Stack>
    </Paper>
  );
}
