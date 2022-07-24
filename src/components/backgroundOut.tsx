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

/*
2
    position: absolute;
    z-index: -1;
    top: 10%;
    right: 20%;
    width: 35%;


    3
    position: absolute;
    z-index: -1;
    top: 3%;
    right: 19%;
    width: 40%;
    transform: rotateZ(15deg);

    4
    position: absolute;
    z-index: -1;
    top: 0%;
    right: 29%;
    width: 20%;
    transform: rotateZ(275deg);


    **5
    position: absolute;
    z-index: -1;
    top: -10%;
    right: 29%;
    width: 25%;
    transform: rotateZ(102deg) rotateX(180deg);

    ***9
    
    position: absolute;
    z-index: -1;
    top: 2%;
    right: 19%;
    width: 36%;
    transform: rotateZ(12deg);

    *10
    
    position: absolute;
    z-index: -1;
    top: 2%;
    right: 20%;
    width: 36%;
    transform: rotateZ(12deg);
*/
