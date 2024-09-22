import {
  AccountBoxRounded,
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Phone,
  Public,
  Twitter,
  Web,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { profileContext } from "../../pages/profile";
import Input from "../widgets/input/Input";
import axios from "axios";
import useDelay from "../../hooks/use-delay";
import Link from "next/link";
import { asyncNoteContext } from "../widgets/notification/async-notification";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import { setCookie } from "cookies-next";

export default function Profile() {
  const { mainData } = useContext(profileContext);
  const { addNote } = useContext(asyncNoteContext);
  const [isDelaying, startDelay] = useDelay(500);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [profileData, setProfileData] = useState({
    id: null,
    basic: {
      email: "",
      cellPhone: "",
      dob: "",
    },
    address: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    socials: {
      linkedIn: "",
      github: "",
      twitter: "",
      facebook: "",
      instagram: "",
      portfolio: "",
    },
  });
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    if (mainData.user) {
      setProfileData({
        id: mainData.user.id,
        basic: {
          email: mainData.user.email,
          cellPhone: mainData.user.cellPhone,
          dob: mainData.user.dob,
        },
        address: {
          address: mainData.user.address,
          city: mainData.user.city,
          state: mainData.user.state,
          zipCode: mainData.user.zipCode,
          country: mainData.user.country,
        },
        socials: {
          linkedIn: mainData.user.linkedIn,
          github: mainData.user.github,
          twitter: mainData.user.twitter,
          facebook: mainData.user.facebook,
          instagram: mainData.user.instagram,
          portfolio: mainData.user.portfolio,
        },
      });
    }
  }, [mainData]);

  const handleAddressChange = async (key, value, isFetching = true) => {
    setIsFetchingData(true);
    setProfileData((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          ...value,
        },
      };
    });
    if (isFetching) {
      startDelay(async () => {
        await handleGetLocation(value);
        setIsFetchingData(false);
      });
    } else {
      setIsFetchingData(false);
    }
  };
  const handleGetLocation = async (value) => {
    try {
      setAddresses([]);
      const res = await axios.get("/api/places-autocomplete", {
        params: {
          q: value.address,
        },
      });
      if (res?.data?.length > 0) {
        const address = res.data.map((add) => {
          const string_address = Object.values(add.address).join(", ");

          return {
            data: {
              ...add.address,
              number: add.address.house_number + " " + add.address.name,
            },
            addressString: string_address,
          };
        });
        setAddresses(address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveBasic = async () => {
    try {
      const { email, cellPhone, dob } = profileData.basic;
      const res = await addNote(
        "Update Address",
        MyAPIs.User().updateUserBasic(profileData.id, dob, cellPhone)
      );
      const newUserInfo = res.data;
      newUserInfo["token"] = newUserInfo.refreshToken;
      delete newUserInfo.password;
      delete newUserInfo.refreshToken;
      setCookie("user", newUserInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveAddress = async () => {
    try {
      const { address, city, state, country, zipCode } = profileData.address;
      const res = await addNote(
        "Update Address",
        MyAPIs.User().updateUserAddress(
          profileData.id,
          address,
          city,
          state,
          country,
          zipCode
        )
      );
      const newUserInfo = res.data;
      newUserInfo["token"] = newUserInfo.refreshToken;
      delete newUserInfo.password;
      delete newUserInfo.refreshToken;
      setCookie("user", newUserInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveSocial = async () => {
    try {
      const { linkedIn, github, twitter, facebook, instagram, portfolio } =
        profileData.socials;
      const res = await addNote(
        "Update Socials",
        MyAPIs.User().updateUserSocial(
          profileData.id,
          linkedIn,
          github,
          twitter,
          facebook,
          instagram,
          portfolio
        )
      );
      const newUserInfo = res.data;
      newUserInfo["token"] = newUserInfo.refreshToken;
      delete newUserInfo.password;
      delete newUserInfo.refreshToken;
      setCookie("user", newUserInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileChange = (key, newData) => {
    const copy = _.cloneDeep(profileData);
    copy[key] = {
      ...copy[key],
      ...newData,
    };
    setProfileData(copy);
  };

  return (
    <Fade in={true}>
      <Stack
        height={"100%"}
        padding={2}
        position={"relative"}
        alignItems={"center"}
        sx={{ overflowY: "auto" }}
      >
        <Stack width={"clamp(400px, 50vw, 500px)"} gap={5}>
          <Paper
            variant="outlined"
            sx={{
              minWidth: "clamp(300px, 30vw, 400px)",
              height: "max-content",
            }}
          >
            <Stack padding={3} gap={2}>
              <Stack height={"100%"} alignItems={"center"}>
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"50%"}
                  sx={{ aspectRatio: "1/1" }}
                >
                  <Paper
                    variant="outlined"
                    className="brMAX"
                    sx={{ height: "100%", aspectRatio: "1/1" }}
                  ></Paper>
                </Stack>
                <Typography
                  textAlign={"center"}
                  sx={{ fontSize: "clamp(20px,3vw,50px)" }}
                >{`${mainData.user?.name || ""} ${
                  mainData.user?.firstName || ""
                } ${mainData.user?.lastName || ""}`}</Typography>
                <Typography
                  textAlign={"center"}
                  sx={{ fontSize: "clamp(12px,1.5vw,20px)" }}
                >{`${mainData.user?.email}`}</Typography>
              </Stack>

              <Stack gap={2}>
                <Input
                  label={"Cell Phone"}
                  value={profileData.basic.cellPhone}
                  onChange={(e) =>
                    handleProfileChange("basic", { cellPhone: e.target.value })
                  }
                />
                <Input
                  type={"date"}
                  label={"Date of Birth"}
                  value={profileData.basic.dob?.split("T")[0]}
                  onChange={(e) =>
                    handleProfileChange("basic", { dob: e.target.value })
                  }
                />
                <Stack direction={"row"} justifyContent={"flex-end"}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSaveBasic}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ padding: 3, width: "100%" }}>
            <Stack gap={4}>
              <Typography variant="body2" fontWeight={"bold"}>
                Address
              </Typography>
              <Stack position={"relative"} gap={2}>
                <Input
                  label={"Address"}
                  value={profileData.address.address}
                  onChange={(e) =>
                    handleAddressChange("address", {
                      address: e.target.value,
                    })
                  }
                  inputProps={{
                    endAdornment: isFetchingData && (
                      <CircularProgress color="inherit" size={20} />
                    ),
                  }}
                />
                {addresses?.length > 0 && (
                  <Paper
                    variant="outlined"
                    sx={{
                      position: "absolute",
                      top: "100%",
                      width: "100%",
                      left: 0,
                      zIndex: 2,
                      padding: 1,
                    }}
                  >
                    <Stack gap={1}>
                      {addresses?.map((ad, index) => {
                        return (
                          <Button
                            className="flex-start"
                            key={index}
                            onClick={() => {
                              handleAddressChange(
                                "address",
                                {
                                  address: ad.data.number,
                                  city: ad.data.city,
                                  state: ad.data.state,
                                  zipCode: ad.data.postcode,
                                  country: ad.data.country_code,
                                },
                                false
                              );
                              setAddresses([]);
                            }}
                          >
                            {ad.addressString}
                          </Button>
                        );
                      })}
                    </Stack>
                  </Paper>
                )}
                <Input
                  label={"City"}
                  value={profileData.address.city}
                  onChange={(e) =>
                    handleProfileChange("address", { city: e.target.value })
                  }
                />
                <Input
                  label={"State"}
                  value={profileData.address.state}
                  onChange={(e) =>
                    handleProfileChange("address", { state: e.target.value })
                  }
                />
                <Input
                  label={"Zip Code"}
                  value={profileData.address.zipCode}
                  onChange={(e) =>
                    handleProfileChange("address", {
                      zipCode: e.target.value,
                    })
                  }
                />
                <Input
                  label={"Country"}
                  value={profileData.address.country}
                  onChange={(e) =>
                    handleProfileChange("address", {
                      country: e.target.value,
                    })
                  }
                />
              </Stack>
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleSaveAddress}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ padding: 3, width: "100%" }}>
            <Stack gap={4}>
              <Typography variant="body2" fontWeight={"bold"}>
                Social
              </Typography>
              <Stack gap={2}>
                <Input
                  inputProps={{
                    startAdornment: (
                      <Stack paddingRight={2}>
                        <LinkedIn />
                      </Stack>
                    ),
                  }}
                  label={"Linkedin"}
                  onChange={(e) =>
                    handleProfileChange("socials", { linkedIn: e.target.value })
                  }
                  value={profileData.socials.linkedIn || ""}
                />
                <Input
                  inputProps={{
                    startAdornment: (
                      <Stack paddingRight={2}>
                        <GitHub />
                      </Stack>
                    ),
                  }}
                  label={"Github"}
                  onChange={(e) =>
                    handleProfileChange("socials", { github: e.target.value })
                  }
                  value={profileData.socials.github || ""}
                />
                <Input
                  inputProps={{
                    startAdornment: (
                      <Stack paddingRight={2}>
                        <Twitter />
                      </Stack>
                    ),
                  }}
                  label={"Twitter"}
                  onChange={(e) =>
                    handleProfileChange("socials", { twitter: e.target.value })
                  }
                  value={profileData.socials.twitter || ""}
                />
                <Input
                  inputProps={{
                    startAdornment: (
                      <Stack paddingRight={2}>
                        <Facebook />
                      </Stack>
                    ),
                  }}
                  label={"Facebook"}
                  onChange={(e) =>
                    handleProfileChange("socials", { facebook: e.target.value })
                  }
                  value={profileData.socials.facebook || ""}
                />
                <Input
                  inputProps={{
                    startAdornment: (
                      <Stack paddingRight={2}>
                        <Instagram />
                      </Stack>
                    ),
                  }}
                  label={"Instagram"}
                  onChange={(e) =>
                    handleProfileChange("socials", {
                      instagram: e.target.value,
                    })
                  }
                  value={profileData.socials.instagram || ""}
                />
                <Input
                  inputProps={{
                    startAdornment: (
                      <Stack paddingRight={2}>
                        <Public />
                      </Stack>
                    ),
                  }}
                  label={"Portfolio"}
                  onChange={(e) =>
                    handleProfileChange("socials", {
                      portfolio: e.target.value,
                    })
                  }
                  value={profileData.socials.portfolio || ""}
                />
              </Stack>
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleSaveSocial}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Fade>
  );
}
