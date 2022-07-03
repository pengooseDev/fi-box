import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { IDragabbleLpProps } from "../atoms";
import React from "react";

/* LpImg */
import lpImg from "../assets/img/lp1.png";

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

const DragabbleLp = ({ v, i }: IDragabbleLpProps) => {
    return (
        <Draggable draggableId={v} index={i} key={v}>
            {(provided) => (
                <>
                    <LpCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <LpCardImg></LpCardImg>
                        <div>
                            value : {v}, index :{i}
                        </div>
                    </LpCard>
                </>
            )}
        </Draggable>
    );
};

//State의 무분별한 re-Rendering 방지 및 DragEnd이후 State가 결정되었을 때 변화가 있는 값들만 re-Render
export default React.memo(DragabbleLp);
