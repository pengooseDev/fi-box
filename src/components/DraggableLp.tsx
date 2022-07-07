import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { IDragabbleLpProps } from "../atoms";
import React from "react";
import { useRecoilState } from "recoil";
import { lpState } from "../atoms";

/* LpImg */
import lpImg from "../assets/img/lp1.png";

//LP
const LpCard = styled.div`
    //background: rgba(72, 69, 61, 0.7);
    position: relative;
    border-radius: 50%;
    top: auto !important;
    left: auto !important;
    transition: 0.2s ease-in-out;
`;

const LpCardImg = styled.img.attrs({ src: lpImg })`
    width: 100px;
    padding: 5px;
    border-radius: 50%;
    transition: 0.2s ease-in-out;
    filter: drop-shadow(5px 5px 0px #222);
    :hover {
        filter: drop-shadow(3px 3px 8px rgba(255, 53, 104, 0.6));
    }
    :active {
        filter: drop-shadow(3px 3px 0px rgba(255, 53, 104, 0.8));
    }
`;

const LpClose = styled.div`
    position: absolute;
    right: -5px;
    top: -5px;

    color: white;
    background: rgba(0, 0, 0, 0.8);
    font-size: 20px;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 5px 7px 5px;
    width: 10px;
    height: 10px;
    border-radius: 3px;

    :hover {
        cursor: pointer;
    }
`;

const DragabbleLp = ({ v, i, providedInfo }: IDragabbleLpProps) => {
    const [lps, setLps] = useRecoilState(lpState);

    const playerCloseHandler = (e: any) => {
        setLps((prev) => {
            const targetData = e.target.parentNode.attributes.getNamedItem(
                "data-rbd-draggable-id"
            ).value;

            const fileArray = [...lps["file"]];
            const playerArray = [...lps["player"]];

            const targetIndex = playerArray.indexOf(targetData);
            const movedData = playerArray.splice(targetIndex, 1)[0];
            fileArray.push(movedData);

            return { ...prev, player: playerArray, file: fileArray };
        });
    };

    return (
        <Draggable draggableId={v} index={i} key={v}>
            {(provided) => (
                <>
                    <LpCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {providedInfo ? (
                            <LpClose onClick={playerCloseHandler}>x</LpClose>
                        ) : null}
                        <LpCardImg></LpCardImg>
                    </LpCard>
                </>
            )}
        </Draggable>
    );
};

//State의 무분별한 re-Rendering 방지 및 DragEnd이후 State가 결정되었을 때 변화가 있는 값들만 re-Render
export default React.memo(DragabbleLp);
