import { Add, Check } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectCustom from "../../widgets/select/select-custom";
import Input from "../../widgets/input/Input";

export default function Language({ data, onChange }) {
  const [input, setInput] = useState([]);
  const [language, setLanguage] = useState({
    language: "",
    proficiencyLevel: "",
  });

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

  return (
    <Stack height={"100%"}>
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={1}
        padding={5}
      >
        <Stack direction={"row"} gap={1} alignItems={"flex-end"}>
          <Input
            value={language.language}
            label="Search Language"
            sx={{ width: "100%" }}
            size="small"
            onChange={(event) =>
              handleLanguageChange({ language: event.target.value })
            }
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
            variant="outlined"
            startIcon={<Add />}
            color="info"
            sx={{ borderRadius: "50px", height: "max-content" }}
            onClick={() => handleAddLanguage()}
          >
            Add
          </Button>
        </Stack>
        <Stack direction={"row"} gap={1}>
          {input.map((lang, index) => {
            return (
              <Chip
                key={index}
                label={`${lang.language}: ${lang.proficiencyLevel}`}
              />
            );
          })}
        </Stack>
      </Stack>

      <Divider />
      <Stack
        direction={"row"}
        gap={1}
        justifyContent={"flex-end"}
        height={"37px"}
      >
        <Button startIcon={<Check />} color="success">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
