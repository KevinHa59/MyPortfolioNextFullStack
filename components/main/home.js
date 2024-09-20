import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { LogoFull } from "../../icons/logo";

export default function Home() {
  return (
    <Stack width="100%" height="100%" alignItems={"center"}>
      <Stack
        gap={5}
        width="clamp(500px, 100vw, 1280px)"
        height="100%"
        alignItems={"center"}
        padding={4}
      >
        <Stack height={"30vh"}>
          <LogoFull
            sx={{
              width: "clamp(200px, 30vw, 600px)",
              height: "100%",
            }}
          />
        </Stack>
        <Typography variant="h4" fontWeight="bold" textAlign={"center"}>
          Your Story - Your Portfolio - Your Way.
        </Typography>
        <Typography
          variant="h6"
          fontWeight={"200"}
          sx={{ lineHeight: "30px" }}
          textAlign={"center"}
        >
          {`Create your personalized portfolio with ease! Our platform allows
            you to showcase your skills, experience, and achievements by simply
            entering your information. Whether you're a professional, student,
            or freelancer, our intuitive tool helps you build a standout
            portfolio to share with potential employers, clients, or peers—no
            coding required!`}
        </Typography>
        <Button className="highlight" sx={{ width: "max-content" }}>
          Build Your Own Now
        </Button>
      </Stack>
    </Stack>
  );
}
