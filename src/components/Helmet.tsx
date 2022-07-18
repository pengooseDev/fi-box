import Helmet from "react-helmet";
import TitleImg from "../assets/img/lp1.png";

const Header = () => {
    return (
        <Helmet>
            <title>Fi-Box</title>
            <link
                href={TitleImg}
                rel="shortcut icon"
                type="image/x-icon"
            ></link>
        </Helmet>
    );
};

export default Header;
