import { defaultFileAnimation, hoverAnimation } from "../components/animation";
import styled from "styled-components";
import fileImg from "../assets/img/file.gif";
import lpPlayerGif from "../assets/img/lp.gif";
import { motion } from "framer-motion";

/* 여기서부터 File, LP판 Components */
export const FileImg = styled.img.attrs({ src: fileImg })`
    position: absolute;
    width: 6.3%;
    height: 12%;
    top: 14%;
    left: 22%;

    //prevent drag
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;

    //#1. hover했을 때 좌우 흔들리는 애니메이션 추가하기!!
    transition: 0.2s ease-in-out;

    animation: ${defaultFileAnimation} infinite 10s;
    filter: drop-shadow(3px 3px 7px rgba(243, 81, 81, 1));
    :hover {
        animation: ${hoverAnimation} infinite 2.5s;
        cursor: pointer;
        filter: drop-shadow(10px 10px 0px rgba(243, 81, 81, 1));
    }
`;

export const FileContainer = styled(motion.div)`
    position: absolute;
    top: 14.2%;
    left: 30.5%;
`;

export const FileBoard = styled.ul`
    z-index: 4;
    position: relative;
    top: 0px;
    left: 0px;
    width: auto;

    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);

    backdrop-filter: blur(3px);
    border-radius: 5px;
    padding: 10px;
    min-width: 110px;
    min-height: 120px;
    //transition: 0.2s ease-in-out;

    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(232, 19, 169, 0.75);
        border-radius: 5px 0px 0px 5px;
        box-shadow: 0px 0px 5px black;
    }
`;

//LP Board & Queue
//보이는 PlayerImg & displayToggleHander내장.
export const LpPlayerInteractive = styled.img.attrs({ src: lpPlayerGif })`
    position: absolute;
    padding: 1% 0px;
    bottom: 28.3%;
    right: 23%;
    //filter: drop-shadow(0 0 10px bisque);

    width: 14.8%;
    border-radius: 30%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;

    :hover {
        cursor: pointer;
    }
`;

export const SoundWave = styled(motion.img)`
    position: absolute;
    bottom: 46.5%;
    right: 20.5%;

    //prevent Drag Event
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
`;

//Droppable 담당.
export const LpPlayerDrop = styled.div`
    position: absolute;
    padding: 1% 0px;
    bottom: 29.5%;
    right: 22.5%;
    height: 12.5%;
    width: 15.8%;
    border-radius: 30%;
`;

//LpPlayer.
export const LpPlayerContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 32%;
    right: 27%;
`;
