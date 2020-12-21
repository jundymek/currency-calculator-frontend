import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

const StyledHeader = styled.header`
  margin-top: 100px;
  position: relative;
  @media (min-width: 640px) {
    margin-bottom: 6rem;
  }
`;

const StyledLocalAtmIcon = styled(LocalAtmIcon)`
  position: absolute;
  top: -6px;
  right: -25px;
  color: #f50057;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledLocalAtmIcon />
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
