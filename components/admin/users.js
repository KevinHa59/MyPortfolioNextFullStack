import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ButtonDialog from "../widgets/buttons/button_dialog";
import UsersAPI from "../../pages/api-functions/UsersAPI";
import {
  Clear,
  CopyAll,
  DateRange,
  Delete,
  DeleteForever,
  Edit,
  Email,
  Label,
  Password,
  People,
  Remove,
  Token,
} from "@mui/icons-material";
import FormHeader from "../widgets/texts/form-header";
import ErrorRenderer from "../widgets/texts/error-renderer";
import LoadingComponent from "../widgets/loading/loading-component";
import SelectCustom from "../widgets/select/select-custom";
import Table from "../widgets/tables/table";
import Input from "../widgets/input/Input";
import jwt from "../../utils/jwtUtil";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import { styles } from "../../styles/useStyle";
import Header from "./header";
import PaperForm from "../widgets/paper/paper-form";
import ButtonLoading from "../widgets/buttons/button-loading";
import LabelText from "../widgets/texts/label-text";
import { mainContext } from "../../pages/_app";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import { adminContext } from "../../pages/admin";
import ButtonPopover from "../widgets/buttons/button_popover";

export default function Users() {
  const { addNote } = useContext(asyncNoteContext);
  const { setNote } = useContext(mainContext);
  const { mainData, updateMainData } = useContext(adminContext);
  const { users, userTypes, status } = mainData;

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
        console.log(copy);
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

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"User"} icon={<People />}></Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Paper className="flat br0">
          <Table
            data={users || []}
            headers={headers}
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                status={status}
                onStatusUpdate={(ss) => handleUpdateStatus(row.id, ss)}
              />
            )}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}
function Cell({ row, header, status, onStatusUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  if (header === "userType") {
    return (
      <Chip
        size="small"
        label={`${row[header].type}`}
        sx={{ background: row[header].color, fontWeight: "bold" }}
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
  } else return row[header];
}

const headers = [
  {
    name: "First Name",
    key: "firstName",
    xs: 2,
  },
  {
    name: "Last Name",
    key: "lastName",
    xs: 2,
  },
  {
    name: "Email",
    key: "email",
    xs: 3,
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
    name: "Status",
    key: "status",
    xs: 2,
    align: "center",
  },
];
