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
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SelectCustom from "../../widgets/select/select-custom";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import { resumeContext } from "../../profile/edit-resume";
import Input from "../../widgets/input/Input";

const language_template = {
  id: null,
  language: "",
  proficiencyLevel: "",
};

export default function Language({ resumeID, data, step }) {
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
        return [{ ...language_template }, ...prev];
      });
    }
  };

  const handleRemove = async (id, index, setOpen) => {
    try {
      id &&
        (await addNote(
          "Remove Language",
          MyAPIs.Resume().deleteResumeLanguage(id)
        ));
      const copy = _.cloneDeep(input);
      copy.splice(index, 1);
      handleResumeDataChange({ languages: copy });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newItem) => {
    setInput(newItem);
    handleResumeDataChange({ languages: newItem });
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
            <Typography>{step.title}</Typography>
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
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        padding={5}
      >
        <Stack gap={4}>
          {input.map((lang, index) => {
            return (
              <Form
                resumeID={resumeID}
                data={lang}
                onRemove={(setOpen) => handleRemove(lang.id, index, setOpen)}
                onChange={handleChange}
                key={index}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

function Form({ resumeID, data, onRemove, onChange }) {
  const { addNote } = useContext(asyncNoteContext);
  const [isEdit, setIsEdit] = useState(false);
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    setLanguage(data);
    if (data.id === null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);
  const handleInputChange = (newValue) => {
    setLanguage((pre) => {
      return {
        ...pre,
        ...newValue,
      };
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await addNote(
        "Update Language",
        MyAPIs.Resume().updateResumeLanguage(resumeID, [language])
      );
      setIsEdit(false);
      onChange && onChange(res.data);
    } catch (error) {
      console.log(error);
    }
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
            {language?.language}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          {isEdit && (
            <Button color="success" onClick={() => handleUpdate()}>
              Save
            </Button>
          )}
          {language?.id && (
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
            sx={{ minWidth: "40px", paddingX: 0 }}
            dialog_color={"error"}
            dialog_title={"Remove Project"}
            dialog_message={"Are You Sure?"}
            isConfirmRequired={language?.id === undefined}
            onConfirm={onRemove}
          >
            {language?.id ? "Delete" : "Discard"}
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={1} paddingX={5} paddingY={1}>
        <Stack direction={"row"} gap={1}>
          <Input
            sx={{ width: "100%" }}
            value={language?.language}
            isAutoComplete={true}
            defaultOptions={languages}
            label="Language"
            isEdit={isEdit}
            onChange={(e) => handleInputChange({ language: e.target.value })}
            onSelect={(value) => handleInputChange({ language: value })}
          />
          <Input
            value={language?.proficiencyLevel}
            isSelect={true}
            isOpenOptionOnFocus={true}
            defaultOptions={["Native", "Fluent", "Advanced", "Intermediate"]}
            label="Proficiency"
            isEdit={isEdit}
            sx={{ minWidth: "200px" }}
            onSelect={(value) => handleInputChange({ proficiencyLevel: value })}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

const languages = [
  "Mandarin Chinese",
  "Spanish",
  "English",
  "Hindi",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "Western Punjabi",
  "Marathi",
  "Telugu",
  "Wu Chinese",
  "Turkish",
  "Korean",
  "French",
  "German",
  "Vietnamese",
  "Tamil",
  "Yue Chinese",
  "Urdu",
  "Javanese",
  "Italian",
  "Egyptian Arabic",
  "Gujarati",
  "Iranian Persian",
  "Bhojpuri",
  "Southern Min",
  "Hakka Chinese",
  "Jin Chinese",
  "Hausa",
  "Kannada",
  "Indonesian",
  "Polish",
  "Yoruba",
  "Xiang Chinese",
  "Malayalam",
  "Odia",
  "Maithili",
  "Burmese",
  "Eastern Punjabi",
  "Sunda",
  "Sudanese Arabic",
  "Algerian Arabic",
  "Moroccan Arabic",
  "Ukrainian",
  "Igbo",
  "Northern Uzbek",
  "Sindhi",
  "North Levantine Arabic",
  "Romanian",
  "Tagalog",
  "Dutch",
  "Saʽidi Arabic",
  "Gan Chinese",
  "Amharic",
  "Northern Pashto",
  "Magahi",
  "Thai",
  "Saraiki",
  "Khmer",
  "Chhattisgarhi",
  "Somali",
  "Malaysian Malay",
  "Cebuano",
  "Nepali",
  "Mesopotamian Arabic",
  "Assamese",
  "Sinhalese",
  "Northern Kurdish",
  "Hejazi Arabic",
  "Nigerian Fulfulde",
  "Bavarian",
  "South Azerbaijani",
  "Greek",
  "Chittagonian",
  "Kazakh",
  "Deccan",
  "Hungarian",
  "Kinyarwanda",
  "Zulu",
  "Swedish",
  "Haitian Creole",
  "Norfuk",
  "Catalan",
  "Shona",
  "Bulgarian",
  "Serbo-Croatian",
  "Zazaki",
  "Tunisian Arabic",
  "Sanaani Arabic",
  "Kongo",
  "Haitian",
  "Ganda",
  "Tswana",
  "Finnish",
  "Norwegian",
  "Slovak",
  "Khasi",
  "Malagasy",
  "Lithuanian",
  "Turkmen",
  "Western Frisian",
  "Maltese",
  "Luxembourgish",
  "Cornish",
  "Basque",
  "Faroese",
  "Manx",
];
