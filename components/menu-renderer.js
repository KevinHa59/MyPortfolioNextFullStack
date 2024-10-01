import { ArrowDropDown } from "@mui/icons-material";
import { Button, Collapse, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetail = ({ menuItem, onRoute, activeRoute, onOpen }) => {
  const [open, setOpen] = useState(false);
  const isSubMenu = menuItem.sub !== undefined;

  useEffect(() => {
    if (activeRoute === menuItem.param) {
      onOpen && onOpen(true);
    }
  }, [menuItem]);

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
          paddingY: 1.5,
        }}
        onClick={() =>
          isSubMenu
            ? setOpen((prev) => !prev)
            : onRoute(menuItem.param, menuItem.path)
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
                  onOpen={setOpen}
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

  const handleRoute = (section, path) => {
    if (section) {
      router.push({
        pathname: router.pathname,
        query: {
          section: section,
        },
      });
    } else if (path) {
      router.push(path);
    }
  };

  return (
    <Stack>
      {value.map((item, index) => {
        if (item.visible === undefined || item.visible === true) {
          return (
            <MenuDetail
              key={index}
              menuItem={item}
              onRoute={handleRoute}
              activeRoute={router.query.section || ""}
            />
          );
        }
      })}
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
