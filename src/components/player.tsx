import styled from "styled-components";
import { IPlayerQueueLength } from "../atoms";

export const PlayerBoard = styled.div<IPlayerQueueLength>`
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
