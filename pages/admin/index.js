import { Button, Divider, Link, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserTypes from "../../components/admin/user-types";
import { useRouter } from "next/router";
import Users from "../../components/admin/users";

const menu_data = [
  {
    title: "User Types",
    param: "userTypes",
    Comp: <UserTypes />,
  },
  {
    title: "Users",
    param: "users",
    Comp: <Users />,
  },
];

export default function Index() {
  const router = useRouter();
  const [section, setSection] = useState(null);

  useEffect(() => {
    const _section = router.query.section;
    if (_section && _section !== section) {
      setSection(_section);
    }
  }, [router]);

  return (
    <Stack direction={"row"} height={"100vh"}>
      <Stack height={"100%"} minWidth={"300px"} sx={{ overflowY: "auto" }}>
        <Menu />
      </Stack>
      <Stack height={"100vh"} width={"100%"} sx={{ overflowY: "auto" }}>
        {menu_data.find((menu) => menu.param === section)?.Comp}
      </Stack>
    </Stack>
  );
}

function Menu() {
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
    <Stack padding={2}>
      {menu_data.map((menu, index) => {
        return (
          <Button
            key={index}
            size="small"
            sx={{ width: "max-content", padding: 0, minWidth: 0 }}
            onClick={() => handleRoute(menu.param)}
          >
            {menu.title}
          </Button>
        );
      })}
    </Stack>
  );
}
