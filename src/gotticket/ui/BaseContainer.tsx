import React from "react";
import { Box } from "grommet";
import { useMediaQuery } from 'react-responsive';


export const breakpoints = {
  mobile: '375px',
  mobileL: '425px',
  tablet: '768px',
  tabletM: '868px',
  laptop: '1024px',
  desktop: '1366px',
};


const sizes = {
  minWidth: "343px",
  maxWidth: "1408px",
};

export const BaseContainer = (props: any) => {
  const { style } = props;
  const isLessTablet = useMediaQuery({ maxDeviceWidth: breakpoints.tablet });

  return (
    <Box
      pad={{ horizontal: isLessTablet ? "12px" : '20px' }}
      {...props}
      style={{ ...sizes, width: "100%", flex: "1 1 auto", ...style }}
    />
  );
};

export const BasePage = (props: any) => {
  const { style } = props;

  return (
    <Box
      pad="medium"
      background="background"
      border={{ size: "xsmall", color: "border" }}
      {...props}
      style={{
        borderRadius: "8px",
        overflow: 'hidden',
        ...style,
      }}
    />
  );
};
