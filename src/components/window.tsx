import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import windowSrc from "../assets/img/window.png";
import nicoSenpaiSrc from "../assets/img/nicoSenpai.png";
import { useRecoilState } from "recoil";
import { windowDisplayState } from "../atoms";
import React from "react";
import useSound from "use-sound";
import windowClose from "../assets/audio/windowClose.mp3";
import windowOpen from "../assets/audio/windowOpen.mp3";

const WindowWrapper = styled.div`
    position: absolute;
    top: 29%;
    right: 37%;
    z-index: 1;
    width: 12%;
    height: 18%;
    transform: rotateZ(15deg);
    border-radius: 9px;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
`;

const RelativeWrapper = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
`;

const relativeWrapperVar = {
    from: { opacity: 0, x: -350, y: 120 },
    to: { opacity: 1, x: -350, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -350, y: -120, transition: { duration: 0.6 } },
};

const WindowImg = styled(motion.img)`
    transform: rotateZ(-15deg);
    position: absolute;
    z-index: 1;
    top: 2%;
    width: 200%;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
`;

const NicoSenpaiImg = styled.img.attrs({ src: nicoSenpaiSrc })`
    width: 107%;
    position: absolute;
    z-index: 3;
    transform: rotateZ(-15deg);
    top: 52%;
    left: 55%;
    border-radius: 15%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;

    filter: drop-shadow(10px 10px 5px #4444dd);
`;

const WindowDisplayToggle = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 9px;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    :hover {
        cursor: pointer;
    }
`;

const ExitComp = styled.div`
    width: 27%;
    height: 27%;
    z-index: 1;
    position: absolute;
    right: -70%;
    top: -13%;
    border-radius: 15px;
    transform: rotateZ(-15deg);
    :hover {
        cursor: pointer;
    }
`;

const NicoAnchor = styled.a`
    :hover {
        cursor: pointer;
    }
`;

const WindowContainer = () => {
    const [windowDisplay, setWindowDisplay] =
        useRecoilState(windowDisplayState);

    const [windowCloseSFX] = useSound(windowClose);
    const [windowOpenSFX] = useSound(windowOpen);
    const windowToggleHandler = () => {
        setWindowDisplay((prev) => !prev);
    };

    const exitHandler = () => {
        setWindowDisplay((prev) => !prev);
    };

    React.useEffect(() => {
        if (windowDisplay) {
            return windowOpenSFX();
        }
        return windowCloseSFX();
    }, [windowDisplay]);

    return (
        <WindowWrapper>
            <WindowDisplayToggle onClick={windowToggleHandler} />
            <AnimatePresence>
                {windowDisplay ? (
                    <RelativeWrapper
                        variants={relativeWrapperVar}
                        initial="from"
                        animate="to"
                        exit="exit"
                    >
                        <NicoAnchor
                            target="_blanck"
                            href="https://nomadcoders.co/"
                        >
                            <NicoSenpaiImg />
                        </NicoAnchor>
                        <WindowImg src={windowSrc}></WindowImg>
                        <ExitComp onClick={exitHandler} />
                    </RelativeWrapper>
                ) : null}
            </AnimatePresence>
        </WindowWrapper>
    );
};

export default WindowContainer;
