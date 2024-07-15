import { Fade, Grid, Paper, Slide, Stack, Typography } from "@mui/material";
import React from "react";

export default function Rows({ data, headers, callback_cell = null }) {
  return (
    <Stack gap={"1px"}>
      {data?.map((row, index) => {
        return (
          <Slide
            direction="right"
            key={index}
            in={true}
            style={{ transitionDelay: index * 100 }}
            timeout={500}
          >
            <Fade
              in={true}
              style={{ transitionDelay: index * 100 }}
              timeout={1000}
            >
              <Stack
                minHeight={"40px"}
                justifyContent={"center"}
                sx={{
                  borderRadius: 0,
                  background:
                    index % 2 === 0 ? "transparent" : "rgba(150,150,150,0.2)",
                  ":hover": {
                    background: "rgba(150,150,150,0.1)",
                  },
                }}
              >
                <Grid container>
                  {headers.map((header, _index) => {
                    return (
                      <Grid
                        key={_index}
                        item
                        xs={header.xs}
                        sx={{ paddingX: 1 }}
                      >
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
            </Fade>
          </Slide>
        );
      })}
    </Stack>
  );
}
