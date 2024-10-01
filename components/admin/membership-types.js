import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Header from "./header";
import {
  Add,
  AllInbox,
  Cancel,
  CheckCircle,
  People,
} from "@mui/icons-material";
import Table from "../widgets/tables/table";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import SelectCustom from "../widgets/select/select-custom";
import { adminContext } from "../../pages/admin";
import ButtonDialog from "../widgets/buttons/button_dialog";
import Input from "../widgets/input/Input";
import ButtonLoading from "../widgets/buttons/button-loading";
import { mainContext } from "../../pages/_app";
import { stringUtil } from "../../utils/stringUtil";
import axios from "axios";

const input_template = {
  type: "",
  cost: 0,
  description: "",
  feature: {
    portfolioQuantity: 1,
    isResumeAccess: false,
    isAPIAccess: false,
  },
  resumeSection: {
    workExperience: false,
    education: false,
    skills: false,
    certifications: false,
    projects: false,
    awards: false,
    volunteerExperience: false,
    languages: false,
    publications: false,
    professionalMemberships: false,
    hobbies: false,
  },
};

export default function MembershipTypes() {
  const theme = useTheme();
  const { setNote } = useContext(mainContext);
  const { mainData, updateMainData } = useContext(adminContext);
  const { membershipTypes } = mainData;
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    membershipTypes === null && init();
  }, []);

  const init = async () => {
    try {
      const APIs = [MyAPIs.MembershipType().getMembershipTypes()];
      const res = await axios.all(APIs);
      const _membershipTypes = res[0].data;
      updateMainData({ membershipTypes: _membershipTypes });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccess = (newData) => {
    const index = mainData.membershipTypes.findIndex(
      (item) => item.id === newData.id
    );
    const copy = _.cloneDeep(mainData.membershipTypes);
    if (index === -1) {
      copy.push(newData);
    } else {
      copy[index] = newData;
    }
    updateMainData({ membershipTypes: copy });
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"Membership Types"} icon={<AllInbox />}>
        <Stack direction={"row"} gap={1}></Stack>
      </Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <NewMembershipTypeButton
          default_input={selectedType}
          setNote={setNote}
          onSuccess={handleSuccess}
          onClose={() => setSelectedType(null)}
        />

        <Divider />
        <Stack direction={"row"} justifyContent="center" padding={5}>
          {membershipTypes?.map((type, index) => {
            return (
              <Paper
                className="normal br0"
                variant="outlined"
                key={index}
                sx={{ width: "300px" }}
              >
                <Stack justifyContent={"space-between"} height={"100%"}>
                  <Stack>
                    <Stack alignItems={"center"} padding={2} gap={1}>
                      <Typography variant="h4">{type.type}</Typography>
                      <Typography variant="h6">
                        {`$${type.cost || 0} USD/Month`}
                      </Typography>
                    </Stack>
                    <Stack padding={3} gap={2}>
                      <Stack direction={"row"} gap={2}>
                        <CheckCircle color="success" />
                        {`Max ${type.feature?.portfolioQuantity} Portfolio Page(s)`}
                      </Stack>
                      <Stack
                        sx={{
                          marginLeft: 1.5,
                          borderLeft: `1px solid ${theme.palette.success.main}`,
                        }}
                      >
                        <Typography
                          fontStyle={"italic"}
                          variant="body2"
                          sx={{ paddingX: 1 }}
                        >
                          Portfolio Sections
                        </Typography>
                        <Stack padding={1}>
                          {Object.entries(
                            type.feature.membershipResumeSection
                          ).map((item, _index) => {
                            const section = item[0];
                            const value = item[1];
                            if (section !== "id") {
                              return (
                                <Stack key={_index} direction={"row"} gap={2}>
                                  -
                                  <Typography
                                    variant="subtitle2"
                                    sx={
                                      value === false && {
                                        textDecoration: "line-through",
                                        fontStyle: "italic",
                                        fontWeight: "100",
                                        opacity: 0.7,
                                      }
                                    }
                                  >
                                    {stringUtil.camelToTitle(section)}
                                  </Typography>
                                </Stack>
                              );
                            }
                          })}
                        </Stack>
                      </Stack>
                      <Stack direction={"row"} gap={2}>
                        {type.feature.isResumeAccess ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Cancel color="error" />
                        )}{" "}
                        Resume Access
                      </Stack>
                      <Stack direction={"row"} gap={2}>
                        {type.feature.isAPIAccess ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Cancel color="error" />
                        )}{" "}
                        API Access
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Divider />
                    <Stack direction={"row"}>
                      <Button
                        fullWidth
                        className="br0"
                        color="warning"
                        onClick={() => setSelectedType(type)}
                      >
                        Edit
                      </Button>
                      {type?._count?.memberships === 0 && (
                        <>
                          <Divider orientation="vertical" flexItem />
                          <Button
                            fullWidth
                            className="br0"
                            color="error"
                            onClick={() => setSelectedType(type)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

const sections = [
  "workExperience",
  "education",
  "skills",
  "certifications",
  "projects",
  "awards",
  "volunteerExperience",
  "languages",
  "publications",
  "professionalMemberships",
  "hobbies",
];

function NewMembershipTypeButton({
  default_input = null,
  setNote,
  onSuccess,
  onClose,
}) {
  const [input, setInput] = useState(input_template);
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    if (default_input) {
      const type = _.cloneDeep(default_input);
      const feature = type.feature;
      const resumeSection = feature.membershipResumeSection;
      delete type.feature;
      delete feature.id;
      delete feature.membershipResumeSection;
      delete feature.membershipResumeSectionID;
      delete resumeSection.id;

      setInput({
        ...type,
        feature,
        resumeSection,
      });
      setOpen(true);
    }
  }, [default_input]);

  const handleTypeChange = (newData) => {
    setInput((prev) => {
      return {
        ...prev,
        ...newData,
      };
    });
  };

  const handleFeatureChange = (newData) => {
    setInput((prev) => {
      return {
        ...prev,
        feature: {
          ...prev.feature,
          ...newData,
        },
      };
    });
  };
  const handleSectionChange = (newData) => {
    setInput((prev) => {
      return {
        ...prev,
        resumeSection: {
          ...prev.resumeSection,
          ...newData,
        },
      };
    });
  };

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const res = await MyAPIs.MembershipType().createMembershipType(
        input.type,
        input.cost,
        input.description,
        input.feature,
        input.resumeSection
      );
      if (res) {
        console.log(res.data);
        setNote.success("Create Membership Type Success");
        setOpen(false);
        setInput(input_template);
        onSuccess && onSuccess(res.data);
      } else {
        setNote.error("Create Membership Type Fail");
      }
      setIsCreating(false);
    } catch (error) {
      setIsCreating(false);
    }
  };
  const handleUpdate = async () => {
    setIsCreating(true);
    try {
      const res = await MyAPIs.MembershipType().updateMembershipType(
        input.id,
        input.type,
        input.cost,
        input.description,
        input.feature,
        input.resumeSection
      );
      if (res) {
        console.log(res.data);
        setNote.success("Update Membership Type Success");
        setOpen(false);
        setInput(input_template);
        onSuccess && onSuccess(res.data);
      } else {
        setNote.error("Update Membership Type Fail");
      }
      setIsCreating(false);
    } catch (error) {
      setIsCreating(false);
    }
  };

  return (
    <ButtonDialog
      title={"New Membership Type"}
      open={open}
      onClick={() => setOpen(true)}
      onClose={() => {
        setOpen(false);
        onClose && onClose();
      }}
      isCloseOnClickOut={false}
      button_label="Create Membership Type"
      isStartIcon={true}
      icon={<Add />}
      color={"secondary"}
      paperProps={{ style: { maxWidth: "100%" } }}
    >
      <Stack direction={"row"}>
        <Stack padding={2} gap={4} minWidth={"400px"}>
          <Stack gap={2}>
            <Typography fontStyle={"italic"} sx={{ opacity: 0.7 }}>
              Type Information
            </Typography>
            <Stack gap={2}>
              <Input
                label="Name"
                value={input.type}
                size="small"
                onChange={(e) => handleTypeChange({ type: e.target.value })}
                autoComplete="off"
              />
              <Input
                label="Cost"
                value={input.cost}
                size="small"
                type={"number"}
                onChange={(e) =>
                  handleTypeChange({ cost: parseFloat(e.target.value) })
                }
                autoComplete="off"
              />
              <Input
                multiline
                rows={3}
                label="Description"
                value={input.description}
                size="small"
                autoComplete="off"
                onChange={(e) =>
                  handleTypeChange({ description: e.target.value })
                }
              />
            </Stack>
          </Stack>

          <Stack gap={2}>
            <Typography fontStyle={"italic"} sx={{ opacity: 0.7 }}>
              Features
            </Typography>

            <Input
              label="Portfolio Quantity"
              value={input.feature.portfolioQuantity}
              size="small"
              type="number"
              autoComplete="off"
              onChange={(e) =>
                handleFeatureChange({
                  portfolioQuantity: parseInt(e.target.value),
                })
              }
            />
            <Stack paddingX={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={input.feature.isResumeAccess}
                    onChange={(e) =>
                      handleFeatureChange({ isResumeAccess: e.target.checked })
                    }
                  />
                }
                label="Access Resume"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={input.feature.isAPIAccess}
                    onChange={(e) =>
                      handleFeatureChange({ isAPIAccess: e.target.checked })
                    }
                  />
                }
                label="Access API"
              />
            </Stack>
          </Stack>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack padding={2} gap={2}>
          <Typography fontStyle={"italic"} sx={{ opacity: 0.7 }}>
            Portfolio Sections
          </Typography>
          <Stack paddingX={2}>
            {sections.map((section, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      size="small"
                      checked={input.resumeSection[section]}
                      onChange={(e) =>
                        handleSectionChange({ [section]: e.target.checked })
                      }
                    />
                  }
                  label={section}
                />
              );
            })}
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction={"row"} gap={1} padding={1} justifyContent={"flex-end"}>
        <ButtonLoading
          color={input.id ? "warning" : "secondary"}
          isLoading={isCreating}
          onClick={input.id ? handleUpdate : handleCreate}
        >
          {input.id ? "Update" : "Create"}
        </ButtonLoading>
        <Button onClick={() => setInput(input_template)}>Clear</Button>
      </Stack>
    </ButtonDialog>
  );
}
