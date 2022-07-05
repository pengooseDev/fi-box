import "styled-components";

/*여기서 declare module을 styled-components에 사용하면, 
 styled-components에서 아래 선언한 DefaultTheme이라는 
 인터페이스를 import할 수 있음.*/
declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        boardColor: string;
        cardColor: string;
        queueLength: any;
    }
}
