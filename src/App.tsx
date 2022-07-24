import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import backgroundImg from "./assets/img/background.png";
import { defaultFileAnimation, hoverAnimation } from "./components/animation";
import {
    welcomeDisplayAtom,
    fileDisplayAtom,
    lpQueueDisplayAtom,
    lpState,
    IPlayerQueueLength,
    isPlayingState,
} from "./atoms";

import useSound from "use-sound";
import bgCloseSFX from "./assets/audio/bgClose.mp3";
import DragabbleLp from "./components/DraggableLp";
/* Header */
import Header from "./components/Helmet";
/* Cat */
import LoFiCat from "./components/LofiCat";

/* fileBoard */
import fileImg from "./assets/img/file.gif";
import lpPlayerGif from "./assets/img/lp.gif";
import soundWave from "./assets/img/soundWave.gif";

/* welcome */
import cassetteSFX from "./assets/audio/cassette.mp3";

/* SoundStateHandler */
import SoundStateHandler from "./components/SoundStateHandler";

/* fileBoard sound */
import onClickSFX from "./assets/audio/onDown.mp3";
import openSoundSFX from "./assets/audio/onUpOpen.mp3";
import closeSoundSFX from "./assets/audio/onUpClose.mp3";

/* LpPlayer */
import playerDownSFX from "./assets/audio/playerClick.mp3";
import playerUpOpenSFX from "./assets/audio/playerUpOpen.mp3";
import playerUpCloseSFX from "./assets/audio/playerUpClose.mp3";
import bgplayerCloseSFX from "./assets/audio/bgPlayerClose.mp3";

/* soundBox */
import SoundBox from "./components/soundFunc";

/* Motion-framer */
import { motion, AnimatePresence } from "framer-motion";

/* Keyboard Mapping */
import zSFX from "./assets/audio/keyboardMapping/z.mp3";
import sSFX from "./assets/audio/keyboardMapping/s.mp3";
import xSFX from "./assets/audio/keyboardMapping/x.mp3";
import dSFX from "./assets/audio/keyboardMapping/d.mp3";
import cSFX from "./assets/audio/keyboardMapping/c.mp3";
import vSFX from "./assets/audio/keyboardMapping/v.mp3";
import gSFX from "./assets/audio/keyboardMapping/g.mp3";
import bSFX from "./assets/audio/keyboardMapping/b.mp3";
import hSFX from "./assets/audio/keyboardMapping/h.mp3";
import nSFX from "./assets/audio/keyboardMapping/n.mp3";
import jSFX from "./assets/audio/keyboardMapping/j.mp3";
import mSFX from "./assets/audio/keyboardMapping/m.mp3";
import commaSFX from "./assets/audio/keyboardMapping/comma.mp3";
import lSFX from "./assets/audio/keyboardMapping/l.mp3";
import dotSFX from "./assets/audio/keyboardMapping/dot.mp3";
import scSFX from "./assets/audio/keyboardMapping/sc.mp3";
import slashSFX from "./assets/audio/keyboardMapping/slash.mp3";

//Perc
import kickSFX from "./assets/audio/perc/kick.mp3";
import shakerSFX from "./assets/audio/perc/shaker.mp3";
import rimSFX from "./assets/audio/perc/rim.mp3";

//DND 사용시 Strict 모드를 해제해줘야함.
//DND에서 id가 변하는 경우 반드시 key값과 draggableId를 동일하게 해줘야함.
//key를 Index로 한 경우 Complie Err 발생.

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    background: #0e011c;
    :focus {
        border: none;
        outline: none;
    }
    :active {
        border: none;
        outline: none;
    }
    border: none;
    outline: none;
`;

const BackImg = styled.img.attrs({ src: backgroundImg })`
    height: 100vh;
    min-height: 700px;
`;

/* 여기서부터 File, LP판 Components */

const FileImg = styled.img.attrs({ src: fileImg })`
    position: absolute;
    width: 6.3%;
    height: 12%;
    top: 14%;
    left: 22%;

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
    left: 30.5%;
