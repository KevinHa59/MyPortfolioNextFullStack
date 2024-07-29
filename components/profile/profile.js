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
import React, { useContext, useState, useTransition } from "react";
import { profileContext } from "../../pages/profile";
import Input from "../widgets/input/Input";
import axios from "axios";
import useDelay from "../../hooks/use-delay";
import Link from "next/link";

export default function Profile() {
  const { mainData } = useContext(profileContext);
  const [isDelaying, startDelay] = useDelay(500);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [profileData, setProfileData] = useState({
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
  });
  const [addresses, setAddresses] = useState(null);

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

  return (
    <Fade in={true}>
      <Stack
        gap={5}
        direction={"row"}
        height={"100%"}
        paddingX={2}
        position={"relative"}
      >
        <Paper sx={{ width: "50%", height: "max-content" }}>
          <Stack padding={1}>
            <Stack height={"300px"}>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                sx={{ aspectRatio: "1/1" }}
              >
                <Paper
                  className="brMAX"
                  sx={{ height: "100%", aspectRatio: "1/1" }}
                ></Paper>
              </Stack>
              <Typography
                textAlign={"center"}
                sx={{ fontSize: "3vw" }}
              >{`${mainData.user?.firstName} ${mainData.user?.lastName}`}</Typography>
            </Stack>
            <Divider />

            <Stack gap={2} sx={{ padding: 2 }}>
              <Input label={"Email"} value={mainData.user.email} />
              <Input label={"Cell Phone"} value={mainData.user.cellPhone} />
              <Input
                type={"date"}
                label={"Date of Birth"}
                value={mainData.user.dob.split("T")[0]}
              />
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button variant="contained">Save</Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack gap={2} height={"50%"} alignItems={"center"}>
          <Paper sx={{ padding: 2, width: "100%" }}>
            <Stack gap={2}>
              <Stack gap={1}>
                <Stack position={"relative"}>
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
                </Stack>
                <Stack direction={"row"} gap={1}>
                  <Input label={"City"} value={profileData.address.city} />
                  <Input label={"State"} value={profileData.address.state} />
                  <Input
                    label={"Zip Code"}
                    value={profileData.address.zipCode}
                  />
                </Stack>
                <Input label={"Country"} value={profileData.address.country} />
              </Stack>
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button variant="contained">Save</Button>
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{ padding: 2, width: "100%" }}>
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
                value={mainData.user.linkedIn || ""}
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
                value={mainData.user.github || ""}
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
                value={mainData.user.twitter || ""}
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
                value={mainData.user.facebook || ""}
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
                value={mainData.user.instagram || ""}
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
                value={mainData.user.portfolio || ""}
              />
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button variant="contained">Save</Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Fade>
  );
}
