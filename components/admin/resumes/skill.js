import {
  Add,
  Category,
  Clear,
  DeleteForever,
  MoveDown,
  Send,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  ClickAwayListener,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PublicAPI from "../../../pages/api-functions/PublicAPI";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import Input from "../../widgets/input/Input";
import { resumeContext } from "../../profile/new-resume";
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import ArrayUtils from "../../../utils/arrays";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
import ButtonDialog from "../../widgets/buttons/button_dialog";

export default function Skill({ resumeID, data, step }) {
  const { handleResumeDataChange } = useContext(resumeContext);
  const { addNote } = useContext(asyncNoteContext);
  const [skills, setSkills] = useState({});
  const [search, setSearch] = useState({
    name: "",
    group: null,
  });
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    if (data?.length > 0) {
      setSkills(data);
      const res = ArrayUtils.groupByKey(data, "group");
      let groups = ArrayUtils.UniqueKey(data, "group");
      groups = groups.filter((item) => item !== null);
      setGroups(groups);
      setSkills(res);
    }
  }, [data]);

  const handleSearchChange = (newValue) => {
    setSearch((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleDeleteSkill = async (skill, setOpen) => {
    try {
      await addNote(
        "Remove Skill",
        MyAPIs.Resume().deleteResumeSkill(skill.id)
      );
      setOpen(false);
      let _copy = _.cloneDeep(data);
      _copy = _copy.filter((sk) => sk.id !== skill.id);
      handleResumeDataChange({ skills: _copy });
    } catch (error) {}
  };

  const handleSave = async () => {
    if (search.name.length > 0) {
      const res = await addNote(
        "Add Skill",
        MyAPIs.Resume().updateResumeSkill(resumeID, [search])
      );
      const updateSkills = res.data;
      handleResumeDataChange({ skills: updateSkills });
      handleSearchChange({ name: "", group: null });
    }
  };
  const handleUpdateGroup = async (skill) => {
    if (skill.name.length > 0) {
      const res = await addNote(
        "Update Group",
        MyAPIs.Resume().updateResumeSkill(resumeID, [skill])
      );
      const updateSkills = res.data;
      handleResumeDataChange({ skills: updateSkills });
      handleSearchChange({ name: "", group: null });
    }
  };

  return (
    <Stack height={"100%"} width={"100%"}>
      <Paper sx={{ position: "sticky", top: 0, zIndex: 5 }}>
        <Stack
          direction={"row"}
          gap={"1px"}
          justifyContent={"space-between"}
          height={"45px"}
          padding={1}
        >
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            {step.Icon}
            <Typography>{step.name}</Typography>
          </Stack>
        </Stack>
      </Paper>
      <Divider />
      <Stack gap={5} padding={1} paddingX={5}>
        <Stack direction={"row"} gap={1} alignItems={"flex-end"}>
          <Input
            isAutoComplete={true}
            APIOptions={PublicAPI.getSkills}
            OptionListMinWidth={"300px"}
            label={"Skills"}
            fullWidth={true}
            value={search.name}
            sx={{ width: "100%" }}
            onChange={(e) => handleSearchChange({ name: e.target.value })}
            onSelect={(value) => handleSearchChange({ name: value })}
          />
          <Input
            isAutoComplete={true}
            defaultOptions={groups}
            OptionListMinWidth={"300px"}
            label={"Group"}
            fullWidth={true}
            value={search.group || ""}
            sx={{ width: "20%" }}
            onChange={(e) =>
              handleSearchChange({
                group: e.target.value.length > 0 ? e.target.value : null,
              })
            }
            onSelect={(value) => handleSearchChange({ group: value })}
          />
          <Button
            size="small"
            variant="contained"
            sx={{ height: "max-content" }}
            onClick={() => handleSave()}
          >
            Add
          </Button>
        </Stack>
        <Stack direction={"row"} gap={5} flexWrap={"wrap"}>
          {Object.entries(skills).map((group, index) => {
            return (
              <SkillGroup
                key={index}
                groupData={group}
                groups={groups}
                onDelete={handleDeleteSkill}
                onMoveToGroup={handleUpdateGroup}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

function SkillGroup({ groupData, groups, onDelete, onMoveToGroup }) {
  const theme = useTheme();
  const groupName = groupData[0];
  const groupSkills = groupData[1];

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "clamp(300px, 30% , 500px)",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Paper className="br0">
        <Typography fontWeight={"bold"} sx={{ padding: 1 }}>
          {groupName.toUpperCase()}
        </Typography>
      </Paper>
      <Divider />
      <Stack
        sx={{
          position: "relative",
        }}
      >
        {groupSkills.map((skill, index) => {
          return (
            <>
              <SkillButton
                skill={skill}
                groups={groups}
                theme={theme}
                onDelete={onDelete}
                onMoveToGroup={onMoveToGroup}
              />
              {index < groupSkills.length - 1 && <Divider flexItem />}
            </>
          );
        })}
      </Stack>
    </Paper>
  );
}

function SkillButton({ skill, groups, theme, onDelete, onMoveToGroup }) {
  const [newGroup, setNewGroup] = useState("");
  const [open, setOpen] = useState(false);

  const handleMove = (moveValue) => {
    onMoveToGroup && onMoveToGroup(moveValue);
    setOpen(false);
  };
  return (
    <ButtonDialog
      open={open}
      isCloseOnClickOut={false}
      onClick={() => setOpen(true)}
      title={"Move to Group"}
      className={"br0"}
      size="small"
      fullWidth={true}
      sx_button={{
        width: "100%",
        background: theme.palette.background.paper,
      }}
      button_label={
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2">{skill.name}</Typography>{" "}
          <ButtonDialogConfirm
            color={"error"}
            dialog_color={"error"}
            dialog_title={"Delete Skill"}
            dialog_message={"Are You Sure?"}
            size={"small"}
            sx={{ padding: 0, minWidth: 0 }}
            onConfirm={(setOpen) => onDelete(skill, setOpen)}
          >
            <Clear />
          </ButtonDialogConfirm>
        </Stack>
      }
    >
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack minWidth={"300px"} gap={0.5}>
            <Input
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              label={"New Group"}
              size="small"
              inputProps={{
                endAdornment: (
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleMove({ ...skill, group: newGroup });
                      setNewGroup("");
                    }}
                  >
                    <Send />
                  </IconButton>
                ),
              }}
            />
            <Divider />
            <Button
              className="br0"
              onClick={() =>
                handleMove({
                  ...skill,
                  group: null,
                })
              }
            >
              Ungrouped
            </Button>
            {groups.length > 0 && <Divider />}
            {groups?.map((gr, index) => {
              return (
                <>
                  <Button
                    className="br0"
                    key={index}
                    onClick={() =>
                      handleMove({
                        ...skill,
                        group: gr,
                      })
                    }
                  >
                    {gr}
                  </Button>
                  {index < groups.length - 1 && <Divider />}
                </>
              );
            })}
          </Stack>
        </Stack>
      </ClickAwayListener>
    </ButtonDialog>
  );
}
