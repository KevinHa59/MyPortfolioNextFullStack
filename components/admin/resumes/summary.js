import { Check } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import Input from "../../widgets/input/Input";

export default function Summary({ data, onChange }) {
  const [input, setInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    setInput(data.summary);
  }, [data]);

  const handleUpdateResume = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResume(data.id, {
      summary: input,
    });
    setIsSaving(false);
  };

  return (
    <Stack gap={1} padding={5}>
      {/* <Input /> */}
      <Input
        value={input}
        label="Write short cool summary about yourself here... "
        fullWidth
        multiline
        rows={10}
        onChange={(event) => setInput(event.target.value)}
      />
      <Stack alignItems={"flex-end"}>
        <ButtonLoading
          size="small"
          isLoading={isSaving}
          variant="contained"
          startIcon={<Check />}
          onClick={handleUpdateResume}
        >
          Save
        </ButtonLoading>
      </Stack>
    </Stack>
  );
}
