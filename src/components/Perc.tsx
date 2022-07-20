import kickSFX from "../assets/audio/perc/kick.mp3";
import useSound from "use-sound";
import styled from "styled-components";

interface KeyboardEvent<T = Element> {
    altKey: boolean;
    /** @deprecated */
    charCode: number;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    key: string;
    /** @deprecated */
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    /** @deprecated */
    which: number;
}

//
//
const Comp = styled.div`
    position: absolute;
    top: 10%;
    right: 50%;
    background: teal;
    width: 100px;
    height: 100px;
`;

const Perc = () => {
    const [kick] = useSound(kickSFX);
    const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
        console.log(1);
    };

    return (
        <Comp onKeyDown={handleKeyboardEvent} onClick={() => kick()}>
            123123
        </Comp>
    );
};

export default Perc;
