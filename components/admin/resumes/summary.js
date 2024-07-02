import { Check } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Summary({ data, onChange }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(data);
  }, [data]);
  return (
    <Stack gap={1} padding={5}>
      <TextField
        value={input}
        label="Write short cool summary about yourself here... "
        fullWidth
        multiline
        rows={10}
        onChange={(event) => onChange && onChange(event.target.value)}
      />
      <Stack alignItems={"flex-end"}>
        <Button
          variant="outlined"
          startIcon={<Check />}
          color="success"
          sx={{ borderRadius: "50px" }}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
