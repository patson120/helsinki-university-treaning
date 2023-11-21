import React from "react";

const Content = ({ parts }) => {
  return (
    <div>
      {
        parts.map((part) => <Part part={part} key={part.id} />)
      }
    </div>
  );
}

export default Content;

export const Part = ({ part }) => {
  const { name, exercises } = part
  return (
    <p>
      {name} {exercises}
    </p>
  );
}