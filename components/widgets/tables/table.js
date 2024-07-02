import { Divider, Paper, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Rows from "./rows";
import { Search } from "@mui/icons-material";
import Pagination from "./pagination";
import _ from "lodash";

export default function Table({ data, headers = [], sx, callback_cell }) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    column: null,
    isASC: true,
  });
  useEffect(() => {
    setRows(data);
  }, [data]);

  // search change and filter rows
  const handleSearchChange = (searchValue) => {
    const newRows = filterData(searchValue);
    setRows(newRows);
    setSearch(searchValue);
  };

  // update rows by search value
  function filterData(searchValue) {
    const copyData = _.cloneDeep(data);
    const filterSearch = copyData.filter((row) => {
      return headers.some((header) => {
        return row[header.key]?.toLowerCase().includes(searchValue);
      });
    });
    return filterSearch;
  }

  // handle sort
  function handleSortRows(newSort = null) {
    let _sortSetting = sort;
    if (newSort !== null) {
      _sortSetting = newSort;
      setSort(newSort);
    }
    const copyRows = _.cloneDeep(rows);
    const newRows = copyRows.sort((a, b) => {
      let item1 = a;
      let item2 = b;
      if (_sortSetting.isASC === false) {
        item1 = b;
        item2 = a;
      }

      return item1[_sortSetting.column]
        ?.toLowerCase()
        .localeCompare(item2[_sortSetting.column]?.toLowerCase());
    });
    setRows(newRows);
  }

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
              value={search}
              size="small"
              InputProps={{
                startAdornment: <Search sx={{ paddingRight: 1 }} />,
                paddingY: 0,
              }}
              label="Search"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </Stack>
          <Stack direction={"row"}>
            <Pagination quantity={rows.length} />
          </Stack>
        </Stack>
        <Divider />
        <Header
          headers={headers}
          sortSetting={sort}
          onSortChange={handleSortRows}
        />
      </Paper>
      <Rows data={rows} headers={headers} callback_cell={callback_cell} />
    </Stack>
  );
}
