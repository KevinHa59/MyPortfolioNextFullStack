import { Divider, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import Header from "./header";
import Rows from "./rows";
import { Search } from "@mui/icons-material";
import Pagination from "./pagination";

export default function Table({ data, headers = [], sx, callback_cell }) {
  return (
    <Stack sx={{ width: "100%", ...sx }} gap={"1px"}>
      <Paper sx={{ borderRadius: 0 }}>
        <Stack
          direction={"row"}
          padding={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"}>
            <TextField
              size="small"
              InputProps={{
                startAdornment: <Search sx={{ paddingRight: 1 }} />,
                paddingY: 0,
              }}
              label="Search"
            />
          </Stack>
          <Stack direction={"row"}>
            <Pagination quantity={data.length} />
          </Stack>
        </Stack>
        <Divider />
        <Header headers={headers} />
      </Paper>
      <Rows data={data} headers={headers} callback_cell={callback_cell} />
    </Stack>
  );
}
