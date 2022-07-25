import styled from "styled-components";
import { motion } from "framer-motion";

export const WelcomeOverlayToggle = styled.div`
    z-index: 2;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    :hover {
        cursor: pointer;
    }
`;

export const WelcomeOverlay = styled(motion.div)`
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
`;

export const welcomeOverlayVar = {
    from: { scale: 1 },
    to: { scale: 1 },
    exit: {
        scaleY: 0,
        transition: { when: "afterChildren", delay: 0.5, duration: 0.7 },
    },
    afterEffect: {
        transition: { delay: 1.2, duration: 0.7 },
        scaleX: 0.1,
    },
};

export const WelcomeLabel = styled(motion.div)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 45px;
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.7);

    top: 30%;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0px 0px 25px black;
    width: 100%;
    height: 33%;
`;
