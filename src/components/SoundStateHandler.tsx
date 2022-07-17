import { useRecoilState, useRecoilValue } from "recoil";
import { soundState } from "../soundAtom";
import styled from "styled-components";
import React from "react";
import { queueObject } from "./soundFunc";

const VolumeInput = styled.input.attrs({
    type: "range",
    min: 0,
    max: 1,
    step: 0.1,
})`
    position: absolute;
    bottom: 21%;
    right: 28%;
    width: 12%;

    border-radius: 3px;
    background: black;
    height: 1%;
`;

const SoundStateHandler = () => {
    const [sound, setSound] = useRecoilState(soundState);
    const localData = localStorage.getItem("LSSoundState");

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

    return (
        <>
            <VolumeInput
                value={sound["velocity"]}
                onChange={volumeChangeHandler}
            ></VolumeInput>
        </>
    );
};

export default React.memo(SoundStateHandler);
