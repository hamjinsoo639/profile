import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${Reset}

@font-face {
  font-family: 'Noto Sans KR', sans-serif !important;
  font-style: normal;
  font-weight: 300 700;
  src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap') format('woff2');
}

:root {
  font-family: 'Noto Sans KR', sans-serif !important;
  height: 100%;
}

* {
  font-family: 'Noto Sans KR', sans-serif !important;
  box-sizing: border-box;
  line-height: inherit;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

body {
  font-family: 'Noto Sans KR', sans-serif !important;
  max-width: 960px;
  min-width: 280px;
  margin: 0 auto;
  color: #4d5058;
  line-height: 1.5;
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background: #f2f2f2;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #2e427b;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

a {
  text-decoration: none;
  color: inherit;
}
button {
  font-family: 'Noto Sans KR', sans-serif !important;
  background: transparent;
  font-size: 15px;
  color: ${props => props.theme.font_color};
  border: 0 none;
  outline:none;
  cursor: pointer;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
}
ol, ul, li {
  list-style: none;
}
select, option {
  font-family: 'Noto Sans KR', sans-serif !important;
  background: transparent;
  -webkit-appearance:none; /* for chrome */
  -moz-appearance:none; /*for firefox*/
  appearance:none;
  outline: 0 none;
  // color: ${props => props.theme.font_color};
}
a, button, input {
  font-family: 'Noto Sans KR', sans-serif !important;
  appearance: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  outline:none;
  border: none;
  &:disabled {
    cursor: default;
  }
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.5;
}

ul, li {
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
}

`;

export default GlobalStyles;