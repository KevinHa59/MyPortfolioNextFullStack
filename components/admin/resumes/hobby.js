import { Add, Check } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import Input from "../../widgets/input/Input";
import { asyncNoteContext } from "../../widgets/notification/async-notification";
import { resumeContext } from "../../profile/new-resume";

export default function Hobby({ resumeID, data, step }) {
  const { addNote } = useContext(asyncNoteContext);
  const { handleResumeDataChange } = useContext(resumeContext);
  const [input, setInput] = useState([]);
  const [hobbies, setHobbies] = useState(interests);
  const [isSaving, setIsSaving] = useState(false);
  const [hobby, setHobby] = useState("");
  useEffect(() => {
    if (data?.length > 0) {
      setInput(data);
    }
  }, [data]);

  const handleAddHobby = async (_hobby, isSelect = true) => {
    let newHobby = isSelect ? _hobby : hobby;
    if (newHobby?.length > 0 && !input.some((hb) => hb.name === newHobby)) {
      try {
        const hobbyData = {
          name: newHobby,
        };
        const res = await addNote(
          "Add Hobby",
          MyAPIs.Resume().updateResumeHobby(resumeID, [hobbyData])
        );
        handleResumeDataChange({ hobbies: res.data });
      } catch (error) {
        console.log(0);
      }
    }
  };

  const handleRemove = async (index, id) => {
    try {
      const res = await addNote(
        "Remove Hobby",
        MyAPIs.Resume().deleteResumeHobby(id)
      );
      const copy = _.cloneDeep(input);

      copy.splice(index, 1);
      handleResumeDataChange({ hobbies: copy });
    } catch (error) {
      console.log(error);
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
          <Stack
            direction={"row"}
            gap={"1px"}
            justifyContent={"flex-end"}
          ></Stack>
        </Stack>
      </Paper>
      <Divider />
      <Stack gap={3} padding={5} paddingTop={2}>
        <Stack direction={"row"} gap={1} alignItems={"flex-end"}>
          <Input
            sx={{ width: "100%" }}
            value={hobby}
            label={"Hobbies"}
            defaultOptions={hobbies}
            isAutoComplete={true}
            optionPlacement="top"
            onChange={(e) => setHobby(e.target.value)}
            onSelect={(value) => handleAddHobby(value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => handleAddHobby(null, false)}
          >
            Add
          </Button>
        </Stack>
        <Stack gap={1}>
          {input.map((hb, index) => {
            return (
              <Chip
                key={index}
                label={hb.name}
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
