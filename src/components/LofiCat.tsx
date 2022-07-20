import React from "react";
import useSound from "use-sound";
import lofiCatImgSrc from "../assets/img/goYangE.png";
import catSoundSFX4 from "../assets/audio/cat/cat4.mp3";
import styled from "styled-components";

/* Cat */
// gif로 변경.
const LoFiCatContainer = styled.div`
    position: absolute;
    bottom: 18%;
    left: 26.4%;
    border-radius: 100%;
    padding: 28px;
    width: 8.5%;
    height: 10%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;

    :hover {
        cursor: pointer;
    }
`;

const LoFiCat = () => {
    const [playbackRate, setPlaybackRate] = React.useState(0.75);
    const [c1] = useSound(catSoundSFX4, {
        playbackRate,
        volume: 1,
    });
    const cuteCat = () => {
        setPlaybackRate(playbackRate + 0.1);
        c1();
    };

    return <LoFiCatContainer onClick={cuteCat}></LoFiCatContainer>;
};

export default LoFiCat;
