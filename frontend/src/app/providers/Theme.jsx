"use client";
import { Global } from '@emotion/react';
import { createAppTheme, createAppStylesBaseline } from '@arwes/react';

const theme = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme);

const Theme = () => {
  return <Global styles={stylesBaseline} />;
};
export default Theme;
