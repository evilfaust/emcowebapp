import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import { pages } from "widgets";

import "./index.scss";

export const MobileNavigation: React.FC = () => {
  const [value, setValue] = React.useState("main");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper
      className="navigation"
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        {pages.map((page) => (
          <NavLink to={page.to} className="navlink">
            <BottomNavigationAction
              label={page.label}
              value={page.value}
              icon={page.icon}
            >
              {page.label}
            </BottomNavigationAction>
          </NavLink>
        ))}
      </BottomNavigation>
    </Paper>
  );
};
