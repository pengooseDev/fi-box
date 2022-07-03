import { atom } from "recoil";

//Display Atom
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
}

type TFileState = string[];

export const fileState = atom<TFileState>({
    key: "fileState",
    default: ["LP1", "LP2", "LP3"],
});

type TPlayerState = string[];

export const playerState = atom<TPlayerState>({
    key: "playerState",
    default: ["LP4", "LP5"],
});
