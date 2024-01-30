// GlobalStyle.jsx 글로벌 스타일 설정

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans"
    line-height: 1.5;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 600
  }
  





`;

export default GlobalStyle;