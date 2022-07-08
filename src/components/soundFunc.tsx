import React from "react";
import { useRecoilValue } from "recoil";
import { lpState } from "../atoms";
import useSound from "use-sound";
import mel1SFX from "../assets/audio/mel1.mp3";
import mel2SFX from "../assets/audio/mel2.mp3";
import mel3SFX from "../assets/audio/mel3.mp3";
import mel4SFX from "../assets/audio/mel4.mp3";
import mel5SFX from "../assets/audio/mel5.mp3";

/* 
0. useEffect 내부에 작성.
1. 특정 시간마다 queue 재생.
2. queue 시작시, recoil에서 data를 받아와서 array로 재생.
*/

const SoundBox = () => {
    const [mel1] = useSound(mel1SFX);
    const [mel2] = useSound(mel2SFX);
    const [mel3] = useSound(mel3SFX);
    const [mel4] = useSound(mel4SFX);
    const [mel5] = useSound(mel5SFX);

    const queueObject = {
        //앞부분이 recoil에서 받아오는 LP이름
        LP1: mel1,
        LP2: mel2,
        LP3: mel3,
        LP4: mel4,
        LP5: mel5,
    };

    React.useEffect(() => {
        const soundHandler = () => {
            const localData = localStorage.getItem("recoil-persist");
            if (!localData) return;
            const parsedLocalData = JSON.parse(localData);
            const queue = parsedLocalData["lpState"]["player"];
            console.log(queue);

            for (let i of queue) {
                // @ts-ignore
                queueObject[`${i}`]();
            }
        };

        setInterval(soundHandler, 3800);
    }, []);

    return <></>;
};

export default SoundBox;
