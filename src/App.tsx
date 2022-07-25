import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import backgroundImg from "./assets/img/background.png";
import {
    welcomeDisplayAtom,
    fileDisplayAtom,
    lpQueueDisplayAtom,
    lpState,
    isPlayingState,
    windowDisplayState,
} from "./atoms";
import useSound from "use-sound";
import bgCloseSFX from "./assets/audio/bgClose.mp3";
import DragabbleLp from "./components/DraggableLp";
/* Header */
import Header from "./components/Helmet";
/* Cat */
import LoFiCat from "./components/LofiCat";
/* LpPlayer */
import {
    FileImg,
    FileContainer,
    FileBoard,
    LpPlayerInteractive,
    SoundWave,
    LpPlayerDrop,
    LpPlayerContainer,
} from "./components/file";
/* fileBoard */
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
/* BackgroundOut */
import BackgroundOut from "./components/backgroundOut";
/* Info */
import infoSrc from "./assets/img/info.png";
import infoToggleSrc from "./assets/img/infoToggle.png";
import {
    InfoDisplay,
    InfoToggle,
    InfoDisplayVar,
} from "./components/information";
import { infoToggleState } from "./atoms";
import WindowContainer from "./components/window";
/* Motion-framer */
import { AnimatePresence } from "framer-motion";
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
/* Perc */
import kickSFX from "./assets/audio/perc/kick.mp3";
import shakerSFX from "./assets/audio/perc/shaker.mp3";
import rimSFX from "./assets/audio/perc/rim.mp3";
/* Flip */
import flipSrc from "./assets/audio/flip.mp3";
import unflippedSrc from "./assets/audio/unflipped.mp3";
/* Variants */
import { welcomeLabelVar, soundWaveVar, fileVar } from "./variants";

/* Overlay */
import {
    WelcomeOverlayToggle,
    WelcomeOverlay,
    welcomeOverlayVar,
    WelcomeLabel,
} from "./components/overlay";

/* Player */
import { PlayerBoard } from "./components/player";

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    z-index: 1;
    background: #100120;
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

const enableScroll = () => {
    window.onscroll = function () {};
};

const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
};

const onDragStart = (e: any) => {
    disableScroll();
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

    const [windowDisplay, setWindowDisplay] =
        useRecoilState(windowDisplayState);
    const [infoState, setInfoState] = useRecoilState(infoToggleState);

    const welcomeClickHandler = () => {
        if (welcomeDisplay) {
            cassetteSound();
            return setWelcomeDisplay((prev) => !prev);
        }
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
                if (windowDisplay) {
                    setWindowDisplay((prev) => !prev);
                }

                if (infoState) {
                    infoToggleHandler();
                }
                return setLpPlayerDisplay((prev) => !prev);
            }
        }
        if (lpPlayerDisplay) {
            bgplayerClose();
            setLpPlayerDisplay((prev) => !prev);
        }

        if (windowDisplay) {
            setWindowDisplay((prev) => !prev);
        }

        if (infoState) {
            unflipped();

            setInfoState((prev) => !prev);
        }
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

    /* KeyMapping */
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
    const [flip] = useSound(flipSrc);
    const [unflipped] = useSound(unflippedSrc);

    const infoToggleHandler = () => {
        if (infoState) {
            unflipped();
            return setInfoState((prev) => !prev);
        }

        flip();
        return setInfoState((prev) => !prev);
    };

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Header></Header>
            {/* React Helmet */}
            {welcomeDisplay ? (
                <WelcomeOverlayToggle onClick={welcomeClickHandler} />
            ) : null}
            {welcomeDisplay ? null : (
                <InfoToggle onClick={infoToggleHandler} src={infoToggleSrc} />
            )}
            {welcomeDisplay ? null : <SoundBox />}
            <Wrapper ref={catFrameRef} onKeyDown={percHandler} tabIndex={0}>
                <AnimatePresence>
                    {infoState ? (
                        <InfoDisplay
                            onClick={infoToggleHandler}
                            src={infoSrc}
                            variants={InfoDisplayVar}
                            initial="from"
                            animate="to"
                            exit="exit"
                        />
                    ) : null}
                </AnimatePresence>

                {/* Wrapper : relative 하위 컴포넌트 absolute, 반응형써서 전부 Wrapper에 맞추기. */}

                <BackgroundOut />
                {/* absolute를 Wrapper에 걸고 아래 IMG랑 그 아래 FileDisplay에 relative 걸어보기. */}
                {/*File board*/}
                <FileImg
                    onClick={lpDisplayToggle}
                    onMouseDown={lpMouseDown}
                    onMouseUp={lpMouseUp}
                />
                <AnimatePresence>
                    {fileDisplayToggle ? (
                        <FileContainer
                            variants={fileVar}
                            initial="from"
                            animate="to"
                            exit="exit"
                        >
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
                </AnimatePresence>
                <WindowContainer />
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
                <AnimatePresence>
                    {welcomeDisplay ? (
                        <WelcomeOverlay
                            variants={welcomeOverlayVar}
                            initial="from"
                            animate="to"
                            exit="exit"
                            transition={{
                                default: { duration: 0.7 },
                                afterEffect: { duration: 1, delay: 0.7 },
                            }}
                        >
                            <WelcomeLabel
                                variants={welcomeLabelVar}
                                initial="from"
                                animate="to"
                                exit="exit"
                            >
                                Click Me!
                            </WelcomeLabel>
                        </WelcomeOverlay>
                    ) : null}
                </AnimatePresence>
                <BackImg onClick={backgroundClickHandler}></BackImg>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
