import React, { useEffect, useState } from "react";
import UsersAPI from "../../pages/api-functions/UsersAPI";
import {
  Button,
  Divider,
  Fade,
  IconButton,
  LinearProgress,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import ButtonDialog from "../widgets/buttons/button_dialog";
import FormHeader from "../widgets/texts/form-header";
import ErrorRenderer from "../widgets/texts/error-renderer";
import LoadingComponent from "../widgets/loading/loading-component";
import { Circle, Clear, Delete, Edit } from "@mui/icons-material";

export default function UserTypes() {
  const [userTypes, setUserTypes] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const [isNewUserTypeOpen, setIsNewUserTypeOpen] = useState(false);
  const [updateType, setUpdateType] = useState(null);
  useEffect(() => {
    initData();
  }, []);

  // get data
  async function initData() {
    const data = await getUserTypes(true);
    setIsGettingData(false);
    setUserTypes(data);
  }

  return (
    <Stack width={"100%"}>
      <Stack direction={"row"} gap={1}>
        <ButtonDialog
          open={isNewUserTypeOpen}
          isCloseOnClickOut={false}
          onClick={() => setIsNewUserTypeOpen(true)}
          sx_button={{ borderRadius: 0 }}
          variant={"contained"}
          button_label="Create New type"
          size="small"
        >
          <NewUserType
            types={userTypes}
            updateType={updateType}
            onCreateSuccess={() => {
              initData();
              setIsNewUserTypeOpen(false);
              setUpdateType(null);
            }}
            onClose={() => setIsNewUserTypeOpen(false)}
          />
        </ButtonDialog>
      </Stack>
      <Divider sx={{ background: "rgba(100,100,100,1)" }} />
      {isGettingData && <LinearProgress />}
      {!isGettingData && (
        <Stack padding={1} gap={1}>
          {userTypes.length === 0
            ? "No Data"
            : userTypes.map((type, index) => {
                return (
                  <Slide
                    direction="right"
                    key={index}
                    in={true}
                    timeout={500}
                    style={{ transitionDelay: index * 50 }}
                  >
                    <Stack>
                      <UserTypeCard
                        index={index}
                        type={type}
                        onEditClick={() => {
                          setUpdateType(type);
                          setIsNewUserTypeOpen(true);
                        }}
                      />
                    </Stack>
                  </Slide>
                );
              })}
        </Stack>
      )}
    </Stack>
  );
}

function UserTypeCard({ type, index, onEditClick, onDeleteClick }) {
  return (
    <Paper sx={{ width: "max-content" }}>
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
            variant="outlined"
            onClick={onEditClick}
          >
            Edit
          </Button>
          <Button
            disabled={index === 0 || type.users.length > 0}
            color="error"
            size="small"
            startIcon={<Delete />}
            variant="outlined"
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

// new user type component
function NewUserType({ types, updateType = null, onCreateSuccess, onClose }) {
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
      const res = await createUserType(input.type, input.description);
      onCreateSuccess && onCreateSuccess();
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
      const res = await updateUserType(
        input.id,
        input.type,
        input.description,
        input.color
      );
      onCreateSuccess && onCreateSuccess();
      handleInputChange({ type: "", description: "" });
    }
    setIsUserCreating(false);
  };

  return (
    <Stack padding={1} gap={1} width={"300px"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormHeader
          title={updateType === null ? "New User Type" : "Update User Type"}
        />
        <IconButton size="small" color="error" onClick={onClose}>
          <Clear />
        </IconButton>
      </Stack>
      <Divider />
      <LoadingComponent isLoading={isUserCreating}>
        <Stack gap={1} width={"100%"}>
          <Stack direction={"row"} gap={1}>
            <TextField
              fullWidth
              value={input.type}
              onChange={(e) => handleInputChange({ type: e.target.value })}
              size="small"
              autoComplete="off"
              label="Type Name"
            />
            <TextField
              value={input.color}
              onChange={(e) => handleInputChange({ color: e.target.value })}
              sx={{ minWidth: "50px" }}
              type="color"
              size="small"
            />
          </Stack>
          <TextField
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
          {updateType === null ? (
            <Button
              size="small"
              disabled={
                input.type.length === 0 ||
                types.some(
                  (type) => type.type.toLowerCase() === input.type.toLowerCase()
                )
              }
              onClick={() => handleCreateUserType()}
            >
              Create
            </Button>
          ) : (
            <Button
              size="small"
              disabled={input.type.length === 0}
              onClick={() => handleUpdateUserType()}
            >
              {updateType === null ? "Create" : "Update"}
            </Button>
          )}
        </Stack>
      </LoadingComponent>
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

// handle get user types data
async function getUserTypes(isUserIncluding = false) {
  try {
    const res = await UsersAPI.getUserTypes(isUserIncluding);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// handle create new user type
async function createUserType(type, description) {
  try {
    const res = await UsersAPI.createUserType(type, description);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
// handle update user type
async function updateUserType(id, type, description, color) {
  try {
    const res = await UsersAPI.updateUserType(id, type, description, color);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
