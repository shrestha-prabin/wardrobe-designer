import React, { useEffect, useReducer } from "react";

export const counterReducer = (state, action) => {
  switch (action.type) {
    case "-":
      return Math.max(2, state - 1);

    case "+":
      return Math.min(12, state + 1);

    case "=":
      return action.payload;

    default:
      return state;
  }
};

const Counter = ({ defaultValue, onChange }) => {
  const initialState = defaultValue;
  const [state, dispatch] = useReducer(counterReducer, initialState);

  useEffect(() => {
    onChange(state);
  }, [state]);

  useEffect(() => {
    dispatch({ type: "=", payload: defaultValue });
  }, [defaultValue]);

  return (
    <div className="flex items-center select-none">
      <button
        className="h-8 w-8 border-cyan-500 border-2 rounded flex justify-center items-center outline-none focus:ring-2 ring-offset-1"
        onClick={() => dispatch({ type: "-" })}
      >
        <span className="material-icons-outlined">remove</span>
      </button>
      <span className="min-w-[2em] text-center font-bold text-lg">{state}</span>
      <button
        className="h-8 w-8 bg-cyan-500 rounded flex justify-center items-center text-white outline-none focus:ring-2 ring-offset-1"
        onClick={() => dispatch({ type: "+" })}
      >
        <span className="material-icons-outlined">add</span>
      </button>
    </div>
  );
};

export default Counter;
