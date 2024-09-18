import { Autocomplete, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Header from "./header";
import { People } from "@mui/icons-material";
import Table from "../widgets/tables/table";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import SelectCustom from "../widgets/select/select-custom";

export default function Courses() {
  const { addNote } = useContext(asyncNoteContext);
  const [courses, setCourses] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const [filter, setFilter] = useState({
    approved: false,
  });
  useEffect(() => {
    getAllCourses();
  }, []);

  async function getAllCourses(_filter) {
    setIsGettingData(true);
    const isApproved = _filter ? _filter.approved : filter.approved;
    const res = await addNote(
      "Get Courses",
      MyAPIs.Resume().getResumeCourse(
        null,
        null,
        null,
        isApproved === "All" ? null : isApproved
      )
    );
    setCourses(res?.data);
    setIsGettingData(false);
  }

  async function handleDeleteCourse(id, setOpen) {
    const res = await addNote(
      "Delete Course",
      MyAPIs.Resume().deleteResumeCourses([id])
    );
    const newCourses = courses.filter((c) => c.id !== id);
    setCourses(newCourses);
    setOpen(false);
  }
  async function handleApproveCourse(row) {
    const res = await addNote(
      "Approve Course",
      MyAPIs.Resume().updateResumeCourse({
        ...row,
        approved: true,
      })
    );
    const newCourses = courses.filter((c) => c.id !== row.id);
    setCourses(newCourses);
  }

  const handleFilterChange = (newFilter) => {
    const _newFilter = {
      ..._.cloneDeep(filter),
      ...newFilter,
    };
    getAllCourses(_newFilter);
    setFilter(_newFilter);
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Courses"} icon={<People />}>
        <Stack direction={"row"} gap={1}></Stack>
      </Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Paper className="flat br0">
          <Table
            isLoading={isGettingData}
            data={courses}
            headers={headers}
            callback_extension_search_area={
              <Stack>
                <SelectCustom
                  label={""}
                  selected_value={filter.approved}
                  data={[
                    { name: "Not Approve", value: false },
                    { name: "Approve", value: true },
                    { name: "All", value: "All" },
                  ]}
                  item_field={"name"}
                  value_field={"value"}
                  size="small"
                  onChange={(val) => handleFilterChange({ approved: val })}
                />
              </Stack>
            }
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                onDelete={(setOpen) => handleDeleteCourse(row.id, setOpen)}
                onApprove={() => handleApproveCourse(row)}
              />
            )}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}

function Cell({ row, header, onApprove, onDelete, onRefresh }) {
  if (header === "actions") {
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"1px"}
      >
        {row["approved"] === false ? (
          <>
            <Button size="small" color="success" onClick={onApprove}>
              Approve
            </Button>
            <ButtonDialogConfirm
              onConfirm={onDelete}
              dialog_color={"error"}
              dialog_title={"Delete Course"}
              dialog_message={"Are You Sure?"}
              size="small"
              color="error"
            >
              Disapprove & Remove
            </ButtonDialogConfirm>
          </>
        ) : (
          <>
            <ButtonDialogConfirm
              onConfirm={onDelete}
              dialog_color={"error"}
              dialog_title={"Delete Course"}
              dialog_message={"Are You Sure?"}
              size="small"
              color="error"
            >
              Remove
            </ButtonDialogConfirm>
          </>
        )}
      </Stack>
    );
  } else if (header === "createdAt") {
    return row[header].replace("T", " ").split(".")[0];
  } else if (header === "user") {
    const user = row["user"];
    return `${user.firstName} ${user.lastName}`;
  } else if (header === "approved") {
    const isApproved = row[header] === true;
    return (
      <Typography sx={{ color: isApproved ? "success.main" : "error.main" }}>
        {isApproved ? "Approved" : "Wait for Approval"}
      </Typography>
    );
  } else return row[header];
}

const headers = [
  {
    name: "Course",
    key: "name",
    xs: 4,
  },
  {
    name: "Created At",
    key: "createdAt",
    xs: 2,
  },
  {
    name: "By",
    key: "user",
    xs: 2,
  },
  {
    name: "Status",
    key: "approved",
    xs: 2,
  },
  {
    name: "",
    key: "actions",
    xs: 2,
    align: "right",
  },
];
