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

//Perc
import kickSFX from "../assets/audio/perc/kick.mp3";
import shakerSFX from "../assets/audio/perc/shaker.mp3";
import rimSFX from "../assets/audio/perc/rim.mp3";

/* PercHandler */
const kick = new Audio(kickSFX);
const shaker = new Audio(shakerSFX);
const rim = new Audio(rimSFX);
const z = new Audio(zSFX);
const s = new Audio(sSFX);
const x = new Audio(xSFX);
const d = new Audio(dSFX);
const c = new Audio(cSFX);
const v = new Audio(vSFX);
const g = new Audio(gSFX);
const b = new Audio(bSFX);
const h = new Audio(hSFX);
const n = new Audio(nSFX);
const j = new Audio(jSFX);
const m = new Audio(mSFX);
const comma = new Audio(commaSFX);
const l = new Audio(lSFX);
const dot = new Audio(dotSFX);
const sc = new Audio(scSFX);
const slash = new Audio(slashSFX);

const percHandler = (e: any) => {
    console.log(e.code);
    if (e.code === "Digit1") {
        kick.play();
    } else if (e.code === "Digit2") {
        shaker.play();
    } else if (e.code === "Digit3") {
        rim.play();
    } else if (e.code === "KeyZ") {
        z.play();
    } else if (e.code === "KeyS") {
        s.play();
    } else if (e.code === "KeyX") {
        x.play();
    } else if (e.code === "KeyD") {
        d.play();
    } else if (e.code === "KeyC") {
        c.play();
    } else if (e.code === "KeyV") {
        v.play();
    } else if (e.code === "KeyG") {
        g.play();
    } else if (e.code === "KeyB") {
        b.play();
    } else if (e.code === "KeyH") {
        h.play();
    } else if (e.code === "KeyN") {
        n.play();
    } else if (e.code === "KeyJ") {
        j.play();
    } else if (e.code === "KeyM") {
        m.play();
    } else if (e.code === "Comma") {
        comma.play();
    } else if (e.code === "KeyL") {
        l.play();
    } else if (e.code === "Period") {
        dot.play();
    } else if (e.code === "Semicolon") {
        sc.play();
    } else if (e.code === "Slash") {
        slash.play();
    } else {
        return;
    }
};

export default percHandler;
