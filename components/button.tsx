'use client'
import React from "react";

export const colorVariants = {
  selected:
    "m-4 border-b-4 h-16 w-16 text-white font-bold py-2 px-4 hover: rounded bg-synth-brown-100 border-synth-brown-600",
  unselected:
    "m-4 border-b-4 h-16 w-16 text-white font-bold py-2 px-4 hover: rounded bg-synth-brown-200 border-synth-brown-400",
};

function Button() {
  const [selected, setSelected] = React.useState(false);

  return (
      <button
        className={
          selected
            ? colorVariants.selected
              : colorVariants.unselected
        }
        onClick={() => setSelected(!selected)}
      ></button>
  );
}

export default Button;