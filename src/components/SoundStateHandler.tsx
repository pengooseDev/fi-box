import { useRecoilState, useRecoilValue } from "recoil";
import { soundState } from "../soundAtom";
import styled, { keyframes, css } from "styled-components";
import React from "react";
import { queueObject } from "./soundFunc";
import { welcomeDisplayAtom } from "../atoms";

const VolumeInput = styled.input.attrs({
    type: "range",
    orient: "vertical",
    min: 0,
    max: 1,
    step: 0.1,
})`
    -webkit-transform: rotate(270deg);
    position: absolute;
    bottom: 39.5%;
    right: 20.8%;
    width: 7%;
    height: 5px;

    border-radius: 3px;
    height: 1%;
    box-shadow: -2px 1px 7px rgba(11, 11, 11, 0.8);

    //InputRange CSS
    overflow: hidden;
    -webkit-appearance: none;
    margin: 10px 0;
    background: transparent;

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.9);
        border: solid rgba(111, 111, 111, 0.3) 1px;
        border-radius: 2px;
        cursor: pointer;
        box-shadow: -100.5vw 0 0 100vw rgba(232, 19, 169, 0.75);
    }

    ::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
        background: rgba(133, 133, 133, 0.4);
    }
`;

const PlayStateBar = styled.div`
    position: absolute;
    bottom: 28.6%;
    right: 39.35%; //leftSide
    //right: 25.35%; //rightSide
    display: flex;
`;

const barAnimation = keyframes`
    0%{
        transform: scale(1,1)
    }

    50%{
        transform: scale(1,9)
    }

    100%{
        transform: scale(1,1)
    }
`;

interface IBar {
    playState: boolean;
}

const Bar = styled.div<IBar>`
    background: #ffb834;
    width: 2px;
    height: 2px;
    margin-right: 3px;
    ${(props) =>
        props.playState
            ? null
            : css`
                  :nth-child(1) {
                      animation: ${barAnimation} infinite 2s;
                  }
                  :nth-child(2) {
                      animation: ${barAnimation} infinite 0.8s;
                  }
                  :nth-child(3) {
                      animation: ${barAnimation} infinite 1.4s;
                  }
                  :nth-child(4) {
                      animation: ${barAnimation} infinite 2.2s;
                  }
                  :nth-child(5) {
                      animation: ${barAnimation} infinite 1s;
                  }
                  :nth-child(6) {
                      animation: ${barAnimation} infinite 0.7s;
                  }
                  :nth-child(7) {
                      animation: ${barAnimation} infinite 1.6s;
                  }
              `}
`;

const PlayerBar = styled.input.attrs({
    type: "range",
    //disabled: true,
    min: 0,
    max: 11.296,
    step: 0.01,
})`
    position: absolute;
    bottom: 27.6%;
    right: 27.95%;
    width: 11%;

    //InputRange CSS
    overflow: hidden;
    height: 2px;
    -webkit-appearance: none;
    margin: 10px 0;
    background: transparent;
    border-radius: 2px;

    ::-webkit-slider-thumb {
        width: 0px;
        -webkit-appearance: none;
        box-shadow: -100vw 0 0 100vw rgba(255, 255, 255, 0.75);
    }

    ::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.25);
    }
`;

const SoundStateHandler = () => {
    const [sound, setSound] = useRecoilState(soundState);
    const [time, setTime] = React.useState(0);
    const playState = useRecoilValue(welcomeDisplayAtom);
    for (const [_, i] of Object.entries(queueObject)) {
        i.volume = sound["velocity"];
    }

    /* Volume Handler */
    const volumeChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const newVelocity = Number(e.currentTarget.value);
        for (const [_, i] of Object.entries(queueObject)) {
            i.volume = newVelocity;
        }

        setSound((prev: any) => {
            return { ...prev, velocity: newVelocity };
        });
    };

    /* PlayerBarHandler */
    const isPlaying = (x: any) => {
        return !x.paused;
    };

    const PlayerBarHandler = () => {
        for (const [_, i] of Object.entries(queueObject)) {
            if (isPlaying(i)) {
                setTime((prev) => i.currentTime);
            }
        }
    };

    const pass = () => {};

    React.useEffect(() => {
        setInterval(PlayerBarHandler, 112.96);
    }, []);

    return (
        <>
            <PlayStateBar>
                <Bar playState={playState} />
                <Bar playState={playState} />
                <Bar playState={playState} />
                <Bar playState={playState} />
                <Bar playState={playState} />
                <Bar playState={playState} />
                <Bar playState={playState} />
            </PlayStateBar>
            <VolumeInput
                value={sound["velocity"]}
                onChange={volumeChangeHandler}
            ></VolumeInput>
            <PlayerBar value={time} onChange={pass}></PlayerBar>
        </>
    );
};

export default React.memo(SoundStateHandler);
