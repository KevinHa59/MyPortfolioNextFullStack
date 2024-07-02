import { Check } from "@mui/icons-material";
import { Button, Divider, IconButton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Skill({ data, onChange }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(data);
  }, [data]);
  return (
    <Stack height={"100%"}>
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={1}
        padding={5}
      >
        <TextField
          autoComplete="off"
          value={input}
          label="Search Skills"
          fullWidth
          size="small"
          InputProps={{ style: { borderRadius: "50px" } }}
          onChange={(event) => onChange && onChange(event.target.value)}
        />
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
