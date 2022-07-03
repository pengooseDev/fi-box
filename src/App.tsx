import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import backgroundImg from "./assets/img/background.png";
import { defaultFileAnimation, hoverAnimation } from "./components/animation";
import { fileDisplayAtom, lpQueueDisplayAtom, fileState } from "./atoms";
import useSound from "use-sound";
import bgCloseSFX from "./assets/audio/bgClose.mp3";

/* LpImg */
import lpImg from "./assets/img/lp1.png";

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

const disable = () => {
    // To get the scroll position of current webpage
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll =
        window.pageXOffset || document.documentElement.scrollLeft;

    // if scroll happens, set it to the previous value
    window.onscroll = function () {
        window.scrollTo(LeftScroll, TopScroll);
    };
    console.log("disable Start");
};

const enable = () => {
    window.onscroll = function () {};
    console.log("able");
};

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    background: #180727;
`;

const BackImg = styled.img.attrs({ src: backgroundImg })`
    height: 100vh;
    //min-height: 800px;
    min-height: 700px;
`;

/* 여기서부터 File, LP판 Components */

//폴더 이미지
const FileImg = styled.img.attrs({ src: fileImg })`
    position: absolute;
    width: 6.3%;
    height: 12%;
    top: 14%;
    left: 24%;

    //prevent drag
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;

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

const FileContainer = styled.div`
    position: absolute;
    top: 14.2%;
    left: 32.5%;
`;

const FileBoard = styled.ul`
    z-index: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    width: auto;

    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);

    backdrop-filter: blur(4px);
    border-radius: 5px;
    padding: 10px;
    transition: 0.2s ease-in-out;
`;

//LP
const LpCard = styled.div`
    //background: rgba(72, 69, 61, 0.7);

    border-radius: 50%;
    top: auto !important;
    left: auto !important;
    transition: 0.2s ease-in-out;
    margin-bottom: 10px;
`;

const LpCardImg = styled.img.attrs({ src: lpImg })`
    width: 100px;
    padding: 5px;
    border-radius: 50%;
    transition: 0.2s ease-in-out;
    filter: drop-shadow(5px 5px 0px #222);
    :hover {
        filter: drop-shadow(3px 3px 5px rgba(255, 255, 255, 1));
    }
    :active {
        filter: drop-shadow(3px 3px 2px rgba(255, 255, 255, 0.8));
    }
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
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    :hover {
        cursor: pointer;
    }
`;

//이게 Toggle되는 Droppable창.
const LpPlayerContainer = styled.div`
    position: absolute;
    top: 32%;
    right: 27%;
    padding: 1%;

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
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;

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
        randomCatSFXArray[randomInt]();
    };

    return <LoFiCatContainer onClick={cuteCat}></LoFiCatContainer>;
};

function App() {
    const [fileLp, setFileLps] = useRecoilState(fileState);
    const [onClickSound] = useSound(onClickSFX);
    const [openSound] = useSound(openSoundSFX);
    const [closeSound] = useSound(closeSoundSFX);
    const [bgCloseSound] = useSound(bgCloseSFX);

    const [fileDisplayToggle, setFileDisplayToggle] =
        useRecoilState(fileDisplayAtom);

    //
    //
    // CleanCode때 여기 통째로 LP Play Components로 옮기기.
    //
    //
    //LP Player Display Start
    const [lpPlayerDisplay, setLpPlayerDisplay] =
        useRecoilState(lpQueueDisplayAtom);

    const lpPlayerClickHandler = () => {
        setLpPlayerDisplay((prev) => !prev);
    };
    //LP Player Display End
    //
    //
    //

    const onDragStart = () => {
        console.log("dragStart");
    };

    const onDragEnd = (arg: any) => {
        console.log(arg);
        console.log(arg.source);
        console.log(arg.destination);
    };

    const lpDisplayToggle = () => {
        setFileDisplayToggle((prev) => !prev);
    };

    const lpMouseDown = () => {
        return onClickSound();
    };

    const lpMouseUp = () => {
        if (!fileDisplayToggle) {
            return openSound();
        }
        return closeSound();
    };

    const backgroundClickHandler = () => {
        if (fileDisplayToggle) {
            bgCloseSound();
            setFileDisplayToggle((prev) => !prev);
            if (lpPlayerDisplay) {
                return setLpPlayerDisplay((prev) => !prev);
            }
        }

        if (lpPlayerDisplay) {
            bgCloseSound();
            setLpPlayerDisplay((prev) => !prev);
            return;
        }
    };

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Wrapper>
                {/* Wrapper : relative 하위 컴포넌트 absolute, 반응형써서 전부 Wrapper에 맞추기. */}
                <BackImg
                    onClick={backgroundClickHandler}
                    onDragStart={disable}
                    onDragEnd={enable}
                ></BackImg>

                {/* absolute를 Wrapper에 걸고 아래 IMG랑 그 아래 FileDisplay에 relative 걸어보기. */}
                {/*File board*/}
                <FileImg
                    onClick={lpDisplayToggle}
                    onMouseDown={lpMouseDown}
                    onMouseUp={lpMouseUp}
                />
                {fileDisplayToggle ? (
                    <FileContainer>
                        <Droppable droppableId="File">
                            {(provided) => (
                                //드로퍼블 child 시작
                                <FileBoard
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {fileLp.map((v, i) => (
                                        <Draggable
                                            draggableId={v}
                                            index={i}
                                            key={i}
                                        >
                                            {(provided) => (
                                                <>
                                                    <LpCard
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <LpCardImg></LpCardImg>
                                                        <div>
                                                            value : {v}, index :
                                                            {i}
                                                        </div>
                                                    </LpCard>
                                                </>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </FileBoard>
                                //드로퍼블 child 끝
                            )}
                        </Droppable>
                    </FileContainer>
                ) : null}
                {/* LP Board */}
                {lpPlayerDisplay ? (
                    <LpPlayerContainer>123</LpPlayerContainer>
                ) : null}
                <LpPlayerImg onClick={lpPlayerClickHandler} />
                <LoFiCat />
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
