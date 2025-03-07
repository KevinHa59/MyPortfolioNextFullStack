import { Chip, CircularProgress, MenuItem, Paper, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { People } from "@mui/icons-material";
import Table from "../widgets/tables/table";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import Header from "./header";
import { mainContext } from "../../pages/_app";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import { adminContext } from "../../pages/admin";
import ButtonPopover from "../widgets/buttons/button_popover";
import axios from "axios";

export default function Users() {
  const { addNote } = useContext(asyncNoteContext);
  const { setNote } = useContext(mainContext);
  const { mainData, updateMainData } = useContext(adminContext);
  const { users, userTypes, status } = mainData;

  useEffect(() => {
    users === null && init();
  }, []);

  const init = async () => {
    try {
      const APIs = [MyAPIs.User().getUsers()];
      if (userTypes === null) {
        APIs.push(MyAPIs.User().getUserTypes());
      }
      const res = await axios.all(APIs);
      const newMainData = {
        users: res[0].data,
      };
      if (userTypes === null) {
        newMainData["userTypes"] = res[1].data;
      }
      updateMainData({ ...newMainData });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (id, ss) => {
    try {
      const res = await MyAPIs.User().updateUserMaster(id, {
        statusID: ss.id,
      });
      if (res) {
        const copy = _.cloneDeep(mainData.users);
        const index = copy.findIndex((r) => r.id === id);
        copy[index].statusID = ss.id;
        copy[index].status = ss;

        updateMainData({ ...mainData, users: copy });
        setNote.success("Update Status Success");
      } else {
        setNote.error("Update Status Fail");
      }
    } catch (error) {
      setNote.error("Update Status Fail");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await MyAPIs.User().removeUserByID(id);
      if (res) {
        const copy = _.cloneDeep(mainData.users);
        const index = copy.findIndex((r) => r.id === id);
        copy.splice(index, 1);
        updateMainData({ ...mainData, users: copy });
        setNote.success("Delete User Success");
      } else {
        setNote.error("Delete User Fail");
      }
    } catch (error) {
      setNote.error("Delete User Fail");
      console.log(error);
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"User"} icon={<People />}></Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Paper className="flat br0" sx={{ height: "100%" }}>
          <Table
            data={users || []}
            isLoading={users === null || userTypes === null}
            headers={headers}
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                status={status}
                userTypes={userTypes}
                onStatusUpdate={(ss) => handleUpdateStatus(row.id, ss)}
                onDelete={() => handleDelete(row.id)}
              />
            )}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}
function Cell({ row, header, status, userTypes, onStatusUpdate, onDelete }) {
  const [isUpdating, setIsUpdating] = useState(false);
  if (header === "userType") {
    const color = userTypes.find((type) => type.id === row[header]?.id)?.color;
    return (
      <Chip
        size="small"
        label={`${row[header]?.type}`}
        sx={{ background: color, fontWeight: "bold", color: "#fff" }}
      />
    );
  } else if (header === "dob") {
    return row["dob"]
      ? new Date(
          row["dob"]?.split("T")[0] + "T05:00:00.000Z"
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
  } else if (header === "membership") {
    return row[header]?.membershipType?.type || "N/A";
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
  } else if (header === "action") {
    return (
      <Stack
        direction={"row"}
        gap={1}
        width={"100%"}
        justifyContent={"flex-end"}
      >
        <ButtonDialogConfirm
          size="small"
          color={"error"}
          disabled={row["userType"]?.type === "Admin"}
          dialog_color={"error"}
          dialog_title={"Delete User"}
          dialog_message={"Are you sure?"}
          onConfirm={onDelete}
        >
          Delete
        </ButtonDialogConfirm>
      </Stack>
    );
  } else return row[header];
}

const headers = [
  {
    name: "First Name",
    key: "firstName",
    xs: 1.5,
  },
  {
    name: "Last Name",
    key: "lastName",
    xs: 1.5,
  },
  {
    name: "Email",
    key: "email",
    xs: 2,
  },
  {
    name: "Date of Birth",
    key: "dob",
    xs: 2,
  },
  {
    name: "User Type",
    key: "userType",
    xs: 1,
    align: "center",
  },
  {
    name: "Membership",
    key: "membership",
    xs: 2,
    align: "center",
  },
  {
    name: "Status",
    key: "status",
    xs: 1,
    align: "center",
  },
  {
    name: "Action",
    key: "action",
    xs: 1,
    align: "right",
  },
];
