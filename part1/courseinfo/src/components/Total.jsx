import React from "react";

const Total = ({ parts }) => {
    return (
        <p><b>Total of {parts.reduce((total, item) => total + item.exercises, 0)} exercices</b></p>
    );
}

export default Total;