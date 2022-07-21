import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const { persistAtom } = recoilPersist({
    key: "ambienceToggle",
    storage: localStorage,
});

export const ambienceToggle = atom({
    key: "ambienceToggle",
    default: false,
    effects_UNSTABLE: [persistAtom],
});
