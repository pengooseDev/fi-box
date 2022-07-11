import React from "react";
import useSound from "use-sound";
import mel1SFX from "../assets/audio/lp/mel1.mp3";
import mel2SFX from "../assets/audio/lp/mel2.mp3";
import mel3SFX from "../assets/audio/lp/mel3.mp3";
import mel4SFX from "../assets/audio/lp/mel4.mp3";
import mel5SFX from "../assets/audio/lp/mel5.mp3";
import mel6SFX from "../assets/audio/lp/mel6.mp3";
import mel7SFX from "../assets/audio/lp/mel7.mp3";

/* 
0. useEffect 내부에 작성.
1. 특정 시간마다 queue 재생.
2. queue 시작시, recoil에서 data를 받아와서 array로 재생.
*/

const mel1 = () => {
    return new Audio(mel1SFX).play();
};
const mel2 = () => {
    return new Audio(mel2SFX).play();
};
const mel3 = () => {
    return new Audio(mel3SFX).play();
};
const mel4 = () => {
    return new Audio(mel4SFX).play();
};
const mel5 = () => {
    return new Audio(mel5SFX).play();
};
const mel6 = () => {
    return new Audio(mel6SFX).play();
};
const mel7 = () => {
    return new Audio(mel7SFX).play();
};

const queueObject = {
    //앞부분이 recoil에서 받아오는 LP이름
    LP1: mel1,
    LP2: mel2,
    LP3: mel3,
    LP4: mel4,
    LP5: mel5,
    LP6: mel6,
    LP7: mel7,
};

const soundHandler = async () => {
    const localData = localStorage.getItem("recoil-persist");
    if (!localData) return;
    const parsedLocalData = JSON.parse(localData);
    const queue = parsedLocalData["lpState"]["player"];
    console.log(queue);

    const promiseArray: void[] = [];

    //@ts-ignore
    queue.map((i: string) => promiseArray.push(queueObject[`${i}`]));

    console.time("1");
    //@ts-ignore
    Promise.all(promiseArray.map((i) => i()));
    console.timeEnd("1");
};

const SoundBox = () => {
    //90BPM 4var 10.66s
    React.useEffect(() => {
        setInterval(soundHandler, 11290);
    }, []);
    //setInterval(soundHandler, 11290);

    //85BPM 4var 11.29s
    return <></>;
};

export default SoundBox;
