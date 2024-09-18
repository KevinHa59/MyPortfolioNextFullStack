import { Button, Divider, Paper, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ButtonDialog from "../widgets/buttons/button_dialog";
import {
  Add,
  Clear,
  DeleteForever,
  Edit,
  PagesRounded,
} from "@mui/icons-material";
import Table from "../widgets/tables/table";
import Input from "../widgets/input/Input";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import Header from "./header";
import PaperForm from "../widgets/paper/paper-form";
import ButtonLoading from "../widgets/buttons/button-loading";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import { mainContext } from "../../pages/_app";
import { asyncNoteContext } from "../widgets/notification/async-notification";

export default function Pages() {
  const { addNote } = useContext(asyncNoteContext);
  const [pages, setPages] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const [isNewPageOpen, setIsNewPageOpen] = useState(false);
  const [editPage, setEditPage] = useState(null);

  useEffect(() => {
    initData();
  }, []);

  async function initData() {
    setIsGettingData(true);
    let data = await addNote("Get Pages", MyAPIs.Page().getPages());
    setPages(data.data);
    setIsGettingData(false);
  }

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Pages"} icon={<PagesRounded />}>
        <Stack direction={"row"} gap={1}>
          <ButtonDialog
            open={isNewPageOpen}
            isCloseOnClickOut={false}
            onClick={() => setIsNewPageOpen(true)}
            variant={"contained"}
            button_label="Create New Pages"
            size="small"
            paperProps={{
              style: { minWidth: "clamp(500px, calc(100vw - 50px), 1000px)" },
            }}
            title={editPage ? "Edit Page" : "New Pages"}
            onClose={() => {
              setIsNewPageOpen(false);
              setTimeout(() => {
                setEditPage(null);
              }, 200);
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
              onCreatePageSuccess={() => {
                initData();
                setIsNewPageOpen(false);
              }}
            />
          </ButtonDialog>
        </Stack>
      </Header>
      <Stack
        // variant="outlined"
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Paper className="flat br0">
          <Table
            isLoading={isGettingData}
            data={pages}
            headers={headers}
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                pages={pages}
                onEdit={() => handleEditUserOpen(row)}
                onPasswordChange={() => handlePasswordChangeOpen(row)}
                onRefresh={initData}
              />
            )}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}
function Cell({ row, header, pages, onEdit, onRefresh }) {
  if (header === "actions") {
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"1px"}
      >
        <EditButton data={row} pages={pages} onRefresh={onRefresh} />
        <DeletePageButton id={row.id} onRefresh={onRefresh} />
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
                  // variant="contained"
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
      <Stack direction={"row"} justifyContent={"flex-end"} gap={1} paddingX={2}>
        <ButtonLoading
          disabled={inputErrors !== null}
          isLoading={isCreatingPage}
          variant="contained"
          size="small"
          onClick={handleCreatePages}
        >
          Save
        </ButtonLoading>
      </Stack>
    </Stack>
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

function EditButton({ data, pages, onRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [input, setInput] = useState({
    path: "",
    description: "",
  });
  const [errors, setErrors] = useState(null);

  const handleInputChange = (newValue) => {
    const copy = _.cloneDeep(input);
    const newCopy = {
      ...copy,
      ...newValue,
    };
    const { isValid, pathErrors } = validateNewPageInput([newCopy], pages);
    if (!isValid && newCopy.path !== data.path) {
      setErrors({ isValid, pathErrors });
    } else {
      setErrors(null);
    }
    setInput(newCopy);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Page().savePage(
      input.path,
      input.description,
      input.id
    );
    if (res.data) {
      onRefresh && onRefresh();
      setIsOpen(false);
    }
    setIsSaving(false);
  };

  return (
    <ButtonDialog
      isIconButton={true}
      size="small"
      color={"warning"}
      icon={<Edit />}
      open={isOpen}
      isCloseOnClickOut={false}
      onClick={() => {
        setIsOpen(true);
        setInput(data);
      }}
      title={"Edit Page"}
      onClose={() => setIsOpen(false)}
      paperProps={{
        style: {
          minWidth: "max-content",
          maxWidth: "100%",
          width: "clamp(600px, 100%, 1000px)",
        },
      }}
    >
      <Stack padding={2} gap={1} width={"100%"}>
        <Stack direction={"row"} gap={1} width={"100%"}>
          <Input
            isInvalidInput={errors !== null}
            inputErrorMessage="Path Existed"
            sx={{ width: "40%" }}
            value={input?.path}
            label={"Path"}
            size="small"
            onChange={(e) => handleInputChange({ path: e.target.value })}
          />
          <Input
            sx={{ width: "60%" }}
            value={input?.description}
            label={"Description"}
            size="small"
            onChange={(e) => handleInputChange({ description: e.target.value })}
          />
        </Stack>
        <Divider />
        <Stack direction={"row"} justifyContent={"flex-end"} gap={1}>
          <ButtonLoading
            size="small"
            variant="contained"
            disabled={errors !== null}
            onClick={handleSave}
          >
            Save
          </ButtonLoading>
        </Stack>
      </Stack>
    </ButtonDialog>
  );
}

function DeletePageButton({ id, onRefresh }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { setNote } = useContext(mainContext);
  const handleRemove = async (setOpen) => {
    setIsRemoving(true);
    const res = await MyAPIs.Page().deletePage(id);
    if (res.status === 201) {
      onRefresh && onRefresh();
      setOpen(false);
      setNote.success("Remove page success", 5000);
    } else {
      setNote.error(res.data.err, 5000);
    }
    setIsRemoving(false);
  };
  return (
    <ButtonDialogConfirm
      dialog_color={"error"}
      dialog_title={"Remove Page"}
      dialog_message={"Are you sure?"}
      isLoading={isRemoving}
      sx={{ padding: 0, minWidth: 0 }}
      onConfirm={handleRemove}
      color={"error"}
    >
      <DeleteForever color="error" />
    </ButtonDialogConfirm>
  );
}
