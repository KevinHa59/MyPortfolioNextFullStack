import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { StyleMode, styles } from "../../../styles/useStyle";
import { mainContext } from "../../../pages/_app";
import { lightStyles } from "../../../theme/light-theme-options";

export default function Header({ headers, sortSetting, onSortChange }) {
  const { settings } = useContext(mainContext);
  return (
    <Grid
      container
      sx={{
        background: StyleMode(lightStyles.text.primary, styles.background.menu),
      }}
    >
      {headers?.map((header, index) => {
        const justify = header.align
          ? header.align === "left"
            ? "flex-start"
            : header.align === "right"
            ? "flex-end"
            : "center"
          : "flex-start";
        return (
          <Grid key={index} item xs={header.xs} sx={{ paddingX: 1 }}>
            <Stack
              direction={"row"}
              gap={1}
              alignItems={"center"}
              justifyContent={justify}
              width={"100%"}
              sx={{
                color:
                  settings.theme === "light" ? "#fff" : styles.background.menu,
              }}
            >
              <Button
                size="small"
                sx={{
                  padding: 0,
                  textTransform: "none",
                  minWidth: 0,
                  color: "inherit",
                }}
                onClick={() =>
                  onSortChange &&
                  onSortChange({
                    column: header.key,
                    isASC:
                      header.key !== sortSetting.column
                        ? true
                        : !sortSetting.isASC,
                  })
                }
              >
                <Typography
                  textAlign={header.align ? header.align : "left"}
                  fontWeight={"bold"}
                  variant="body2"
                  noWrap
                  sx={{
                    color: "inherit",
                  }}
                >
                  {header.name}
                </Typography>
              </Button>
              {sortSetting.column === header.key &&
                (sortSetting.isASC ? (
                  <ArrowUpward sx={{ fontSize: 10 }} />
                ) : (
                  <ArrowDownward sx={{ fontSize: 10 }} />
                ))}
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
}
