import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const { persistAtom } = recoilPersist({
    key: "LSSoundState",
    storage: localStorage,
});

export const soundState = atom({
    key: "soundState",
    default: {
        velocity: 80,
        paused: false,
    },
    effects_UNSTABLE: [persistAtom],
});
