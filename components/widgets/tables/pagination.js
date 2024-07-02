import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import SelectCustom from "../select/select-custom";

export default function Pagination({ quantity }) {
  const [pageSetting, setPageSetting] = useState({
    rows: 10,
    page: 1,
  });

  const handlePageSettingChange = (value) => {
    setPageSetting((prev) => {
      return {
        ...prev,
        ...value,
      };
    });
  };
  return (
    <Stack gap={1} direction={"row"} alignItems={"center"}>
      <SelectCustom
        selected_value={pageSetting.rows}
        data={[10, 25, 50, 100]}
        size="small"
        label={"Rows"}
        sx={{ minWidth: "40px" }}
        onChange={(va) => handlePageSettingChange({ rows: va })}
      />
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
      {pageSetting.page}
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
