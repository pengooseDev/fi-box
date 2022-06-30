import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import backgroundImg from "./assets/img/background.png";
import { defaultFileAnimation, hoverAnimation } from "./components/animation";
import { lpDisplayAtom } from "./atoms";
import useSound from "use-sound";

/* fileBoard */
import fileImg from "./assets/img/file1.png";

// fileBoard sound
import onClickSFX from "./assets/audio/onDown.mp3";
import openSoundSFX from "./assets/audio/onUpOpen.mp3";
import closeSoundSFX from "./assets/audio/onUpClose.mp3";

/* LPqueue */
import LpPlayerImgSrc from "./assets/img/LpPlayer.png";

/* Lo-fi Cat */
import lofiCatImgSrc from "./assets/img/goYangE.png";

//Lo-fi Cat Sound
import catSoundSFX1 from "./assets/audio/cat/cat1.mp3";
import catSoundSFX2 from "./assets/audio/cat/cat2.mp3";
import catSoundSFX3 from "./assets/audio/cat/cat3.mp3";
import catSoundSFX4 from "./assets/audio/cat/cat4.mp3";
import catSoundSFX5 from "./assets/audio/cat/cat5.mp3";
import catSoundSFX6 from "./assets/audio/cat/cat6.mp3";
import catSoundSFX7 from "./assets/audio/cat/cat7.mp3";
import catSoundSFX8 from "./assets/audio/cat/cat8.mp3";
import catSoundSFX9 from "./assets/audio/cat/cat9.mp3";
import catSoundSFX10 from "./assets/audio/cat/cat10.mp3";
import catSoundSFX11 from "./assets/audio/cat/cat11.mp3";
import catSoundSFX12 from "./assets/audio/cat/cat12.mp3";

//DND 사용시 반드시 Strict 모드를 해제해줘야함.
//DND에서 id가 변하는 경우 반드시 key값과 draggableId를 동일하게 해줘야함.
//key를 Index로 한 경우 Complie Err 발생.

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    background: tomato;
`;

const BackImg = styled.img.attrs({ src: backgroundImg })`
    height: 100vh;
    //min-height: 800px;
    min-height: 400px;
`;

/* 여기서부터 File, LP판 Components */

//폴더 컴포넌트
const FileWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    height: 100%;
    width: 100%;
`;

//폴더 이미지
const FileImg = styled.img.attrs({ src: fileImg })`
    position: absolute;
    width: 6.3%;
    height: 12%;
    top: 13%;
    left: 23%;

    //prevent drag
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;

    //#1. hover했을 때 좌우 흔들리는 애니메이션 추가하기!!
    transition: 0.2s ease-in-out;

    animation: ${defaultFileAnimation} infinite 10s;
    filter: drop-shadow(3px 3px 7px rgba(243, 81, 81, 1));
    :hover {
        animation: ${hoverAnimation} infinite 2.5s;
        cursor: pointer;
        filter: drop-shadow(10px 10px 0px rgba(243, 81, 81, 1));
    }
`;

//displayToggle LP 디스플레이.
const FileDisplay = styled.ul`
    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(4px);
    border-radius: 5px;
    padding: 10px;
    width: 17%;
    height: 23%;

    position: absolute;
    top: 14%;
    left: 31%;
    z-index: 0;
`;

//LP Board & Queue

const LpPlayerImg = styled.img.attrs({ src: LpPlayerImgSrc })`
    position: absolute;
    background: bisque;
    padding: 1% 0px;
    opacity: 0.3;
    bottom: 24%;
    right: 25.2%;

    height: 15.5%;
    width: 16.8%;
    border-radius: 30%;
    :hover {
        cursor: pointer;
    }
`;

//이게 Droppable / Draggable
const LPBoard = styled.div`
    display: none;
    position: absolute;
    background: tomato;
    opacity: 0.3;
    bottom: 26%;
    right: 25%;

    height: 15%;
    width: 16%;
    border-radius: 30%;
`;

const LPQueueDisplay = styled.div`
    position: absolute;
    top: 34%;
    right: 27%;

    //LP크기랑 맞추면 될 듯.
    height: 20%;
    width: 10%;

    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(2.5px);
    border-radius: 5px;
`;

/* Cat */
// gif로 변경.
const LoFiCatContainer = styled.img.attrs({ src: lofiCatImgSrc })`
    position: absolute;
    bottom: 25%;
    left: 21.8%;
    border-radius: 100%;
    padding: 10px;
    width: 9%;
    height: 11%;

    :hover {
        cursor: pointer;
    }
`;

type randomGenerator = { (a: number, b: number): number };

const getRandomInt: randomGenerator = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const LoFiCat = () => {
    const [c1] = useSound(catSoundSFX1);
    const [c2] = useSound(catSoundSFX2);
    const [c3] = useSound(catSoundSFX3);
    const [c4] = useSound(catSoundSFX4);
    const [c5] = useSound(catSoundSFX5);
    const [c6] = useSound(catSoundSFX6);
    const [c7] = useSound(catSoundSFX7);
    const [c8] = useSound(catSoundSFX8);
    const [c9] = useSound(catSoundSFX9);
    const [c10] = useSound(catSoundSFX10);
    const [c11] = useSound(catSoundSFX11);
    const [c12] = useSound(catSoundSFX12);
    const randomCatSFXArray = [
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
        c7,
        c8,
        c9,
        c10,
        c11,
        c12,
    ];

    const cuteCat = () => {
        //catSoundSFX;
        let randomInt = getRandomInt(1, 12);
        console.log(randomInt);
        randomCatSFXArray[randomInt]();
    };

    return <LoFiCatContainer onClick={cuteCat}></LoFiCatContainer>;
};

function App() {
    const [onClickSound] = useSound(onClickSFX);
    const [openSound] = useSound(openSoundSFX);
    const [closeSound] = useSound(closeSoundSFX);

    const [lpToggle, setLpToggle] = useRecoilState(lpDisplayAtom);

    const onDragStart = () => {
        console.log("dragStart");
    };

    const onDragEnd = () => {
        console.log("dragEnd");
    };

    const lpDisplayToggle = () => {
        setLpToggle((prev) => !prev);
    };

    const lpMouseDown = () => {
        return onClickSound();
    };

    const lpMouseUp = () => {
        if (!lpToggle) {
            return openSound();
        }
        return closeSound();
    };

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Wrapper>
                {/* Wrapper : relative 하위 컴포넌트 absolute, 반응형써서 전부 Wrapper에 맞추기. */}
                <BackImg></BackImg>

                {/* absolute를 Wrapper에 걸고 아래 IMG랑 그 아래 FileDisplay에 relative 걸어보기. */}
                {/*File board*/}
                <FileWrapper>
                    <FileImg
                        onClick={lpDisplayToggle}
                        onMouseDown={lpMouseDown}
                        onMouseUp={lpMouseUp}
                    />
                    {lpToggle ? (
                        <Droppable droppableId="LP">
                            {(provided) => (
                                //드로퍼블 child 시작
                                <FileDisplay
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <Draggable draggableId="LP1" index={0}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                LP1
                                            </li>
                                        )}
                                    </Draggable>
                                    <Draggable draggableId="LP2" index={2}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                LP2
                                            </li>
                                        )}
                                    </Draggable>
                                </FileDisplay>
                                //드로퍼블 child 끝
                            )}
                        </Droppable>
                    ) : null}
                </FileWrapper>
                {/* LP Board */}
                <LPQueueDisplay>123</LPQueueDisplay>
                <LpPlayerImg />
                <LPBoard></LPBoard>
                <LoFiCat />
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
