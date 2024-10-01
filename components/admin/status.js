import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Header from "./header";
import { Add, People } from "@mui/icons-material";
import Table from "../widgets/tables/table";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import SelectCustom from "../widgets/select/select-custom";
import { adminContext } from "../../pages/admin";
import ButtonDialog from "../widgets/buttons/button_dialog";
import { SketchPicker } from "react-color";
import ButtonPopover from "../widgets/buttons/button_popover";
import ButtonLoading from "../widgets/buttons/button-loading";
import _ from "lodash";
const template = {
  name: "",
  color: null,
};
export default function Status() {
  const { addNote } = useContext(asyncNoteContext);
  const { mainData, updateMainData } = useContext(adminContext);
  const { status } = mainData;
  const [input, setInput] = useState(template);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleUInputChange = (newValue) => {
    setInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = input.id
        ? await MyAPIs.Status().updateStatus(input.id, input.name, input.color)
        : await MyAPIs.Status().createStatus(input.name, input.color);
      if (res) {
        let _status = _.cloneDeep(mainData.status);
        if (input.id) {
          const index = _status.findIndex((ss) => ss.id === input.id);
          _status[index] = res.data;
        } else {
          _status.push(res.data);
        }
        _status = _status.sort((a, b) => a.name.localeCompare(b.name));
        updateMainData({ ...mainData, status: _status });
        setOpen(false);
      }
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      console.log(error);
    }
  };

  const handleDelete = async (id, setOpen) => {
    try {
      const res = await MyAPIs.Status().deleteStatus([id]);
      if (res) {
        let _status = _.cloneDeep(mainData.status);
        const index = _status.findIndex((ss) => ss.id === input.id);
        _status.splice(index, 1);
        _status = _status.sort((a, b) => a.name.localeCompare(b.name));
        updateMainData({ ...mainData, status: _status });
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Status"} icon={<People />}>
        <Stack direction={"row"} gap={1}></Stack>
      </Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Paper className="flat br0" sx={{ height: "100%" }}>
          <Table
            data={status || []}
            headers={headers}
            callback_extension_search_area={
              <Stack>
                <ButtonDialog
                  isStartIcon={true}
                  icon={<Add />}
                  color={"secondary"}
                  button_label={"Create"}
                  size="small"
                  title={input.id ? "Update Status" : "New Status"}
                  open={open}
                  isCloseOnClickOut={false}
                  onClick={() => {
                    setOpen(true);
                    setInput(template);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                >
                  <Stack padding={2} direction={"row"} alignItems={"center"}>
                    <TextField
                      value={input.name}
                      size="small"
                      onChange={(e) =>
                        handleUInputChange({ name: e.target.value })
                      }
                    />
                    <ButtonPopover
                      label={
                        <Paper
                          className="brMAX"
                          variant="outlined"
                          sx={{
                            width: "30px",
                            height: "30px",
                            background: input.color || "transparent",
                          }}
                        />
                      }
                    >
                      <SketchPicker
                        color={input.color || "transparent"}
                        onChange={(e) => handleUInputChange({ color: e.hex })}
                      />
                    </ButtonPopover>
                  </Stack>
                  <Divider />
                  <ButtonLoading
                    isLoading={isSaving}
                    className="br0"
                    disabled={input.name.length === 0}
                    onClick={handleSave}
                  >
                    {input.id ? "Update" : "Create"}
                  </ButtonLoading>
                </ButtonDialog>
              </Stack>
            }
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                onEdit={() => {
                  setInput(row);
                  setOpen(true);
                }}
                onDelete={(setOpen) => handleDelete(row.id, setOpen)}
              />
            )}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}

function Cell({ row, header, onEdit, onDelete }) {
  if (header === "actions") {
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={1}
      >
        <Button
          className="hoverLink"
          sx={{ padding: 0 }}
          size="small"
          color="warning"
          onClick={onEdit}
        >
          Edit
        </Button>
        <ButtonDialogConfirm
          className={"hoverLink"}
          dialog_color={"error"}
          dialog_title={"Delete Status"}
          dialog_message={"Are You Sure?"}
          sx={{ padding: 0 }}
          size="small"
          color="error"
          onConfirm={onDelete}
        >
          Delete
        </ButtonDialogConfirm>
      </Stack>
    );
  } else if (header === "color") {
    return (
      <Paper
        variant="outlined"
        sx={{
          background: row[header] || "transparent",
          width: "50px",
          height: "20px",
        }}
      />
    );
  } else return row[header];
}

const headers = [
  {
    name: "Status",
    key: "name",
    xs: 2,
  },
  {
    name: "Color",
    key: "color",
    xs: 2,
  },
  {
    name: "",
    key: "actions",
    xs: 8,
    align: "right",
  },
];
