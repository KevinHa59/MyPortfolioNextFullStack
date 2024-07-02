import { Search } from "@mui/icons-material";
import {
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Header({ headers }) {
  return (
    <Grid container>
      {headers?.map((header, index) => {
        return (
          <Grid key={index} item xs={header.xs} sx={{ paddingX: 1 }}>
            <Typography
              textAlign={header.align ? header.align : "left"}
              fontWeight={"bold"}
              variant="body2"
            >
              {header.name}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
