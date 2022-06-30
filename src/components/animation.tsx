import { keyframes } from "styled-components";

export const hoverAnimation = keyframes`
0% {
    transform: rotate(0deg);
}
2%{
    transform: rotate(0deg);
}

12% {
    transform: rotate(5deg);
}

22% {
    transform: rotate(-5deg);
}

32% {
    transform: rotate(5deg);
}

42% {
    transform: rotate(-5deg);
}

52%{
    transform: rotate(5deg);
}

62%{
    transform: rotate(-5deg);
}

72%{
    transform: rotate(0deg);
}

100% {
    transform: rotate(0deg);
}
`;

export const defaultFileAnimation = keyframes`

0% {
    transform: scale(1,1);
}
40% {
    transform: scale(1,1);
}

42% {
    transform: scale(0.9,1.1);
}

44% {
    transform: scale(1.1,0.9);
}

46% {
    transform: scale(0.9,1.1);
}

48% {
    transform: scale(1,1);

}

100% {
}
`;
