import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function Rows({ data, headers, callback_cell = null }) {
  return (
    <Stack gap={"1px"} height={"100%"} sx={{ overflowY: "auto" }}>
      {data?.map((row, index) => {
        return (
          <Stack
            key={index}
            minHeight={"40px"}
            justifyContent={"center"}
            sx={{
              ":hover": {
                background: "rgba(150,150,150,0.1)",
              },
            }}
          >
            <Grid container>
              {headers.map((header, _index) => {
                return (
                  <Grid key={_index} item xs={header.xs} sx={{ paddingX: 1 }}>
                    <Stack justifyContent={"center"} height={"100%"}>
                      <Typography
                        textAlign={header.align ? header.align : "left"}
                        variant="body2"
                      >
                        {callback_cell
                          ? callback_cell(row, header.key)
                          : row[header.key] || ""}
                      </Typography>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        );
      })}
    </Stack>
  );
}
