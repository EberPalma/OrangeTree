
"use client"

import { useEffect } from "react";
import NavBottom from "../components/nav-bottom.jsx";

export default function ProductsLayout( {children } ){

    useEffect(() => {
        require("../../styles/bootstrap.bundle.min.js");
    }, []);

    return (
        <>
            { children }
            <NavBottom/>
        </>
    );
}