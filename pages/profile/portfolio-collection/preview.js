import {
  Button,
  Chip,
  ClickAwayListener,
  Divider,
  Fade,
  Grid,
  IconButton,
  Paper,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAPIs from "../../api-functions/MyAPIs";
import {
  Facebook,
  GitHub,
  Instagram,
  Language,
  LinkedIn,
  Twitter,
  Menu as MenuIcon,
  Clear,
  ArrowRight,
  NavigateNext,
  Download,
} from "@mui/icons-material";
import LabelText from "./components/label-text";
import { FrontEndIcon } from "../../../icons/front-end";
import { BackEndIcon } from "../../../icons/back-end";
import { DatabaseIcon } from "../../../icons/database";
import { VersionControlIcon } from "../../../icons/version-control";
import { ProcessIcon } from "../../../icons/process";
import { ServerClusterIcon } from "../../../icons/server-cluster";
import { CodeReviewIcon } from "../../../icons/code-review";
import { WindowsIcon } from "../../../icons/windows";
import { EmailIcon } from "../../../icons/email";

const color_palette = {
  background: "#0d1b2a",
  subBackground: "#102336",
  text: "#edf2f4",
  link: "#ef233c",
  button: "#d90429",
};

const styles = {
  width: { xs: "100%", lg: "1280px" },
  textTitle: "clamp(17px, 1.8vw, 22px)",
  textDetail: "clamp(17px, 1.3vw, 18px)",
};

const menu = ["About", "Skills", "Educations", "Projects", "Experience"];

let userData = {
  id: "6688542a94275f68c205f565",
  userID: "667dc24635815703bb937c91",
  title: "Web Development",
  summary:
    "I am a Full Stack Developer with a strong foundation in building dynamic and scalable web applications. My expertise includes Next.js for frontend development, Node.js and Azure Function App for backend services, and both SQL Server and NoSQL databases like MongoDB for data management. I am passionate about creating user-friendly systems that streamline processes and enhance productivity. With a focus on delivering high-quality, robust solutions, I enjoy turning complex challenges into efficient, effective software that meets the needs of both users and businesses.",
  workExperience: [
    {
      id: "66b0e25f2ce684ecdb4f2455",
      resumeID: "6688542a94275f68c205f565",
      jobTitle: "Web Developer",
      companyName: "Phase Ortho",
      location: "2501 Stanley Gault Pkwy, Louisville, KY 40223",
      startDate: "2022-01-01T00:00:00.000Z",
      endDate: null,
      responsibilities:
        "Developed and maintained a client portal system using Next.js and SQL Server, enabling front desk staff to efficiently enter patient information and aligner specifications based on doctors' orders.\nImplemented a production management system for tracking the progress of teeth aligners from station to station, ensuring seamless workflow and data accuracy in the manufacturing process.\nCollaborated closely with cross-functional teams, including doctors and production workers, to understand requirements and deliver software solutions that enhance operational efficiency.\nOptimized database performance and query handling in SQL Server, resulting in faster data retrieval and improved system responsiveness.\nIntegrated Azure Function App into the backend architecture, providing scalable and reliable processing of patient and aligner data.\nDesigned intuitive user interfaces using MUI and Next.js, improving user experience for both front desk staff and production workers.\nEnsured data integrity and compliance with industry standards in handling patient and medical data within the portal and production systems.",
    },
  ],
  education: [
    {
      id: "66ad3d0e78a75a34e073eb99",
      resumeID: "6688542a94275f68c205f565",
      degree: "Master",
      schoolName: "Campbellsville University",
      location: "1 University Dr, Campbellsville, KY 42718-2799",
      startDate: "2025-01-06T00:00:00.000Z",
      endDate: "2026-08-25T00:00:00.000Z",
      fieldOfStudy: "Computer Science",
      gpa: null,
    },
    {
      id: "668c163d3c190b4d1991714c",
      resumeID: "6688542a94275f68c205f565",
      degree: "Bachelor",
      schoolName: "University of Houston - Downtown",
      location: "1 Main St, Houston, TX 77002-1014",
      startDate: "2020-01-01T00:00:00.000Z",
      endDate: "2021-12-25T00:00:00.000Z",
      fieldOfStudy: "Computer Science",
      gpa: 3.9,
    },
    {
      id: "668c1c5d3c190b4d19917163",
      resumeID: "6688542a94275f68c205f565",
      degree: "Associate",
      schoolName: "Houston Community College Central",
      location: "1300 Holman, Houston, TX 77004",
      startDate: "2016-01-01T00:00:00.000Z",
      endDate: "2019-12-25T00:00:00.000Z",
      fieldOfStudy: "Computer Science",
      gpa: 3.25,
    },
  ],
  skills: [
    {
      id: "668c4baf4fe73d831f3ef15c",
      resumeID: "6688542a94275f68c205f565",
      name: "React.js",
      group: "Front End",
    },
    {
      id: "668c4baf4fe73d831f3ef15b",
      resumeID: "6688542a94275f68c205f565",
      name: "Web Development",
      group: "Front End",
    },
    {
      id: "668c4bcf4fe73d831f3ef15f",
      resumeID: "6688542a94275f68c205f565",
      name: "Next.js",
      group: "Front End",
    },
    {
      id: "66b0fabf1fd114c59a6e3247",
      resumeID: "6688542a94275f68c205f565",
      name: "SQL",
      group: "Database",
    },
    {
      id: "66b0fae11fd114c59a6e324a",
      resumeID: "6688542a94275f68c205f565",
      name: "NoSQL",
      group: "Database",
    },
    {
      id: "66b0fb1a1fd114c59a6e324d",
      resumeID: "6688542a94275f68c205f565",
      name: "HTML5",
      group: "Front End",
    },
    {
      id: "66b0fba71fd114c59a6e3254",
      resumeID: "6688542a94275f68c205f565",
      name: "MongoDB",
      group: "Database",
    },
    {
      id: "66b0fb701fd114c59a6e3250",
      resumeID: "6688542a94275f68c205f565",
      name: "CSS3",
      group: "Front End",
    },
    {
      id: "66b0fb911fd114c59a6e3252",
      resumeID: "6688542a94275f68c205f565",
      name: "Javascript",
      group: "Front End",
    },
    {
      id: "66b11d7a74a882a2c8223755",
      resumeID: "6688542a94275f68c205f565",
      name: "Node.js",
      group: "Back End",
    },
    {
      id: "66b11e4074a882a2c8223758",
      resumeID: "6688542a94275f68c205f565",
      name: "Git",
      group: "Version Control",
    },
    {
      id: "66b1352674a882a2c822376d",
      resumeID: "6688542a94275f68c205f565",
      name: "Azure Function App",
      group: "Back End",
    },
    {
      id: "66b135d074a882a2c822376f",
      resumeID: "6688542a94275f68c205f565",
      name: "Spring Boot",
      group: "Back End",
    },
    {
      id: "66b6b5830452dc7ca507cf5f",
      resumeID: "6688542a94275f68c205f565",
      name: "Redux",
      group: "Front End",
    },
    {
      id: "66b6b5990452dc7ca507cf60",
      resumeID: "6688542a94275f68c205f565",
      name: "Axios",
      group: "Front End",
    },
    {
      id: "66b6b5bb0452dc7ca507cf61",
      resumeID: "6688542a94275f68c205f565",
      name: "Material UI",
      group: "Front End",
    },
    {
      id: "66b6b5d10452dc7ca507cf62",
      resumeID: "6688542a94275f68c205f565",
      name: "Express.js",
      group: "Back End",
    },
    {
      id: "66b6b5e30452dc7ca507cf63",
      resumeID: "6688542a94275f68c205f565",
      name: "REST",
      group: "Web Services",
    },
    {
      id: "66b6b5ee0452dc7ca507cf64",
      resumeID: "6688542a94275f68c205f565",
      name: "REST API",
      group: "Web Services",
    },
    {
      id: "66b6b6190452dc7ca507cf65",
      resumeID: "6688542a94275f68c205f565",
      name: "Agile",
      group: "SDLC",
    },
    {
      id: "66b6b6330452dc7ca507cf66",
      resumeID: "6688542a94275f68c205f565",
      name: "Visual Studio Code",
      group: "IDE",
    },
    {
      id: "66b6b6580452dc7ca507cf67",
      resumeID: "6688542a94275f68c205f565",
      name: "Microsoft SQL Server",
      group: "IDE",
    },
    {
      id: "66b6b66e0452dc7ca507cf68",
      resumeID: "6688542a94275f68c205f565",
      name: "Workbench",
      group: "IDE",
    },
    {
      id: "66b6b67c0452dc7ca507cf69",
      resumeID: "6688542a94275f68c205f565",
      name: "Windows",
      group: "OS",
    },
  ],
  certifications: [],
  projects: [
    {
      id: "668c6addc1a30c3947d1051a",
      resumeID: "6688542a94275f68c205f565",
      title: "School Management Project",
      role: "Team Leader",
      description:
        "Collaborated with a group of 5 to the design and stimulate application’s UI, functions, database, and \nreport for a desktop application delivering University services where professors and students \nmanage their courses.",
      technologies: [
        "Java",
        "Spring Boot",
        "React JS",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Redux",
        "MySQL",
        "GIT",
      ],
      achievements: "Full Stack development",
    },
  ],
  awards: [],
  volunteerExperience: [],
  languages: [
    {
      id: "668d5f40cde0082e3c8a4b17",
      resumeID: "6688542a94275f68c205f565",
      language: "Vietnamese",
      proficiencyLevel: "Native",
    },
    {
      id: "668d6000cde0082e3c8a4b1d",
      resumeID: "6688542a94275f68c205f565",
      language: "English",
      proficiencyLevel: "Advanced",
    },
  ],
  hobbies: [
    {
      id: "668d7015cde0082e3c8a4b2f",
      resumeID: "6688542a94275f68c205f565",
      name: "Listening to music",
    },
    {
      id: "668d7015cde0082e3c8a4b30",
      resumeID: "6688542a94275f68c205f565",
      name: "Watching movies",
    },
  ],
  user: {
    id: "667dc24635815703bb937c91",
    email: "haquoctong59@gmail.com",
    firstName: "Tong",
    lastName: "Ha",
    dob: "1990-02-18T00:00:00.000Z",
    address: "4400 Hunsinger Lane",
    city: "Louisville",
    state: "Kentucky",
    country: "us",
    zipCode: "40220",
    cellPhone: "3462191755",
    homePhone: "3462191755",
    linkedIn: "https://www.linkedin.com/in/tong-ha/",
    github: "https://github.com/KevinHa59",
    twitter: null,
    facebook: null,
    instagram: null,
    portfolio: null,
    password: "$2b$05$C7Ru5bfDqsaWyzscVCq2NO7CtN1Kn4H1W.5/nj0ZbnUxO4nw6KR1G",
    userTypeID: "667dc0f435815703bb937c8b",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcXVvY3Rvbmc1OUBnbWFpbC5jb20iLCJpYXQiOjE3MjA5MjYwMTJ9.yRsDofgtBGlBIJwgAUGQlv3DWy0er2KIQIlX-_MPCLo",
  },
};

export default function Index() {
  const [data, setData] = useState({});

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const id = "6688542a94275f68c205f565";
    const res = await MyAPIs.Resume().getResumeByID(id);
    userData = res.data;
    const sections = Object.entries(userData.resumeSections)
      .filter((section) => section[1] === true)
      .map((section) => section[0]);
    setData(res.data);
  };
  return (
    <Stack
      sx={{
        background: color_palette.background,
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
      alignItems={"center"}
    >
      <Menu />
      <Introduction />
      <SectionDivider />
      <Skills />
      <SectionDivider isReverse={true} />
      <Educations />
      <Projects />
      <SectionDivider />
      <WorkExperience />
      <SectionDivider isReverse={true} />
      <Contact />
    </Stack>
  );
}

function Menu() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      position={"fixed"}
      top={0}
      paddingX={2}
      zIndex={10}
      height={"60px"}
    >
      <Stack>
        <Typography variant="h5" fontWeight={"bold"} fontStyle={"italic"}>
          Portfolio
        </Typography>
      </Stack>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Stack>
          <Fade in={!isMobile ? true : isOpen}>
            <Stack
              position={isMobile ? "absolute" : "unset"}
              left={0}
              zIndex={5}
              padding={isMobile && 2}
              top={"100%"}
              width={isMobile ? "100%" : "max-content"}
              direction={isMobile ? "column" : "row"}
              alignItems={"flex-end"}
              sx={{
                boxShadow: isMobile && "5px 5px 10px rgba(0,0,0,0.5)",
                background: isMobile && color_palette.background,
              }}
            >
              <Divider flexItem />
              {menu.map((m, index) => {
                return (
                  <Slide
                    direction="down"
                    in={true}
                    style={{ transitionDelay: 100 * index }}
                    key={index}
                  >
                    <Button
                      fullWidth={isMobile}
                      className="br0"
                      sx={{ paddingTop: "25px" }}
                    >
                      {m}
                    </Button>
                  </Slide>
                );
              })}

              <Button
                fullWidth={isMobile}
                variant="outlined"
                sx={{ height: "max-content" }}
              >
                Contact
              </Button>
            </Stack>
          </Fade>
          {isMobile &&
            (isOpen ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <Clear />
              </IconButton>
            ) : (
              <IconButton
                sx={{ zIndex: 200 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                <MenuIcon />
              </IconButton>
            ))}
        </Stack>
      </ClickAwayListener>
    </Stack>
  );
}

const socials = [
  { name: "linkedIn", Icon: LinkedIn },
  { name: "github", Icon: GitHub },
  { name: "twitter", Icon: Twitter },
  { name: "facebook", Icon: Facebook },
  { name: "instagram", Icon: Instagram },
  { name: "portfolio", Icon: Language },
];
function Introduction() {
  return (
    <Stack
      width={"100%"}
      alignItems="center"
      sx={{ background: color_palette.subBackground }}
      position={"relative"}
    >
      <LandingBackground />
      <Stack
        position={"sticky"}
        top={0}
        left={0}
        height={"60px"}
        width={"100%"}
        sx={{
          background: color_palette.background,
          zIndex: 5,
        }}
      />
      <Stack
        width={styles.width}
        minHeight="calc(100vh - 60px)"
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          padding={2}
          zIndex={1}
          sx={{ flex: 1 }}
        >
          <Stack gap={{ xs: 1, sm: 4 }}>
            <Typography
              textAlign={{ xs: "center", sm: "left" }}
              fontWeight={"bold"}
              sx={{ fontSize: "clamp(25px, 2vw, 30px)" }}
            >
              Hello, I am
            </Typography>
            <Typography
              textAlign={{ xs: "center", sm: "left" }}
              fontWeight={"bold"}
              whiteSpace={"wrap"}
              sx={{
                fontSize: "clamp(60px, 8vw, 80px)",
                marginTop: "-3vw",
              }}
            >{`${userData?.user?.firstName || ""} ${
              userData?.user?.lastName || ""
            }`}</Typography>
            <Typography
              textAlign={{ xs: "center", sm: "left" }}
              fontWeight={"bold"}
              sx={{
                fontSize: "clamp(20px, 1.7vw, 30px)",
                wordSpacing: 2,
                lineHeight: 2,
              }}
            >
              {userData?.title || ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "clamp(15px, 0.8vw, 19px)",
                wordSpacing: 2,
                lineHeight: 2,
                textAlign: {
                  xs: "justify",
                  sm: "left",
                },
              }}
            >
              {userData?.summary || ""}
            </Typography>
            <Stack
              direction={"row"}
              gap={1}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {socials.map((sc, index) => {
                const link = userData?.user[sc.name] || null;
                if (link) {
                  return (
                    <IconButton
                      key={index}
                      onClick={() => window.open(link, "_blank")}
                    >
                      <sc.Icon sx={{ fontSize: "clamp(30px, 2vw, 35px)" }} />
                    </IconButton>
                  );
                }
              })}
            </Stack>
            <Stack
              direction={"row"}
              gap={1}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{ padding: 1, paddingX: 5, fontWeight: "bold" }}
              >
                Hire Me!
              </Button>
              <Button
                startIcon={<Download />}
                variant="outlined"
                sx={{ padding: 1, paddingX: 5, fontWeight: "bold" }}
              >
                My Resume
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
const Icons = {
  "Front End": FrontEndIcon,
  "Back End": BackEndIcon,
  Database: DatabaseIcon,
  "Version Control": VersionControlIcon,
  "Web Services": ServerClusterIcon,
  SDLC: ProcessIcon,
  IDE: CodeReviewIcon,
  OS: WindowsIcon,
};

function Skills() {
  const groupSkills = userData?.skills.reduce((res, cur) => {
    if (res[cur.group] === undefined) {
      res[cur.group] = [];
    }
    res[cur.group].push(cur.name);
    return res;
  }, {});
  return (
    groupSkills && (
      <Stack
        width={"100%"}
        alignItems="center"
        sx={{ background: color_palette.subBackground }}
      >
        <Stack
          position={"sticky"}
          top={0}
          zIndex={9}
          height={"60px"}
          width={"100%"}
          sx={{ background: color_palette.subBackground }}
        />
        <Stack gap={4} width={styles.width} padding={2}>
          <Typography
            fontWeight={"bold"}
            variant="h5"
            textAlign={"center"}
            sx={{ width: "100%" }}
          >
            Skills
          </Typography>
          <Grid container spacing={4}>
            {Object.keys(groupSkills)?.map((group, index) => {
              const groupName = group;
              const Icon = Icons[groupName];
              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Paper
                    // variant="outlined"
                    className="flat"
                    sx={{
                      padding: 4,
                      height: "100%",
                      background: `linear-gradient(-225deg, 
                        ${color_palette.background} 12px, ${color_palette.background} 14px, 
                        transparent 14px, transparent 18px, 
                        ${color_palette.background} 18px, ${color_palette.background} 24px, 
                        transparent 24px, transparent 32px, 
                        ${color_palette.background} 32px, ${color_palette.background} 40px, 
                        transparent 40px, transparent 50px, 
                        ${color_palette.background} 50px, ${color_palette.background} 60px, 
                        transparent 60px, transparent 70px, 
                        ${color_palette.background} 70px, ${color_palette.background})`,
                    }}
                  >
                    <Stack
                      width={"100%"}
                      height={"max-content"}
                      alignItems={"center"}
                    >
                      {Icon && (
                        <Icon sx={{ fontSize: "clamp(150px, 15vw, 200px)" }} />
                      )}
                    </Stack>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign={"center"}
                    >
                      {groupName}
                    </Typography>
                    <Stack
                      direction={"row"}
                      gap={2}
                      flexWrap={"wrap"}
                      justifyContent={"center"}
                    >
                      {groupSkills[group].map((skill, _index) => {
                        return (
                          <Chip
                            key={_index}
                            label={skill}
                            sx={{
                              fontSize: styles.textDetail,
                              fontWeight: "200",
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
    )
  );
}

function Educations() {
  return (
    <Stack width={"100%"} alignItems="center">
      <Stack
        position={"sticky"}
        top={0}
        zIndex={9}
        height={"60px"}
        width={"100%"}
        sx={{
          background: color_palette.background,
        }}
      />
      <Stack gap={4} width={styles.width} padding={2}>
        <Typography
          fontWeight={"bold"}
          variant="h5"
          textAlign={"center"}
          sx={{ width: "100%" }}
        >
          Educations
        </Typography>
        <Stack direction={"row"} width={"100%"} gap={2}>
          <Stack minWidth={"100%"} alignItems={"center"}>
            {userData?.education.map((edu, index) => {
              return (
                <Stack width={"100%"} direction={"row"} key={index} gap={1}>
                  <Stack
                    minWidth={{ xs: "30%", sm: "40%" }}
                    paddingY={6}
                    alignItems={"flex-end"}
                    justifyContent={"space-between"}
                  >
                    <Chip
                      label={`${edu.endDate?.split("T")[0] || "CURRENT"}`}
                      sx={{ width: "max-content", fontSize: styles.textDetail }}
                    />
                    <Chip
                      label={`${edu.startDate.split("T")[0]}`}
                      sx={{ width: "max-content", fontSize: styles.textDetail }}
                    />
                  </Stack>
                  <Divider orientation="vertical" />
                  <Stack width={{ xs: "70%", sm: "60%" }} gap={3} paddingY={6}>
                    <Stack gap={1}>
                      <Stack direction={"row"} alignItems={"center"}>
                        <Typography
                          sx={{ fontSize: styles.textTitle }}
                          fontWeight={"bold"}
                        >
                          {edu.schoolName}
                        </Typography>
                      </Stack>

                      <Typography variant="body1" fontWeight={100}>
                        {edu.location}
                      </Typography>
                    </Stack>
                    <Stack paddingLeft={2}>
                      <LabelText
                        startIcon={<NavigateNext />}
                        label_sx={{ minWidth: "100px" }}
                        label={"Degree"}
                        sx={{ fontSize: styles.textDetail }}
                      >
                        {edu.degree}
                      </LabelText>
                      <LabelText
                        startIcon={<NavigateNext />}
                        label_sx={{ minWidth: "100px" }}
                        label={"Field"}
                      >
                        {edu.fieldOfStudy}
                      </LabelText>
                      <LabelText
                        startIcon={<NavigateNext />}
                        label_sx={{ minWidth: "100px" }}
                        label={"GPA"}
                      >
                        {edu.gpa || ""}
                      </LabelText>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Projects() {
  const projects = userData?.projects || [];
  return (
    <Stack width={"100%"} alignItems="center" position={"relative"}>
      <Stack
        position={"sticky"}
        top={0}
        zIndex={9}
        height={"60px"}
        width={"100%"}
        sx={{
          background: color_palette.background,
        }}
      />
      <Stack gap={4} width={styles.width} padding={2}>
        <Typography
          fontWeight={"bold"}
          variant="h5"
          textAlign={"center"}
          sx={{ width: "100%" }}
        >
          Projects
        </Typography>
        <Grid container>
          {projects.map((project, index) => {
            return (
              <Grid item key={index} xs={12}>
                <Paper
                  variant="outlined"
                  sx={{ padding: 4, background: color_palette.subBackground }}
                >
                  <Stack gap={2}>
                    <Stack gap={2}>
                      <Typography variant="h5">{project.title}</Typography>
                      <Typography>{project.description}</Typography>
                    </Stack>
                    <Stack>
                      <LabelText
                        label_sx={{ minWidth: "100px" }}
                        label={"Role"}
                        startIcon={<ArrowRight />}
                      >
                        {project.role}
                      </LabelText>
                      <LabelText
                        label_sx={{ minWidth: "100px" }}
                        label={"Achievements"}
                        startIcon={<ArrowRight />}
                      >
                        {project.achievements}
                      </LabelText>
                      <LabelText
                        label_sx={{ minWidth: "100px" }}
                        label={"Utilities"}
                        startIcon={<ArrowRight />}
                        sx={{ alignItems: "flex-start" }}
                      >
                        {project.technologies.join(", ")}
                      </LabelText>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
}

function WorkExperience() {
  const works = userData?.workExperience || [];
  return (
    <Stack
      width={"100%"}
      alignItems="center"
      sx={{
        background: color_palette.subBackground,
      }}
    >
      <Stack
        position={"sticky"}
        top={0}
        zIndex={9}
        height={"60px"}
        width={"100%"}
        sx={{
          background: color_palette.subBackground,
        }}
      />
      <Stack gap={4} width={styles.width} padding={2}>
        <Typography
          fontWeight={"bold"}
          variant="h5"
          textAlign={"center"}
          sx={{ width: "100%" }}
        >
          Work Experiences
        </Typography>
        <Stack>
          {works?.map((work, index) => {
            return (
              <Stack key={index} direction={"row"} width={"100%"} gap={2}>
                <Paper
                  className="br0 flat"
                  variant="outlined"
                  sx={{ width: "100%", background: color_palette.background }}
                >
                  <Stack gap={1} padding={2}>
                    <Stack
                      width={"100%"}
                      direction={{ xs: "column", sm: "row" }}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {work.companyName}
                      </Typography>
                      <Stack direction={"row"} gap={5}>
                        <LabelText label={"From"}>
                          {work.startDate.split("T")[0]}
                        </LabelText>
                        <LabelText label={"To"}>
                          {work.endDate?.split("T")[0] || "CURRENT"}
                        </LabelText>
                      </Stack>
                    </Stack>
                    <Typography
                      textAlign={{ xs: "center", sm: "left" }}
                      sx={{
                        fontSize: styles.textDetail,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {work.location}
                    </Typography>
                    <Divider />
                    <Stack paddingLeft={2} gap={1}>
                      <LabelText
                        startIcon={<ArrowRight />}
                        label_sx={{ minWidth: "120px" }}
                        label={"Role"}
                      >
                        {work.jobTitle}
                      </LabelText>

                      <LabelText
                        startIcon={<ArrowRight />}
                        label_sx={{ minWidth: "120px" }}
                        sx={{
                          alignItems: "flex-start",
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                        detail_sx={{
                          fontWeight: "400",
                        }}
                        label={"Responsibilities"}
                      >
                        <Stack gap={1}>
                          {work.responsibilities
                            .split("\n")
                            .map((detail, index) => {
                              return (
                                <div key={index}>
                                  <li>{detail}</li>
                                </div>
                              );
                            })}
                        </Stack>
                      </LabelText>
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

function Contact() {
  return (
    <Stack width={"100%"} alignItems={"center"}>
      <Stack
        gap={4}
        width={styles.width}
        padding={2}
        alignItems={"center"}
        height={"100%"}
        direction={"row"}
      >
        <Stack width={"100%"} alignItems={"center"} direction={"row"} gap={2}>
          <EmailIcon sx={{ fontSize: "10vw" }} />
          <Stack gap={2}>
            <LabelText label={"Email: "}>{userData?.user?.email}</LabelText>
            <LabelText label={"Phone: "}>{userData?.user?.cellPhone}</LabelText>
            <Stack direction={"row"} gap={1}>
              {socials.map((sc, index) => {
                const link = userData?.user[sc.name] || null;
                if (link) {
                  return (
                    <IconButton
                      key={index}
                      onClick={() => window.open(link, "_blank")}
                    >
                      <sc.Icon sx={{ fontSize: "clamp(30px, 2vw, 35px)" }} />
                    </IconButton>
                  );
                }
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function SectionDivider({ isReverse = false }) {
  const mainColor = isReverse
    ? color_palette.background
    : color_palette.subBackground;
  const subColor = isReverse
    ? color_palette.subBackground
    : color_palette.background;
  return (
    <Stack
      sx={{
        width: "100%",
        height: "20px",
        backgroundImage: `repeating-linear-gradient(45deg, ${mainColor} 25%, transparent 25%, transparent 75%, ${mainColor} 75%, ${mainColor}), repeating-linear-gradient(45deg, ${mainColor} 25%, ${subColor} 25%, ${subColor} 75%, ${mainColor} 75%, ${mainColor})`,
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px",
      }}
    />
  );
}
function LandingBackground() {
  const mainColor = color_palette.background;
  const subColor = color_palette.subBackground;
  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient(45deg, ${mainColor} 25%, transparent 25%, transparent 75%, ${mainColor} 75%, ${mainColor}), repeating-linear-gradient(45deg, ${mainColor} 25%, ${subColor} 25%, ${subColor} 75%, ${mainColor} 75%, ${mainColor})`,
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to bottom right, transparent 0%, ${mainColor} 50%)`,
        }}
      />
    </>
  );
}
