import { Add, Check } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import { StyleMode } from "../../../styles/useStyle";
import { darkStyles } from "../../../theme/dark-theme-options";

export default function Hobby({ data, step, onRefresh, onChange }) {
  const [input, setInput] = useState([]);
  const [hobbies, setHobbies] = useState(interests);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.hobbies?.length > 0) {
      setInput(data?.hobbies);
    }
  }, [data]);

  const handleAddHobby = (hobby) => {
    if (hobby?.length > 0 && !input.some((hb) => hb.name === hobby)) {
      setInput((prev) => {
        return [...new Set([...prev, { name: hobby }])];
      });
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      const _hobbies = interests.filter((h) =>
        h.toLowerCase().includes(value.toLowerCase())
      );
      setHobbies(_hobbies);
    } else {
      setHobbies(interests);
    }
  };

  const handleRemove = async (index, id) => {
    const copy = _.cloneDeep(input);
    if (id !== undefined) {
      const res = await MyAPIs.Resume().deleteResumeHobby(id);
      onRefresh && onRefresh();
    }

    copy.splice(index, 1);
    setInput(copy);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResumeHobby(data.id, input);
    setIsSaving(false);
    onRefresh && onRefresh();
  };
  return (
    <Stack height={"100%"} width={"100%"}>
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
        <Stack direction={"row"} gap={"1px"} justifyContent={"flex-end"}>
          <ButtonLoading
            size="small"
            variant="contained"
            isLoading={isSaving}
            onClick={handleSave}
            startIcon={<Check />}
          >
            Save
          </ButtonLoading>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={1}
        paddingX={5}
      >
        <Stack direction={"row"} gap={1} alignItems={"flex-end"}>
          <Autocomplete
            size="small"
            options={hobbies}
            fullWidth
            onChange={(event, newValue) => handleAddHobby(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Hobby"
                onChange={handleFilterChange}
              />
            )}
          />
        </Stack>
        <Stack gap={1}>
          {input.map((hb, index) => {
            return (
              <Chip
                key={index}
                label={hb.name}
                color={hb.id ? "info" : "default"}
                sx={{ width: "max-content" }}
                onDelete={() => handleRemove(index, hb.id)}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

const interests = [
  "3D printing",
  "Amateur radio",
  "Scrapbook",
  "Amateur radio",
  "Acting",
  "Baton twirling",
  "Board games",
  "Book restoration",
  "Cabaret",
  "Calligraphy",
  "Candle making",
  "Computer programming",
  "Coffee roasting",
  "Cooking",
  "Colouring",
  "Cosplaying",
  "Couponing",
  "Creative writing",
  "Crocheting",
  "Cryptography",
  "Dance",
  "Digital arts",
  "Drama",
  "Drawing",
  "Do it yourself",
  "Electronics",
  "Embroidery",
  "Fashion",
  "Flower arranging",
  "Foreign language learning",
  "Gaming",
  "Tabletop games",
  "Role-playing games",
  "Gambling",
  "Genealogy",
  "Glassblowing",
  "Gunsmithing",
  "Homebrewing",
  "Ice skating",
  "Jewelry making",
  "Jigsaw puzzles",
  "Juggling",
  "Knapping",
  "Knitting",
  "Kabaddi",
  "Knife making",
  "Lacemaking",
  "Lapidary",
  "Leather crafting",
  "Lego building",
  "Lockpicking",
  "Machining",
  "Macrame",
  "Metalworking",
  "Magic",
  "Model building",
  "Listening to music",
  "Origami",
  "Painting",
  "Playing musical instruments",
  "Pet",
  "Poi",
  "Pottery",
  "Puzzles",
  "Quilting",
  "Reading",
  "Scrapbooking",
  "Sculpting",
  "Sewing",
  "Singing",
  "Sketching",
  "Soapmaking",
  "Sports",
  "Stand-up comedy",
  "Sudoku",
  "Table tennis",
  "Taxidermy",
  "Video gaming",
  "Watching movies",
  "Web surfing",
  "Whittling",
  "Wood carving",
  "Woodworking",
  "World Building",
  "Writing",
  "Yoga",
  "Yo-yoing",
  "Air sports",
  "Archery",
  "Astronomy",
  "Backpacking",
  "Base jumping",
  "Baseball",
  "Basketball",
  "Beekeeping",
  "Bird watching",
  "Blacksmithing",
  "Board sports",
  "Bodybuilding",
  "Brazilian jiu-jitsu",
  "Community",
  "Cycling",
  "Dowsing",
  "Driving",
  "Fishing",
  "Flag football",
  "Flying",
  "Flying disc",
  "Foraging",
  "Gardening",
  "Geocaching",
  "Ghost hunting",
  "Graffiti",
  "Handball",
  "Hiking",
  "Hooping",
  "Horseback riding",
  "Hunting",
  "Inline skating",
  "Jogging",
  "Kayaking",
  "Kite flying",
  "Kitesurfing",
  "Larping",
  "Letterboxing",
  "Metal detecting",
  "Motor sports",
  "Mountain biking",
  "Mountaineering",
  "Mushroom hunting",
  "Mycology",
  "Netball",
  "Nordic skating",
  "Orienteering",
  "Paintball",
  "Parkour",
  "Photography",
  "Polo",
  "Rafting",
  "Rappelling",
  "Rock climbing",
  "Roller skating",
  "Rugby",
  "Running",
  "Sailing",
  "Sand art",
  "Scouting",
  "Scuba diving",
  "Sculling",
  "Rowing",
  "Shooting",
  "Shopping",
  "Skateboarding",
  "Skiing",
  "Skim Boarding",
  "Skydiving",
  "Slacklining",
  "Snowboarding",
  "Stone skipping",
  "Surfing",
  "Swimming",
  "Taekwondo",
  "Tai chi",
  "Urban exploration",
  "Vacation",
  "Vehicle restoration",
  "Water sports",
];
