// GlobalStyle.jsx 글로벌 스타일 설정

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
  
`;

export default GlobalStyle;