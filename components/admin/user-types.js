import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import ButtonDialog from "../widgets/buttons/button_dialog";
import ErrorRenderer from "../widgets/texts/error-renderer";
import { Add, Circle, Delete, Edit, Hub } from "@mui/icons-material";
import Header from "./header";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import Table from "../widgets/tables/table";
import Input from "../widgets/input/Input";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import { adminContext } from "../../pages/admin";
import axios from "axios";

export default function UserTypes() {
  const { addNote } = useContext(asyncNoteContext);
  const { mainData, updateMainData } = useContext(adminContext);
  const { userTypes } = mainData;
  const [isNewUserTypeOpen, setIsNewUserTypeOpen] = useState(false);
  const [updateType, setUpdateType] = useState(null);

  useEffect(() => {
    userTypes === null && init();
  }, []);

  const init = async () => {
    try {
      const APIs = [MyAPIs.User().getUserTypes()];
      const res = await axios.all(APIs);
      const _userTypes = res[0].data;
      updateMainData({ userTypes: _userTypes });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUserType = (type) => {
    const copy = _.cloneDeep(mainData.userTypes);
    const index = copy.findIndex((item) => item.id === type.id);

    if (index === -1) {
      copy.push(type);
    } else {
      copy[index] = type;
    }
    updateMainData({ userTypes: copy });
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"User Types"} icon={<Hub />}></Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Paper className="flat br0">
          <Table
            isLoading={userTypes === null}
            data={userTypes || []}
            headers={headers}
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                onEditClick={() => {
                  setUpdateType(row);
                  setIsNewUserTypeOpen(true);
                }}
              />
            )}
            callback_extension_search_area={
              <ButtonDialog
                open={isNewUserTypeOpen}
                isCloseOnClickOut={false}
                onClick={() => setIsNewUserTypeOpen(true)}
                button_label="New type"
                icon={<Add />}
                isStartIcon={true}
                color={"secondary"}
                size="small"
                title={
                  updateType === null ? "New User Type" : "Update User Type"
                }
                onClose={() => setIsNewUserTypeOpen(false)}
              >
                <NewUserType
                  types={userTypes}
                  updateType={updateType}
                  onCreateSuccess={(newData) => {
                    handleUpdateUserType(newData);
                    setIsNewUserTypeOpen(false);
                    setUpdateType(null);
                  }}
                  onClose={() => setIsNewUserTypeOpen(false)}
                />
              </ButtonDialog>
            }
          />
        </Paper>
      </Stack>
    </Stack>
  );
}

function Cell({ row, header, onEditClick }) {
  if (header === "_count") {
    return row[header].users || 0;
  } else if (header === "color") {
    return (
      <Circle
        sx={{
          color: row.color || "transparent",
          borderRadius: "50%",
        }}
      />
    );
  } else if (header === "actions") {
    // handle remove user type
    const handleRemoveUserType = async () => {};

    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"1px"}
      >
        <Button color="warning" size="small" onClick={onEditClick}>
          Edit
        </Button>
        <ButtonDialogConfirm
          color={"error"}
          dialog_title={"Delete User Type"}
          dialog_message={"Are You Sure?"}
          dialog_color={"error"}
          size={"small"}
          onConfirm={handleRemoveUserType}
        >
          Delete
        </ButtonDialogConfirm>
      </Stack>
    );
  } else return row[header];
}

const headers = [
  {
    name: "User Type",
    key: "type",
    xs: 2,
  },
  {
    name: "Color",
    key: "color",
    xs: 2,
  },
  {
    name: "User Qty",
    key: "_count",
    xs: 2,
    align: "center",
  },
  {
    name: "Description",
    key: "description",
    xs: 4,
  },
  {
    name: "",
    key: "actions",
    xs: 2,
    align: "right",
  },
];

