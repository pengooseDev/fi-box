import { atom } from "recoil";

// playerQueueLengthProps
export interface IPlayerQueueLength {
    queueLength: number;
    snapshot: any;
    lpPlayerDisplay: boolean;
}

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
    providedInfo?: any;
}

interface ILpState {
    [key: string]: string[];
}

export const lpState = atom<ILpState>({
    key: "lpState",
    default: {
        file: ["LP1", "LP2", "LP3"],
        player: ["LP4", "LP5"],
    },
});
