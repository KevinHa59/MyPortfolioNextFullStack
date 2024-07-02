import {
  Autocomplete,
  CircularProgress,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useDelay from "../../../hooks/use-delay";

export default function AutocompleteCustom({
  size = "large",
  label = "",
  sx,
  data = null,
  asyncEndpointData = null,
  disabled = false,
  isNullAllow = false,
  value_key,
  defaultValue = null,
  isObjectArray = true,
  title_key,
  onChange,
  sort = {
    byKey: null,
    isASC: true,
  },
  input_variant = "outlined",
  autoFocus = false,
  onFocus = null,
  onKeyPress = null,
}) {
  const [value, setValue] = useState(null);
  const [search, setSearch] = useState("");
  const [sortList, setSortList] = useState([]);
  const [isDelaying, startDelay] = useDelay(500);
  useEffect(() => {
    if (data !== null && data.length > 0) {
      const nullValue = isObjectArray
        ? {
            [value_key]: "NONE",
            [title_key]: "NONE",
          }
        : "NONE";

      setValue(
        defaultValue
          ? data.find(
              (item) =>
                (isObjectArray ? item[value_key] : item) === defaultValue
            )
          : isNullAllow
          ? nullValue
          : null
      );
      const sortData = sort.byKey
        ? data.sort((a, b) =>
            sort.isASC === undefined || sort.isASC === true
              ? handleSortString(a, b)
              : handleSortString(b, a)
          )
        : data;
      setSortList(isNullAllow ? [nullValue, ...sortData] : sortData);
    }
  }, [data]);

  useEffect(() => {
    setValue(
      defaultValue
        ? data?.find(
            (item) => (isObjectArray ? item[value_key] : item) === defaultValue
          )
        : isNullAllow
        ? nullValue
        : null
    );
  }, [defaultValue]);

  function handleSortString(a, b) {
    return a[sort.byKey]
      .toString()
      .toLowerCase()
      .localeCompare(b[sort.byKey].toString().toLowerCase());
  }
  const handleSelect = (event, newValue) => {
    if (newValue === "" || newValue === null || newValue === undefined) {
      setValue(sortList[0]);
      onChange(isObjectArray ? sortList[0][value_key] : sortList[0]);
    } else {
      setValue(newValue);
      onChange(isObjectArray ? newValue[value_key] : newValue);
    }
  };

  const handleSearchChange = async (searchValue) => {
    setSearch(searchValue);
    startDelay(async () => {
      const res = await asyncEndpointData(searchValue);
      console.log(res);
      setSortList(Array.isArray(res) ? res : []);
    });
  };

  return (
    <Stack width={"100%"}>
      {isDelaying && <LinearProgress />}
      <Autocomplete
        disabled={disabled}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        sx={sx}
        size={size}
        options={sortList}
        value={value ? value : null}
        getOptionLabel={(option) =>
          isObjectArray ? option[title_key] : option
        }
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            autoFocus={autoFocus}
            variant={input_variant}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        )}
      />
    </Stack>
  );
}

// Usage
// <AutocompleteCustom
// size="small" // size option 'small' or 'large'
// isNullAllow={false} // true -> has "NONE" option which return "NONE" as string, false -> has no "NONE" option,
// label="Select Option" // label
// data={data} // main data
// title_key={"Name"} // key of value to show
// value_key={"ID"} // key of value to return which associate with title_key
// defaultValue={selected.ID} // default value, using value of value_key
// onChange={(value) => handleChangeData("ID", value)} // return selected value_key
// sort={{ // Optional
//   byKey: "Name", // sort by key
//   isASC: true, // true -> ASC | false -> DESC
// }}
// />
