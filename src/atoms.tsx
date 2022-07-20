import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "LSLpState",
    storage: localStorage,
});

// playerQueueLengthProps
export interface IPlayerQueueLength {
    queueLength: number;
    snapshot: any;
    lpPlayerDisplay: boolean;
}

//Display Atom

export const welcomeDisplayAtom = atom({
    key: "welcomeDisplayAtom",
    default: true,
});

export const fileDisplayAtom = atom({
    key: "fileDisplayAtom",
    default: false,
});

export const lpQueueDisplayAtom = atom({
    key: "lpQueueDisplayAtom",
    default: false,
});

//Props Interface
export interface IDragabbleLpProps {
    v: string;
    i: number;
    providedInfo?: any;
}

interface ILpState {
    [key: string]: string[];
}

export const lpState = atom<ILpState>({
    key: "lpState",
    default: {
        file: ["LP2", "LP3", "LP4", "LP5", "LP6", "LP7"],
        player: ["LP1"],
    },
    effects_UNSTABLE: [persistAtom],
});

interface ILpTheme {
    [key: string]: string;
}

export const lpTheme = atom<ILpTheme>({
    key: "lpTheme",
    default: {
        LP1: "blue",
        LP2: "blue",
        LP3: "blue",
        LP4: "blue",
        LP5: "yellow",
        LP6: "red",
        LP7: "red",
    },
});

export const ambienceToggle = atom({
    key: "ambienceToggle",
    default: true,
});
