import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  margin-top: 100px;
  @media (min-width: 640px) {
    margin-bottom: 6rem;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Typography variant="h4" align="center" component="h1" color="primary">
        Currency converter
      </Typography>
      <Typography variant="h5" align="center" color="secondary">
        Convert any currency
      </Typography>
    </StyledHeader>
  );
};

export default Header;
