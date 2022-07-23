import React from "react";
import useSound from "use-sound";
import catSoundSFX4 from "../assets/audio/cat/cat4.mp3";
import styled from "styled-components";
import { motion } from "framer-motion";

//img
import lofiCat from "../assets/img/cat.png";

interface IcatProps {}

/* Cat */
// gif로 변경.
const LoFiCatContainer = styled(motion.img)`
    position: absolute;
    width: 9.8%;
    bottom: 19.4%;
    left: 27.4%;
    opacity: 1;

    border-radius: 13px;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    :hover {
        cursor: pointer;
    }
`;

const LoFiCat = (catFrameRef: any) => {
    const [playbackRate, setPlaybackRate] = React.useState(0.75);
    const [c1] = useSound(catSoundSFX4, {
        playbackRate,
        volume: 1,
    });
    const cuteCat = () => {
        setPlaybackRate(playbackRate + 0.1);
        c1();
    };

    return (
        <LoFiCatContainer
            drag
            dragConstraints={catFrameRef}
            src={lofiCat}
            onClick={cuteCat}
        ></LoFiCatContainer>
    );
};

export default LoFiCat;
