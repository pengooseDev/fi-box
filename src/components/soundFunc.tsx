import React from "react";
import mel1SFX from "../assets/audio/lp/lp1.mp3";
import mel2SFX from "../assets/audio/lp/lp2.mp3";
import mel3SFX from "../assets/audio/lp/lp3.mp3";
import mel4SFX from "../assets/audio/lp/lp4.mp3";
import mel5SFX from "../assets/audio/lp/lp5.mp3";
import mel6SFX from "../assets/audio/lp/lp6.mp3";
import mel7SFX from "../assets/audio/lp/lp7.mp3";
import mel8SFX from "../assets/audio/lp/lp8.mp3";
import styled from "styled-components";
/* Ambience */
import rainAmbience from "../assets/audio/ambience/rain.mp3";
import { ambienceToggle } from "../ambienceAtom";
import rain from "../assets/img/rain.png";
import muteRain from "../assets/img/mute.png";
/* isPlaying */
import { useRecoilState } from "recoil";
import { isPlayingState } from "../atoms";

/* 
0. useEffect 내부에 작성.
1. 특정 시간마다 queue 재생.
2. queue 시작시, recoil에서 data를 받아와서 array로 재생.
*/

export const queueObject = {
    //앞부분이 recoil에서 받아오는 LP이름
    LP1: new Audio(mel1SFX),
    LP2: new Audio(mel2SFX),
    LP3: new Audio(mel3SFX),
    LP4: new Audio(mel4SFX),
    LP5: new Audio(mel5SFX),
    LP6: new Audio(mel6SFX),
    LP7: new Audio(mel7SFX),
    LP8: new Audio(mel8SFX),
};

const SoundWrapper = styled.div`
    position: absolute;
    z-index: 100;
    bottom: 1%;
    right: 3%;
    transition: 0.2s ease-in-out;
`;

const Mute = styled.img.attrs({ src: muteRain })`
    width: 70px;
    height: 50px;

    position: absolute;
    z-index: 100;
    bottom: 31.5px;
    right: 3%;
    border-radius: 60px 60px 20px 20px;
    transition: 0.2s ease-in-out;
    :hover {
        cursor: pointer;
    }
`;

const UnMute = styled.img.attrs({ src: rain })`
    width: 70px;
    height: 40px;

    position: absolute;
    z-index: 100;
    bottom: 40px;
    right: 3%;
    transition: 0.2s ease-in-out;
    border-radius: 60px 60px 20px 20px;
    :hover {
        cursor: pointer;
    }
`;

const rainSFX = new Audio(rainAmbience);
const SoundBox = () => {
    const [rain, setRain] = useRecoilState(ambienceToggle);
    const [playing, setPlaying] = useRecoilState(isPlayingState);

    const ambienceToggleHandler = () => {
        setRain((prev: any) => !prev);
    };

    const ambienceHandler = () => {
        rainSFX.currentTime = 0;
        rainSFX.play();
    };

    const muteHandler = () => {
        const localData = localStorage.getItem("ambienceToggle");
        if (!localData) return;
        const parsedLocalData = JSON.parse(localData);
        const localRainState = parsedLocalData["ambienceToggle"];

        if (localRainState) {
            rainSFX.volume = 1;
            rainSFX.play();
        } else {
            rainSFX.volume = 0;
            rainSFX.play();
        }
    };

    /////
    /////

    const isPlaying = () => {
        const localData = localStorage.getItem("LSLpState");
        if (!localData) return;
        const parsedLocalData = JSON.parse(localData);
        const queue = parsedLocalData["lpState"]["player"];

        if (!queue[0]) {
            console.log("isNotPlaying");
            return false;
        } else {
            console.log("isPlaying");
            return true;
        }
    };

    const soundHandler = () => {
        const localData = localStorage.getItem("LSLpState");
        if (!localData) return;
        const parsedLocalData = JSON.parse(localData);
        const queue = parsedLocalData["lpState"]["player"];
        const promiseArray: void[] = [];

        //setThePlayingState
        const playing = isPlaying();
        //@ts-ignore
        setPlaying((prev) => playing);
        console.log(playing);
        //@ts-ignore
        queue.map((i: string) => promiseArray.push(queueObject[`${i}`]));
        /* 여기서 loop가 아닌 mp3는 조건문으로 따로 실행. */

        /* if(!loop){
        sound를 loop 내장함수로 돌려주고, queueState를 deps로 가지는 useEffect하나 파서,
        queue에서 해당 LP를 삭제했을 경우 audio.volume=0으로 만들어주고,
        다시 올려두면 audio.currentTime=0 & audio.volume=1 & audio.play()해주기.
    } */
        //@ts-ignore
        promiseArray.map((i) => (i.currentTime = 0));
        //@ts-ignore
        promiseArray.map((i) => i.play());
    };

    ////
    ////
    ////
    ////
    ////
    ////

    React.useEffect(() => {
        muteHandler();
    }, [rain]);

    React.useEffect(() => {
        soundHandler();
        setInterval(soundHandler, 11296); //85BPM(16bit) => 11,296ms
        setInterval(ambienceHandler, 240000); //Rain Ambience 4min(240,000ms)
    }, []);

    return (
        <SoundWrapper>
            <input
                onClick={ambienceToggleHandler}
                id="ambienceToggle"
                type={"checkbox"}
                hidden
            ></input>
            <label htmlFor="ambienceToggle">
                <UnMute />
                {rain ? null : <Mute />}
            </label>
        </SoundWrapper>
    );
};

export default SoundBox;
