import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";
import {
  Button,
  Collapse,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const MenuDetail = ({ menuItem, onRoute, activeRoute }) => {
  const [open, setOpen] = useState(false);
  const isSubMenu = menuItem.sub !== undefined;

  return (
    <Stack width={"100%"}>
      <Button
        color="inherit"
        className={`${
          activeRoute === menuItem.param ? "active" : "inactive"
        } br0`}
        sx={{
          gap: 1,
          justifyContent: "space-between",
        }}
        onClick={() =>
          isSubMenu ? setOpen((prev) => !prev) : onRoute(menuItem.param)
        }
        endIcon={
          isSubMenu && (
            <ArrowDropDown
              sx={{
                transform: `rotate(${open ? 0 : 90}deg)`,
                transition: "ease 0.2s",
              }}
            />
          )
        }
      >
        <Stack
          direction={"row"}
          gap={1}
          sx={{
            color: "inherit",
            fontWeight: "inherit",
          }}
        >
          <menuItem.Icon sx={{ fontSize: "20px" }} />
          <Typography
            variant="body2"
            sx={{
              color: "inherit",
              fontWeight: "inherit",
            }}
          >
            {menuItem.title}
          </Typography>
        </Stack>
      </Button>
      {isSubMenu && (
        <Collapse in={open}>
          <Stack padding={1}>
            {menuItem.sub.map((subItem, index) => (
              <Stack key={index} paddingLeft={4}>
                <MenuDetail
                  menuItem={subItem}
                  onRoute={onRoute}
                  activeRoute={activeRoute}
                />
              </Stack>
            ))}
          </Stack>
        </Collapse>
      )}
    </Stack>
  );
};

export default function MenuRenderer({ value }) {
  const router = useRouter();

  const handleRoute = (section) => {
    router.push({
      pathname: router.pathname,
      query: {
        section: section,
      },
    });
  };

  return (
    <Stack gap={1}>
      {value.map((item, index) => (
        <MenuDetail
          key={index}
          menuItem={item}
          onRoute={handleRoute}
          activeRoute={router.query.section || ""}
        />
      ))}
    </Stack>
  );
}

export const findComponentByParam = (param, menu) => {
  // Iterate over the menu items
  for (const item of menu) {
    // Check if the param matches the current item
    if (item.param === param) {
      return item.Comp;
    }

    // If there are sub-items, search them recursively
    if (item.sub) {
      const foundComp = findComponentByParam(param, item.sub);
      if (foundComp) {
        return foundComp;
      }
    }
  }

  // Return null if no matching param is found
  return null;
};
