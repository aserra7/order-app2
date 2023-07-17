import React from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
    const location = useLocation();

    window.scrollTo(0, 0)

    return null;
}

export default ScrollTop;