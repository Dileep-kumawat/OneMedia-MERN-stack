import React from 'react'
import "./spinner.css"

const Loader = ({ width }) => {
    const widthClass = {
        1: "w-1",
        2: "w-2",
        5: "w-5",
        6: "w-6",
        7: "w-7",
        10: "w-10",
    }[width] || "w-5"; 

    return <div className={`${widthClass} loader`}></div>;
};

export default Loader
