import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectCustom from "../select/select-custom";

export default function Pagination({ quantity, onChange }) {
  const [pageSetting, setPageSetting] = useState({
    rows: 10,
    page: 1,
  });

  const handlePageSettingChange = (value) => {
    let copy = _.cloneDeep(pageSetting);
    copy = {
      ...copy,
      ...value,
    };
    onChange && onChange(copy);
    setPageSetting(copy);
  };
  return (
    <Stack gap={1} direction={"row"} alignItems={"center"}>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Typography variant="body1" fontWeight={"bold"}>
          Rows
        </Typography>
        <SelectCustom
          selected_value={pageSetting.rows}
          data={[10, 25, 50, 100]}
          size="small"
          sx={{ minWidth: "40px" }}
          onChange={(va) => handlePageSettingChange({ rows: va })}
        />
      </Stack>
      <IconButton
        disabled={pageSetting.page <= 1}
        size="small"
        onClick={() => handlePageSettingChange({ page: 1 })}
      >
        <KeyboardDoubleArrowLeft />
      </IconButton>
      <IconButton
        disabled={pageSetting.page <= 1}
        size="small"
        onClick={() => handlePageSettingChange({ page: pageSetting.page - 1 })}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography>{pageSetting.page}</Typography>
      <IconButton
        disabled={pageSetting.page * pageSetting.rows >= quantity}
        size="small"
        onClick={() => handlePageSettingChange({ page: pageSetting.page + 1 })}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        size="small"
        disabled={(quantity % pageSetting.rows) + 1 > pageSetting.page}
      >
        <KeyboardDoubleArrowRight />
      </IconButton>
    </Stack>
  );
}
