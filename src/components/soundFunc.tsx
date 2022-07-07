import React from "react";
import { useRecoilState } from "recoil";
import { lpState } from "../atoms";
import useSound from "use-sound";
import mel0SFX from "../assets/audio/mel0.mp3";
import mel1SFX from "../assets/audio/mel1.mp3";
import mel2SFX from "../assets/audio/mel2.mp3";
import mel3SFX from "../assets/audio/mel3.mp3";
import mel4SFX from "../assets/audio/mel4.mp3";
import mel5SFX from "../assets/audio/mel5.mp3";

const SoundBox = () => {
    const [lps, setLps] = useRecoilState(lpState);
    const [mel0] = useSound(mel0SFX, {
        onend: () => {
            for (let i of queue) {
                // @ts-ignore
                queueObject[`${i}`]();
            }
            console.log(queue);
        },
    });
    const [mel1] = useSound(mel1SFX);
    const [mel2] = useSound(mel2SFX);
    const [mel3] = useSound(mel3SFX);
    const [mel4] = useSound(mel4SFX);
    const [mel5] = useSound(mel5SFX);

    const queue: string[] = lps["player"];

    const queueObject = {
        //앞부분이 recoil에서 받아오는 LP이름
        LP0: mel0,
        LP1: mel1,
        LP2: mel2,
        LP3: mel3,
        LP4: mel4,
        LP5: mel5,
    };

    //test
    //const queue: string[] = ["LP0", "LP1", "LP2", "LP3", "LP4", "LP5"];

    return <></>;
};

export default SoundBox;

//window["functionName"](arguments);
// @ts-ignore

/*     
const [mel1] = useSound(mel1SFX, {
        onend: queuePlay,
    });
*/
