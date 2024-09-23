import { Check } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import Input from "../../widgets/input/Input";
import axios from "axios";

export default function Summary({ data, step, onChange }) {
  const [input, setInput] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    setInput(data.summary);
  }, [data]);

  const handleUpdateResume = async () => {
    setIsSaving(true);
    const APIs = [
      MyAPIs.Resume().updateResume(data.id, {
        summary: input,
      }),
    ];
    const res = await axios.all(APIs);
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
          <Typography>{step.title}</Typography>
        </Stack>
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
      <Divider />
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        paddingX={5}
      >
        <Input
          value={input}
          label="Write short cool summary about yourself here... "
          fullWidth
          multiline
          rows={10}
          onChange={(event) => setInput(event.target.value)}
        />
      </Stack>
    </Stack>
  );
}
