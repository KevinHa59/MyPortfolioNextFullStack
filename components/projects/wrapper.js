import {
  ArrowDownward,
  ArrowDropDown,
  ArrowLeft,
  Folder,
  More,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const menuData = [
  {
    menu: "Components",
    subMenu: [{ title: "Notification", path: "notification" }],
  },
  {
    menu: "Item 1", // Regular item
  },
];

export default function ProjectWrapper({ children }) {
  const router = useRouter();

  const handleRoute = (path) => {
    router.push({
      pathname: `/projects/${path}`,
    });
  };
  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      {/* Left column: Menu with fixed logo and collapsible sections */}
      <Box
        sx={{
          width: "250px",

          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Fixed logo at the top */}
        <Box sx={{ height: "100px", padding: 2 }}>
          <Typography variant="h6">My Logo</Typography>
        </Box>

        {/* Scrollable menu with collapsible items (flex: 1 for remaining space) */}
        <Box sx={{ flex: 1, overflowY: "auto", padding: 0 }}>
          <Typography variant="h6" gutterBottom>
            Menu
          </Typography>

          <List sx={{ padding: 0 }}>
            {menuData.map((item, index) => (
              <CustomCollapsibleMenuItem
                key={index}
                menu={item.menu}
                subMenu={item.subMenu}
                onRoute={handleRoute}
              />
            ))}
          </List>
        </Box>
      </Box>
      <Divider orientation="vertical" />
      {/* Right column: Details */}
      <Paper sx={{ flex: 1, overflowY: "auto", padding: 2 }}>{children}</Paper>
    </Box>
  );
}

const CustomCollapsibleMenuItem = ({ menu, subMenu, onRoute }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const hasSubMenu = subMenu && subMenu.length > 0;

  return (
    <>
      <ListItem button onClick={handleToggle}>
        <ListItemIcon>{hasSubMenu ? <Folder /> : null}</ListItemIcon>
        <ListItemText primary={menu} />
        {hasSubMenu && (!open ? <ArrowLeft /> : <ArrowDropDown />)}
      </ListItem>

      {hasSubMenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subMenu.map((subItem, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                {/* Add padding to sub-items */}
                <ListItemText
                  primary={subItem.title}
                  onClick={() => onRoute(subItem.path)}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