`;

const FileBoard = styled.ul`
    z-index: 4;
    position: relative;
    top: 0px;
    left: 0px;
    width: auto;

    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);

    backdrop-filter: blur(3px);
    border-radius: 5px;
    padding: 10px;
    min-width: 110px;
    min-height: 120px;
    //transition: 0.2s ease-in-out;

    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(232, 19, 169, 0.75);
        border-radius: 5px 0px 0px 5px;
        box-shadow: 0px 0px 5px black;
    }
`;

//LP Board & Queue
//보이는 PlayerImg & displayToggleHander내장.
const LpPlayerInteractive = styled.img.attrs({ src: lpPlayerGif })`
    position: absolute;
    padding: 1% 0px;
    bottom: 28.3%;
    right: 23%;
    //filter: drop-shadow(0 0 10px bisque);

    width: 14.8%;
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

const SoundWave = styled(motion.img)`
    position: absolute;
    bottom: 46.5%;
    right: 20.5%;

    //prevent Drag Event
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
`;

//Droppable 담당.
const LpPlayerDrop = styled.div`
    position: absolute;
    padding: 1% 0px;

    bottom: 29.5%;
    right: 22.5%;
    height: 12.5%;
    width: 15.8%;

    border-radius: 30%;
`;

//LpPlayer.
const LpPlayerContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 32%;
    right: 27%;
`;

const PlayerBoard = styled.div<IPlayerQueueLength>`
    position: fixed;

    z-index: 3;
    //Default

    /*
    Droppable일때 RBD는 board의 display가 아래로만 확장한다는 한계가 있음.
    -> direction = "horizontal"쓰면 됨!
    Hover로 top의 position을 처리할 경우, Draggable의 어디를 클릭하느냐에 따라 유의미한 오차가 발생.
    따라서, props에서 draggingOver일 때, top의 position이 변하도록 구현. 
    react-dnd쓰자..
    */

    top: ${(props) =>
        props.queueLength
            ? props.queueLength > 3
                ? 480 + 4 * -112.5
                : 480 + props.queueLength * -112.5
            : 368}px;

    top: ${(props) =>
        props.snapshot.isDraggingOver
            ? props.snapshot.draggingFromThisWith
                ? null
                : props.queueLength > 3
                ? 480 + 4 * -112.5
                : `${480 + (props.queueLength + 1) * -112.5}px`
            : null};

    right: ${(props) =>
        props.lpPlayerDisplay
            ? props.queueLength > 4
                ? "0px"
                : "0px"
            : props.queueLength > 4
            ? "-148px"
            : "-137px"};
    padding: 10px;

    padding-right: ${(props) => (props.queueLength > 4 ? "10px" : "17px")};

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(232, 19, 169, 0.75);
        border-radius: 5px;
        box-shadow: 0px 0px 5px black;
    }

    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px 0px 0px 5px;
    transition: 0.09s ease-in-out;
    min-width: 110px;
    min-height: 120px;
    max-height: 470px;
    overflow-y: auto;
    overflow-x: hidden;
`;

interface IWelcomeBtn {
    welcomeDisplay: boolean;
}

const WelcomeBtn = styled.div<IWelcomeBtn>`
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.2s ease-in-out;
    ${(props) =>
        props?.welcomeDisplay
            ? css`
                  opacity: 1;
              `
            : css`
                  opacity: 0;
                  visibility: hidden;
              `};
    :hover {
        cursor: pointer;
    }
`;

const WelcomeLabel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 45px;
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.7);

    top: 30%;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0px 0px 25px black;
    width: 100%;
    height: 33%;
`;

/* Framer Motion */
const soundWaveVar = {
    from: {
        opacity: 0,
        y: 20,
        rotateZ: "16deg",
    },
    to: {
        opacity: 1,
        y: 0,
        rotateZ: "16deg",
    },
    exit: {
        opacity: 0,
        y: -40,
        transition: { duration: 0.3 },
    },
};

