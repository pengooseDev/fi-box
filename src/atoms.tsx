import { atom } from "recoil";

export const fileDisplayAtom = atom({
    key: "fileDisplayAtom",
    default: false,
});

export const lpQueueDisplayAtom = atom({
    key: "lpQueueDisplayAtom",
    default: false,
});

/* LP Sound Type */
/* 
    LPState = {
        "file": [
            ["lpName", "src"],
            ["lpName", "src"],
            ["lpName", "src"],
            ["lpName", "src"],
        ],
        player: [
            ["lpName", "src"],
            ["lpName", "src"],
        ],
        trashCan: [],
    }
*/

type TFileState = string[];

export const fileState = atom<TFileState>({
    key: "fileState",
    default: ["1", "2", "3", "4"],
});

/*

export interface IToDo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    },
});

 */
