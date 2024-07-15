import {
  Button,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ButtonDialog from "../widgets/buttons/button_dialog";
import PagesAPI from "../../pages/api-functions/PagesAPI";
import {
  Add,
  Clear,
  CopyAll,
  DateRange,
  Delete,
  Edit,
  Email,
  Label,
  Password,
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

export default function Pages() {
  const [pages, setPages] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const [isNewPageOpen, setIsNewPageOpen] = useState(false);
  const [editPage, setEditPage] = useState(null);
  useEffect(() => {
    initData();
  }, []);

  async function initData() {
    setIsGettingData(true);
    let data = await MyAPIs.Page().getPages();
    setPages(data);
    setIsGettingData(false);
  }

  // const handleEditUserOpen = (user) => {
  //   setEditPage(user);
  //   setIsNewPageOpen(true);
  // };

  return (
    <Stack width={"100%"} height={"100%"}>
      <Header title={"Pages"}>
        <Stack direction={"row"} gap={1}>
          <ButtonDialog
            open={isNewPageOpen}
            isCloseOnClickOut={false}
            onClick={() => setIsNewPageOpen(true)}
            variant={"contained"}
            button_label="Create New Pages"
            size="small"
            paperProps={{
              style: {
                background: "transparent",
                minWidth: "max-content",
              },
            }}
          >
            <NewPage
              value={editPage}
              pages={pages}
              onClose={() => {
                setIsNewPageOpen(false);
                setTimeout(() => {
                  setEditPage(null);
                }, 200);
              }}
              // onCreatePagesuccess={() => {
              //   initData();
              //   setIsNewPageOpen(false);
              // }}
            />
          </ButtonDialog>
        </Stack>
      </Header>
      <Divider />
      <Paper
        // variant="outlined"
        sx={{
          height: "100%",
          marginX: 5,
          marginY: 1,
          overflow: "hidden",
        }}
      >
        <Table
          isLoading={isGettingData}
          data={pages}
          headers={headers}
          // callback_cell={(row, key) => (
          //   <Cell
          //     row={row}
          //     header={key}
          //     onEdit={() => handleEditUserOpen(row)}
          //     onPasswordChange={() => handlePasswordChangeOpen(row)}
          //     onRefresh={initData}
          //   />
          // )}
        />
      </Paper>
    </Stack>
  );
}
function Cell({ row, header, onEdit, onRefresh }) {
  if (header === "userType") {
    return (
      <Chip
        size="small"
        label={`${row[header]}`}
        sx={{ background: row["userTypeColor"], fontWeight: "bold" }}
      />
    );
  } else if (header === "dob") {
    return new Date(
      row["dob"].split("T")[0] + "T05:00:00.000Z"
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (header === "actions") {
    const handleRemoveUser = async () => {
      const res = await removePages(row["id"]);
      onRemoveSuccess && onRemoveSuccess();
    };
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"1px"}
      >
        <IconButton
          sx={{ borderRadius: "20px", paddingY: 0 }}
          variant="contained"
          size="small"
          color="warning"
          onClick={onEdit}
        >
          <Edit />
        </IconButton>
        <IconButton
          sx={{ borderRadius: "20px", paddingY: 0 }}
          variant="contained"
          size="small"
          color="error"
          onClick={() => handleRemoveUser()}
        >
          <Delete />
        </IconButton>
      </Stack>
    );
  } else return row[header];
}

const headers = [
  {
    name: "Path",
    key: "path",
    xs: 4,
  },
  {
    name: "Description",
    key: "description",
    xs: 6,
  },
  {
    name: "",
    key: "actions",
    xs: 2,
    align: "right",
  },
];

const temp_page = {
  path: "/",
  description: "",
};

function NewPage({ value = null, pages, onClose, onCreatePageSuccess }) {
  const [input, setInput] = useState([]);
  const [inputErrors, setInputErrors] = useState(null);
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  useEffect(() => {
    if (value !== null) {
      setInput(userInfo);
    } else {
      setInput([temp_page]);
    }
  }, [value]);
  const handleInputChange = (newValue, index) => {
    const copy = _.cloneDeep(input);
    copy[index] = {
      ...copy[index],
      ...newValue,
    };
    const { isValid, pathErrors } = validateNewPageInput(copy, pages);
    if (isValid === false) {
      setInputErrors({
        isValid,
        pathErrors,
      });
    } else {
      setInputErrors(null);
    }
    setInput(copy);
  };

  const handleCreatePages = async () => {
    setIsCreatingPage(true);
    const res = await MyAPIs.Page().createPages(input);
    onCreatePageSuccess && onCreatePageSuccess();
    setIsCreatingPage(false);
  };

  // add new page
  const handleAddPage = () => {
    const copy = _.cloneDeep(input);
    copy.push(temp_page);
    const { isValid, pathErrors } = validateNewPageInput(copy, pages);
    if (isValid === false) {
      setInputErrors({
        isValid,
        pathErrors,
      });
    } else {
      setInputErrors(null);
    }
    setInput(copy);
  };
  // remove page
  const handleRemove = (index) => {
    const copy = _.cloneDeep(input);
    copy.splice(index, 1);
    const { isValid, pathErrors } = validateNewPageInput(copy, pages);
    if (isValid === false) {
      setInputErrors({
        isValid,
        pathErrors,
      });
    } else {
      setInputErrors(null);
    }
    setInput(copy);
  };

  return (
    <PaperForm title={input?.id ? "Edit Page" : "New Pages"}>
      <Stack
        gap={1}
        width={"clamp(500px, calc(100vw - 50px), 1000px)"}
        paddingY={2}
      >
        <Stack gap={1} paddingX={2}>
          <Stack
            gap={1}
            sx={{ overflowY: "auto", maxHeight: "calc(100vh - 300px)" }}
          >
            {input.map((page, index) => {
              return (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"flex-end"}
                  gap={1}
                >
                  <Input
                    value={page?.path}
                    onChange={(e) =>
                      handleInputChange({ path: e.target.value }, index)
                    }
                    isInvalidInput={
                      inputErrors !== null &&
                      inputErrors.pathErrors.includes(page?.path)
                    }
                    inputErrorMessage="Path Existing"
                    sx={{ width: "40%" }}
                    autoComplete="off"
                    size="small"
                    label="Path"
                  />
                  <Input
                    value={page?.description}
                    onChange={(e) =>
                      handleInputChange({ description: e.target.value }, index)
                    }
                    fullWidth={true}
                    sx={{ width: "60%" }}
                    autoComplete="off"
                    size="small"
                    label="Description"
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleRemove(index)}
                  >
                    <Clear />
                  </Button>
                </Stack>
              );
            })}
          </Stack>
          <Divider />
          <Button startIcon={<Add />} onClick={handleAddPage}>
            Add Page
          </Button>
        </Stack>
        {/* <ErrorRenderer errors={inputErrors} /> */}
        <Divider />
        <Stack direction={"row"} gap={1} paddingX={2}>
          <ButtonLoading
            disabled={inputErrors !== null}
            isLoading={isCreatingPage}
            fullWidth
            variant="contained"
            size="small"
            onClick={handleCreatePages}
          >
            Save
          </ButtonLoading>
          <Button
            fullWidth
            variant="contained"
            color="error"
            size="small"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </PaperForm>
  );
}

function validateNewPageInput(inputs, allPages) {
  let isValid = true;
  let pathErrors = [];

  const _input = _.cloneDeep(inputs).sort((a, b) =>
    a.path.toLowerCase().localeCompare(b.path.toLowerCase())
  );
  let prevPath = "";
  // check if any exist in database
  _input?.forEach((page) => {
    const path = page.path;
    if (path === prevPath) {
      isValid = false;
      pathErrors.push(path);
    }
    prevPath = path;
    const isExist = allPages.some((_page) => _page.path === path);
    if (isExist) {
      isValid = false;
      pathErrors.push(path);
    }
  });
  return {
    isValid,
    pathErrors,
  };
}