function App() {
    //Atom
    const [lps, setLps] = useRecoilState(lpState);
    const [fileDisplayToggle, setFileDisplayToggle] =
        useRecoilState(fileDisplayAtom);
    const [welcomeDisplay, setWelcomeDisplay] =
        useRecoilState(welcomeDisplayAtom);

    //motion-framer draggable
    const catFrameRef = React.useRef<HTMLDivElement>(null);

    //welcomeDisplay
    const [cassetteSound] = useSound(cassetteSFX);

    const [onClickSound] = useSound(onClickSFX);
    const [openSound] = useSound(openSoundSFX);
    const [closeSound] = useSound(closeSoundSFX);
    const [bgCloseSound] = useSound(bgCloseSFX);

    //LP Player Display Start
    const [playerDown] = useSound(playerDownSFX);
    const [playerUpOpen] = useSound(playerUpOpenSFX);
    const [playerUpClose] = useSound(playerUpCloseSFX);
    const [bgplayerClose] = useSound(bgplayerCloseSFX);

    const welcomeClickHandler = () => {
        if (welcomeDisplay) {
            cassetteSound();
        }
        setWelcomeDisplay((prev) => !prev);
    };

    //Mel
    const [lpPlayerDisplay, setLpPlayerDisplay] =
        useRecoilState(lpQueueDisplayAtom);

    const lpPlayerClickHandler = () => {
        setLpPlayerDisplay((prev) => !prev);
    };

    const playerMouseDown = () => {
        return playerDown();
    };

    const playerMouseUp = () => {
        if (!lpPlayerDisplay) {
            return playerUpOpen();
        }
        return playerUpClose();
    };

    //LP Player Display End

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
                bgplayerClose();
                return setLpPlayerDisplay((prev) => !prev);
            }
        }

        if (lpPlayerDisplay) {
            bgplayerClose();
            setLpPlayerDisplay((prev) => !prev);
            return;
        }
    };

    const disableScroll = () => {
        // Get the current page scroll position
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
    };

    const enableScroll = () => {
        window.onscroll = function () {};
    };

    const onDragStart = (e: any) => {
        disableScroll();
    };

    const onDragEnd = (info: DropResult) => {
        enableScroll();
        const { source, destination } = info;
        if (!destination) return;

        if (destination?.droppableId === source.droppableId) {
            setLps((prev) => {
                const newArray = [...lps[source.droppableId]];
                const targetLp = newArray.splice(source.index, 1);
                newArray.splice(destination.index, 0, targetLp[0]);

                return {
                    ...prev,
                    [source.droppableId]: newArray,
                };
            });
        }

        //다른 Board 내에서 드랍하는 경우.

        if (destination?.droppableId !== source.droppableId) {
            setLps((prev) => {
                const srcArray = [...lps[source.droppableId]];
                const desArray = [...lps[destination.droppableId]];
                const targetLp = srcArray.splice(source.index, 1)[0];
                desArray.splice(destination.index, 0, targetLp);

                return {
                    ...prev,
                    [source.droppableId]: srcArray,
                    [destination.droppableId]: desArray,
                };
            });
        }
    };

    const [kick] = useSound(kickSFX);
    const [shaker] = useSound(shakerSFX);
    const [rim] = useSound(rimSFX);
    const [z] = useSound(zSFX);
    const [s] = useSound(sSFX);
    const [x] = useSound(xSFX);
    const [d] = useSound(dSFX);
    const [c] = useSound(cSFX);
    const [v] = useSound(vSFX);
    const [g] = useSound(gSFX);
    const [b] = useSound(bSFX);
    const [h] = useSound(hSFX);
    const [n] = useSound(nSFX);
    const [j] = useSound(jSFX);
    const [m] = useSound(mSFX);
    const [comma] = useSound(commaSFX);
    const [l] = useSound(lSFX);
    const [dot] = useSound(dotSFX);
    const [sc] = useSound(scSFX);
    const [slash] = useSound(slashSFX);

    const keyMapObj = {
        Digit1: kick,
        Digit2: shaker,
        Digit3: rim,
        KeyZ: z,
        KeyS: s,
        KeyX: x,
        KeyD: d,
        KeyC: c,
        KeyV: v,
        KeyG: g,
        KeyB: b,
        KeyH: h,
        KeyN: n,
        KeyJ: j,
        KeyM: m,
        Comma: comma,
        KeyL: l,
        Period: dot,
        Semicolon: sc,
        Slash: slash,
    };

    const percHandler = (e: React.KeyboardEvent) => {
        //@ts-ignore
        if (keyMapObj[e.code]) {
            //@ts-ignore
            keyMapObj[e.code]();
        }
    };

    /* soundWaveHandler */
    const isPlaying = useRecoilValue(isPlayingState);
    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Header></Header>
            {/* React Helmet */}
            {welcomeDisplay ? null : <SoundBox />}
            <Wrapper ref={catFrameRef} onKeyDown={percHandler} tabIndex={0}>
                {/* Wrapper : relative 하위 컴포넌트 absolute, 반응형써서 전부 Wrapper에 맞추기. */}
                <BackImg onClick={backgroundClickHandler}></BackImg>

                {/* absolute를 Wrapper에 걸고 아래 IMG랑 그 아래 FileDisplay에 relative 걸어보기. */}
                {/*File board*/}
                <FileImg
                    onClick={lpDisplayToggle}
                    onMouseDown={lpMouseDown}
                    onMouseUp={lpMouseUp}
                />
                {fileDisplayToggle ? (
                    <FileContainer>
                        <Droppable droppableId="file">
                            {(provided) => (
                                //드로퍼블 child 시작

                                <FileBoard
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {lps["file"].map((v, i) => (
                                        <DragabbleLp
                                            v={v}
                                            i={i}
                                            key={v}
                                        ></DragabbleLp>
                                    ))}
                                    {provided.placeholder}
                                </FileBoard>
                                //드로퍼블 child 끝
                            )}
                        </Droppable>
                    </FileContainer>
                ) : null}
                {/* LP Board */}
                <LpPlayerContainer>
                    <Droppable droppableId="player">
                        {(provided, snapshot) => (
                            <PlayerBoard
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                //@ts-ignore
                                queueLength={lps["player"].length}
                                snapshot={snapshot}
                                lpPlayerDisplay={lpPlayerDisplay}
                            >
                                {lps["player"].map((v, i) => (
                                    <DragabbleLp
                                        v={v}
                                        i={i}
                                        key={v}
                                        providedInfo={provided}
                                    ></DragabbleLp>
                                ))}
                                {provided.placeholder}
                            </PlayerBoard>
                        )}
                    </Droppable>
                </LpPlayerContainer>
                <LpPlayerDrop>
                    <Droppable droppableId="player">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </LpPlayerDrop>

                {/* Framer-Motion */}
                <AnimatePresence>
                    {isPlaying ? (
                        <SoundWave
                            src={soundWave}
                            variants={soundWaveVar}
                            initial="from"
                            animate="to"
                            exit="exit"
                        />
                    ) : null}
                </AnimatePresence>

                <LpPlayerInteractive
                    onClick={lpPlayerClickHandler}
                    onMouseDown={playerMouseDown}
                    onMouseUp={playerMouseUp}
                />
                <SoundStateHandler></SoundStateHandler>
                <LoFiCat catFrameRef={catFrameRef} />
                <WelcomeBtn
                    onClick={welcomeClickHandler}
                    welcomeDisplay={welcomeDisplay}
                >
                    <WelcomeLabel>Click Me!</WelcomeLabel>
                </WelcomeBtn>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
