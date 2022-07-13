import { useRecoilState } from "recoil";
import { soundState } from "../atoms";
import styled from "styled-components";

const HandlerInput = styled.input.attrs({ type: "range" })`
    color: teal;
    position: absolute;
    bottom: 21%;
    right: 28%;
    width: 12%;
`;
const SoundStateHandler = () => {
    const [sound, setSound] = useRecoilState(soundState);
    console.log(sound);

    return (
        <>
            <HandlerInput></HandlerInput>
        </>
    );
};

export default SoundStateHandler;
