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
  height: calc(var(--vh, 1vh) * 100);
}
* {
  font-family: 'Noto Sans KR', sans-serif !important;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  line-height: inherit;
  ::-webkit-scrollbar {
    display: none;
  }
}

body {
  font-family: 'Noto Sans KR', sans-serif !important;
  max-width: 960px;
  min-width: 280px;
  // height: calc(var(--vh, 1vh) * 100 - 70px);
  margin: 0 auto;
  color: #4d5058;
  ::-webkit-scrollbar {
    display: none;
  }
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

`;

export default GlobalStyles;