function UserTypeCard({ type, index, onEditClick, onDeleteClick }) {
  return (
    <Paper
      className="normal"
      // variant="outlined"
      sx={{ width: "max-content", overflow: "hidden" }}
    >
      <Stack padding={1} minWidth={"300px"} width={"max-content"} gap={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Typography fontWeight={"bold"} variant="h5">
              {type.type}
            </Typography>
            <Circle
              sx={{
                color: type.color || "transparent",
                border: "1px solid rgb(200,200,200)",
                borderRadius: "50%",
              }}
            />
          </Stack>
          <Typography variant="h6">{type.users.length} Users</Typography>
        </Stack>
        <Typography fontStyle={"italic"}>{type.description}</Typography>
        <Divider />
        <Stack direction={"row"} justifyContent={"flex-end"} gap={1}>
          <Button
            color="warning"
            size="small"
            startIcon={<Edit />}
            variant="contained"
            onClick={onEditClick}
          >
            Edit
          </Button>
          <ButtonDialogConfirm
            disabled={index === 0 || type.users.length > 0}
            dialog_color="error"
            dialog_title={"Delete User Type"}
            dialog_message={"Are You Sure?"}
            color={"error"}
            size="small"
            startIcon={<Delete />}
            variant="contained"
          >
            Delete
          </ButtonDialogConfirm>
        </Stack>
      </Stack>
    </Paper>
  );
}

// new user type component
function NewUserType({ types, updateType = null, onCreateSuccess }) {
  const [input, setInput] = useState({
    type: "",
    description: "",
    color: "#ffffff",
  });
  const [inputErrors, setInputErrors] = useState([]);
  const [isUserCreating, setIsUserCreating] = useState(false);

  // update Input if updateType data given
  useEffect(() => {
    if (updateType !== null) {
      setInput(updateType);
    }
  }, [updateType]);

  // update input change
  const handleInputChange = (newValue) => {
    setInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  // create new user type
  const handleCreateUserType = async () => {
    setIsUserCreating(true);
    const errors = validateInput(null, input.type, input.description);
    setInputErrors(errors);
    if (errors.length === 0) {
      const res = await MyAPIs.User().createUserType(
        input.type,
        input.description
      );
      onCreateSuccess && onCreateSuccess(res.data);
      handleInputChange({ type: "", description: "" });
    }
    setIsUserCreating(false);
  };

  // update user type
  const handleUpdateUserType = async () => {
    setIsUserCreating(true);
    const errors = validateInput(
      input.id,
      input.type,
      input.description,
      false
    );
    setInputErrors(errors);
    if (errors.length === 0) {
      const res = await MyAPIs.User().updateUserType(
        input.id,
        input.type,
        input.description,
        input.color
      );
      onCreateSuccess && onCreateSuccess(res);
      handleInputChange({ type: "", description: "" });
    }
    setIsUserCreating(false);
  };

  return (
    <Stack gap={2} padding={2} minWidth={"400px"}>
      <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
        <Input
          fullWidth
          value={input.type}
          onChange={(e) => handleInputChange({ type: e.target.value })}
          size="small"
          autoComplete="off"
          label="User Type Name"
        />
        <Input
          value={input.color}
          onChange={(e) => handleInputChange({ color: e.target.value })}
          sx={{ minWidth: "50px" }}
          type="color"
          size="small"
        />
      </Stack>
      <Input
        value={input.description}
        onChange={(e) => handleInputChange({ description: e.target.value })}
        size="small"
        autoComplete="off"
        multiline
        rows={3}
        label="Description"
      />
      <ErrorRenderer errors={inputErrors} />
      <Divider />
      <Stack direction={"row"} justifyContent={"flex-end"} gap={1}>
        {updateType === null ? (
          <Button
            size="small"
            disabled={
              input.type.length === 0 ||
              types.some(
                (type) => type.type.toLowerCase() === input.type.toLowerCase()
              )
            }
            variant="contained"
            onClick={() => handleCreateUserType()}
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            disabled={input.type.length === 0}
            onClick={() => handleUpdateUserType()}
          >
            Update
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

// validate user type input
function validateInput(id = null, type, desc, isNew = true) {
  const errors = [];

  if (isNew === false) {
    if (id === null) {
      errors.push("ID is missing");
    }
  }

  if (type.length === 0) {
    errors.push("Type is missing");
  }
  return errors;
}
