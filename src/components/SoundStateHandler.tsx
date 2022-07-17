import { useRecoilState } from "recoil";
import { soundState } from "../soundAtom";
import styled, { keyframes } from "styled-components";
import React from "react";
import { queueObject } from "./soundFunc";

const VolumeInput = styled.input.attrs({
    type: "range",
    orient: "vertical",
    min: 0,
    max: 1,
    step: 0.1,
})`
    -webkit-transform: rotate(270deg);
    position: absolute;
    bottom: 35%;
    right: 18%;
    width: 12%;

    border-radius: 3px;
    height: 1%;
    box-shadow: -2px 1px 7px rgba(11, 11, 11, 0.8);

    //InputRange CSS
    overflow: hidden;
    height: 10px;
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
        box-shadow: -101vw 0 0 100vw rgba(232, 19, 169, 0.65);
    }

    ::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
        background: #111;
    }
`;

const PlayStateBar = styled.div`
    position: absolute;
    bottom: 21.4%;
    right: 39.5%;
    display: flex;
`;

const barAnimation = keyframes`
    0%{
        transform: scale(1,0.2)
    }

    50%{
        transform: scale(1,1)
    }

    100%{
        transform: scale(1,0.2)
    }
`;

const Bar = styled.div`
    background: #ffb834;
    width: 2px;
    height: 25px;
    margin-right: 3px;
    :nth-child(1) {
        animation: ${barAnimation} infinite 0.7s;
    }
    :nth-child(2) {
        animation: ${barAnimation} infinite 1s;
    }
    :nth-child(3) {
        animation: ${barAnimation} infinite 0.3s;
    }
    :nth-child(4) {
        animation: ${barAnimation} infinite 0.54s;
    }
    :nth-child(5) {
        animation: ${barAnimation} infinite 0.6s;
    }
    :nth-child(6) {
        animation: ${barAnimation} infinite 1.1s;
    }
    :nth-child(7) {
        animation: ${barAnimation} infinite 0.8s;
    }
`;

const PlayerBar = styled.input.attrs({ type: "range", disabled: true })`
    position: absolute;
    bottom: 21.4%;
    right: 27.5%;
    width: 11%;

    //InputRange CSS
    overflow: hidden;
    height: 5px;
    -webkit-appearance: none;
    margin: 10px 0;
    background: transparent;

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 0px;
        border-radius: 2px;
        box-shadow: -101vw 0 0 100vw white;
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

    let timeValue = 0;
    const PlayerBarHandler = () => {
        for (const [_, i] of Object.entries(queueObject)) {
            if (isPlaying(i)) {
                console.log(`${i} : `, i.currentTime);
            }
        }
    };

    return (
        <>
            <PlayStateBar>
                <Bar />
                <Bar />
                <Bar />
                <Bar />
                <Bar />
                <Bar />
                <Bar />
            </PlayStateBar>
            <VolumeInput
                value={sound["velocity"]}
                onChange={volumeChangeHandler}
            ></VolumeInput>
            <PlayerBar></PlayerBar>
        </>
    );
};

export default React.memo(SoundStateHandler);
