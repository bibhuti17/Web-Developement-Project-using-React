import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

html, body, #root {
height: 100%;
}

body {
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
background-color: #0f172a;
color: #f9fafb;
}

button {
font-family: inherit;
}
`;

export default GlobalStyle;