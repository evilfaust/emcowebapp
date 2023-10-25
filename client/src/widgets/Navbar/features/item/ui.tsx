import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { ItemProps } from "./types";

const StyledNavLink = styled(NavLink)`
  &.active {
    color: red;
  }
`;

export const Item: React.FC<ItemProps> = ({ label, link, value }) => {
  return (
    <li key={value}>
      <StyledNavLink to={link}>{label}</StyledNavLink>
    </li>
  );
};
