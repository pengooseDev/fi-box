import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`

body{
    overflow-y: hidden;
    background: linear-gradient(30deg, #29046D, #2F0557);
    display: flex;
    justify-content: center;
    background: #180727;
    font-family: 'Source Sans Pro', sans-serif;
}

//   Reset CSS
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}


body::-webkit-scrollbar {
    height: 15px;
}
body::-webkit-scrollbar-track {
    background: rgba(55,55,55,0.3);
}
body::-webkit-scrollbar-thumb {
    background: rgba(232,19,169,0.65);
    border-radius: 5px;
    box-shadow: 0px 0px 5px black;
}

/* CSS */


input[type="range"]:focus {
	outline: none;
}




`;

root.render(
    <RecoilRoot>
        <GlobalStyle />
        <App />
    </RecoilRoot>
);
