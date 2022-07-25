//import backgroundImgOut from "./assets/img/backgroundOut.png";
import styled from "styled-components";
import out from "../assets/img/9.gif";

const BackgroundOut = styled.img.attrs({ src: out })`
    position: absolute;
    z-index: -1;
    top: 2%;
    right: 19%;
    width: 36%;
    transform: rotateZ(12deg);
`;

export default BackgroundOut;
