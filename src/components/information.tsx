import styled from "styled-components";
import { motion } from "framer-motion";
import pointerImg from "../assets/img/pointerDefault.png";
import pointerCur from "../assets/img/pointerDefault.cur";

export const InfoDisplayVar = {
    from: { opacity: 0, rotateZ: "30deg" },
    to: { opacity: 1, rotateZ: "0deg" },
    exit: { opacity: 0, rotateZ: "-30deg", transition: { duration: 0.2 } },
};

export const InfoDisplay = styled(motion.img)`
    position: fixed;
    width: 75%;
    border-radius: 10px;
    top: 17%;
    left: 15%;
    z-index: 100;
    :hover {
        cursor: url(${pointerImg}) 6 6, url(${pointerCur}) 6 6, auto;
    }
`;

export const InfoToggle = styled(motion.img)`
    height: 50px;
    position: absolute;
    z-index: 100;
    bottom: 31.5px;
    right: 3%;
    margin-right: 85px;
    margin-bottom: 9px;
    border-radius: 60px 60px 20px 20px;
    transition: 0.2s ease-in-out;
    :hover {
        cursor: url(${pointerImg}) 6 6, url(${pointerCur}) 6 6, auto;
    }
`;
