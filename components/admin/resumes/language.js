import { Add, Check } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectCustom from "../../widgets/select/select-custom";
import Input from "../../widgets/input/Input";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import { StyleMode } from "../../../styles/useStyle";
import { darkStyles } from "../../../theme/dark-theme-options";

export default function Language({ data, step, onRefresh, onChange }) {
  const [input, setInput] = useState([]);
  const [language, setLanguage] = useState({
    language: "",
    proficiencyLevel: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.languages?.length > 0) {
      setInput(data?.languages);
    }
  }, [data]);

  const handleLanguageChange = (newValue) => {
    setLanguage((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleAddLanguage = () => {
    setInput((prev) => {
      return [language, ...prev];
    });
    handleLanguageChange({
      language: "",
      proficiencyLevel: "",
    });
  };

  const handleRemoveLanguage = async (index, id) => {
    if (id !== undefined) {
      const res = await MyAPIs.Resume().deleteResumeLanguage(id);
    }
    const _copy = _.cloneDeep(input);
    _copy.splice(index, 1);
    setInput(_copy);
    onRefresh && onRefresh();
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResumeLanguage(data.id, input);
    onRefresh && onRefresh();
    setIsSaving(false);
  };

  return (
    <Stack height={"100%"} width={"100%"}>
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
      <Divider />
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={1}
        padding={1}
        paddingX={5}
      >
        <Stack direction={"row"} gap={1} alignItems={"flex-end"}>
          <SelectCustom
            size="small"
            sx={{ width: "100%" }}
            label={"Proficiency"}
            selected_value={language.language}
            data={languages.sort()}
            onChange={(value) => handleLanguageChange({ language: value })}
          />
          <SelectCustom
            size="small"
            sx={{ width: "200px" }}
            label={"Proficiency"}
            selected_value={language.proficiencyLevel}
            data={["Native", "Fluent", "Advanced", "Intermediate"]}
            onChange={(value) =>
              handleLanguageChange({ proficiencyLevel: value })
            }
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ height: "max-content" }}
            onClick={() => handleAddLanguage()}
          >
            Add
          </Button>
        </Stack>
        <Stack gap={1}>
          {input.map((lang, index) => {
            return (
              <Chip
                key={index}
                label={`${lang.language}: ${lang.proficiencyLevel}`}
                color={lang.id ? "info" : "default"}
                onDelete={() => handleRemoveLanguage(index, lang.id)}
                sx={{ width: "max-content" }}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
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
