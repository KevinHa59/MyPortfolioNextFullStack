import { Check } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "../../widgets/input/Input";
import PublicAPI from "../../../pages/api-functions/PublicAPI";
import useDelay from "../../../hooks/use-delay";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";

export default function Skill({ data, onChange }) {
  const [isDelaying, startDelay] = useDelay(500);
  const [skills, setSkills] = useState([]);
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (data.skills.length > 0) {
      setSkills(data.skills);
    }
  }, [data]);

  const handleSkillAdd = (newSkill) => {
    const _copy = _.cloneDeep(skills);
    if (
      !_copy.some((skill) => skill.name === newSkill) &&
      newSkill?.length > 0
    ) {
      _copy.unshift({
        name: newSkill,
      });
      setSkills(_copy);
    }
    setSearch("");
  };

  const handleSearchChange = async (e) => {
    setLoadingSkills(true);
    const _search = e.target.value;
    setSearch(_search);
    if (_search.length > 0) {
      startDelay(async () => {
        const result = await PublicAPI.getSkills(_search);
        setSkillSuggestions(result?.data || []);
        setLoadingSkills(false);
      });
    } else {
      setLoadingSkills(false);
      setSkillSuggestions([]);
    }
  };

  const handleDeleteSkill = async (skill, index) => {
    if (skill.id !== undefined) {
    } else {
      const _copy = _.cloneDeep(skills);
      _copy.splice(index, 1);
      setSkills(_copy);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResumeSkill(data.id, skills);
    setIsSaving(false);
  };

  return (
    <Stack height={"100%"}>
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={1}
        padding={5}
      >
        <Autocomplete
          size="small"
          options={skillSuggestions}
          loading={loadingSkills}
          open={open}
          value={search}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(event, newValue) => handleSkillAdd(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    {loadingSkills && <CircularProgress size={15} />}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleSkillAdd(search)}
                    >
                      Add
                    </Button>
                  </Stack>
                ),
              }}
              label="Search Skill"
              onChange={handleSearchChange}
            />
          )}
        />
        <Stack gap={"2px"}>
          {skills.map((skill, index) => {
            return (
              <Chip
                key={index}
                label={skill.name}
                color={skill.id ? "info" : "default"}
                sx={{ width: "max-content" }}
                onDelete={() => handleDeleteSkill(skill, index)}
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
        <ButtonLoading
          isLoading={isSaving}
          onClick={handleSave}
          startIcon={<Check />}
          color="success"
        >
          Save
        </ButtonLoading>
      </Stack>
    </Stack>
  );
}
