import ScrollToTop from "react-scroll-to-top";
import {ReactComponent as ArrowUp} from "../../assets/icons/ArrowUp.svg";
import "./ScrollTop.css";

const ScrollTop = () => {
  return <ScrollToTop top={40} component={<ArrowUp />} className='top-scroll' />;
};

export default ScrollTop;
