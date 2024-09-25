import { Language as LanguageIcon, Article } from "@mui/icons-material";
import { CircularProgress, MenuItem, Paper, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import Table from "../widgets/tables/table";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import Header from "./header";
import { ResumeIcon } from "../../icons/resume";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import { useRouter } from "next/router";
import { adminContext } from "../../pages/admin";
import ButtonPopover from "../widgets/buttons/button_popover";
import { mainContext } from "../../pages/_app";

const headers = [
  {
    name: "Resume Title",
    key: "title",
    xs: 3,
  },
  {
    name: "First Name",
    key: "userFirstName",
    xs: 2,
  },
  {
    name: "Last Name",
    key: "userLastName",
    xs: 2,
  },
  {
    name: "Email",
    key: "userEmail",
    xs: 2,
  },
  {
    name: "Created At",
    key: "createdAt",
    xs: 2,
  },
  {
    name: "Status",
    key: "status",
    xs: 1,
    align: "center",
  },
];

export default function Resumes() {
  const router = useRouter();
  const { addNote } = useContext(asyncNoteContext);
  const { mainData, updateMainData } = useContext(adminContext);
  const { setNote } = useContext(mainContext);
  const { resumes, status } = mainData;
  const [tableHeader, setTableHeader] = useState(headers);

  const handleUpdateStatus = async (id, ss) => {
    try {
      const res = await MyAPIs.Resume().updateResume(id, { statusID: ss.id });
      if (res) {
        const copyResumes = _.cloneDeep(mainData.resumes);
        const index = copyResumes.findIndex((r) => r.id === id);
        copyResumes[index].statusID = ss.id;
        copyResumes[index].status = ss;
        console.log(copyResumes);
        updateMainData({ ...mainData, resumes: copyResumes });
        setNote.success("Update Status Success");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
      setNote.error("Update Status Fail");
      console.log(res);
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Resumes"} icon={<Article />}>
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
            data={resumes || []}
            headers={tableHeader}
            callback_cell={(row, key) => {
              return (
                <Cell
                  row={row}
                  header={key}
                  status={status}
                  onRemoveSuccess={() => {}}
                  onStatusUpdate={(ss) => handleUpdateStatus(row.id, ss)}
                />
              );
            }}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}

function Cell({ row, header, status, onStatusUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  if (header === "userFirstName") {
    return row["user"].firstName;
  } else if (header === "userLastName") {
    return row["user"].lastName;
  } else if (header === "userEmail") {
    return row["user"].email;
  } else if (header === "createdAt") {
    return new Date(row[header]).toLocaleString();
  } else if (header === "status") {
    return (
      <ButtonPopover
        label={row[header] ? row[header].name : "N/A"}
        size="small"
        isIconButton={false}
        variant="outlined"
        className="br0"
        sx_button={{ color: row[header] && row[header].color, paddingY: 0 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {isUpdating ? (
          <Stack padding={1}>
            <CircularProgress sx={{ fontSize: 10 }} />
          </Stack>
        ) : (
          status.map((ss, index) => {
            return (
              <MenuItem
                key={index}
                sx={{ color: ss.color }}
                onClick={async () => {
                  setIsUpdating(true);
                  const res = await onStatusUpdate(ss);
                  setIsUpdating(false);
                }}
              >
                {ss.name}
              </MenuItem>
            );
          })
        )}
      </ButtonPopover>
    );
  } else {
    return row[header];
  }
}
