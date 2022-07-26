/* Keyboard Mapping */
import zSFX from "../assets/audio/keyboardMapping/z.mp3";
import sSFX from "../assets/audio/keyboardMapping/s.mp3";
import xSFX from "../assets/audio/keyboardMapping/x.mp3";
import dSFX from "../assets/audio/keyboardMapping/d.mp3";
import cSFX from "../assets/audio/keyboardMapping/c.mp3";
import vSFX from "../assets/audio/keyboardMapping/v.mp3";
import gSFX from "../assets/audio/keyboardMapping/g.mp3";
import bSFX from "../assets/audio/keyboardMapping/b.mp3";
import hSFX from "../assets/audio/keyboardMapping/h.mp3";
import nSFX from "../assets/audio/keyboardMapping/n.mp3";
import jSFX from "../assets/audio/keyboardMapping/j.mp3";
import mSFX from "../assets/audio/keyboardMapping/m.mp3";
import commaSFX from "../assets/audio/keyboardMapping/comma.mp3";
import lSFX from "../assets/audio/keyboardMapping/l.mp3";
import dotSFX from "../assets/audio/keyboardMapping/dot.mp3";
import scSFX from "../assets/audio/keyboardMapping/sc.mp3";
import slashSFX from "../assets/audio/keyboardMapping/slash.mp3";
import useSound from "use-sound";

//Perc
import kickSFX from "../assets/audio/perc/kick.mp3";
import shakerSFX from "../assets/audio/perc/shaker.mp3";
import rimSFX from "../assets/audio/perc/rim.mp3";

import styled from "styled-components";

const PercWrapper = styled.div`
    background: teal;
`;
/* PercHandler */
const Perc = () => {
    const [kick] = useSound(kickSFX);
    const [shaker] = useSound(shakerSFX);
    const [rim] = useSound(rimSFX);
    const [z] = useSound(zSFX);
    const [s] = useSound(sSFX);
    const [x] = useSound(xSFX);
    const [d] = useSound(dSFX);
    const [c] = useSound(cSFX);
    const [v] = useSound(vSFX);
    const [g] = useSound(gSFX);
    const [b] = useSound(bSFX);
    const [h] = useSound(hSFX);
    const [n] = useSound(nSFX);
    const [j] = useSound(jSFX);
    const [m] = useSound(mSFX);
    const [comma] = useSound(commaSFX);
    const [l] = useSound(lSFX);
    const [dot] = useSound(dotSFX);
    const [sc] = useSound(scSFX);
    const [slash] = useSound(slashSFX);

    const percHandler = (e: any) => {
        console.log(e.code);
        if (e.code === "Digit1") {
            kick();
        } else if (e.code === "Digit2") {
            shaker();
        } else if (e.code === "Digit3") {
            rim();
        } else if (e.code === "KeyZ") {
            z();
        } else if (e.code === "KeyS") {
            s();
        } else if (e.code === "KeyX") {
            x();
        } else if (e.code === "KeyD") {
            d();
        } else if (e.code === "KeyC") {
            c();
        } else if (e.code === "KeyV") {
            v();
        } else if (e.code === "KeyG") {
            g();
        } else if (e.code === "KeyB") {
            b();
        } else if (e.code === "KeyH") {
            h();
        } else if (e.code === "KeyN") {
            n();
        } else if (e.code === "KeyJ") {
            j();
        } else if (e.code === "KeyM") {
            m();
        } else if (e.code === "Comma") {
            comma();
        } else if (e.code === "KeyL") {
            l();
        } else if (e.code === "Period") {
            dot();
        } else if (e.code === "Semicolon") {
            sc();
        } else if (e.code === "Slash") {
            slash();
        }
    };

    return <PercWrapper onKeyDown={percHandler}>123</PercWrapper>;
};
