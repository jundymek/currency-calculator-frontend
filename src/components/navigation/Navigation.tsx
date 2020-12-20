import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Page } from "../../App";
import styled from "styled-components";

interface NavigationProps {
  setRenderPage: React.Dispatch<React.SetStateAction<Page>>;
}

const NavigationWrapper = styled(BottomNavigation)`
  && {
    position: fixed;
    top: 0;
    width: 100%;
  }
`;

const Navigation = React.memo<NavigationProps>(({ setRenderPage }) => {
  const [value, setValue] = React.useState(Page.Calc);

  return (
    <NavigationWrapper
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setRenderPage(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Calculator" icon={<AttachMoneyIcon />} value={Page.Calc} />
      <BottomNavigationAction label="History" icon={<RestoreIcon />} value={Page.History} />
    </NavigationWrapper>
  );
});

export default Navigation;
