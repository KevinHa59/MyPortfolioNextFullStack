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
import Input from "../../widgets/input/Input";

export default function Hobby({ data, onChange }) {
  const [input, setInput] = useState([]);
  const [hobby, setHobby] = useState("");

  const handleAddHobby = () => {
    setInput((prev) => {
      return [...new Set([...prev, hobby])];
    });
    setHobby("");
  };
  return (
    <Stack height={"100%"}>
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={5}
      >
        <Stack direction={"row"} gap={1} alignItems={"flex-end"}>
          <Input
            value={hobby}
            label="Enter Hobby"
            sx={{ width: "100%" }}
            size="small"
            onChange={(event) => setHobby(event.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddHobby();
              }
            }}
          />

          <Button
            variant="outlined"
            startIcon={<Add />}
            color="info"
            sx={{ borderRadius: "50px", height: "max-content" }}
            onClick={handleAddHobby}
          >
            Add
          </Button>
        </Stack>
        <Stack gap={1} direction={"row"}>
          {input.map((hb, index) => {
            return <Chip key={index} label={hb} />;
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
