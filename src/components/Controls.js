import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { classnames } from "tailwindcss-classnames";
import AppContext from "../AppContext";
import Counter from "./Counter";

const SizeControls = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="flex flex-row space-x-4">
      <div className="space-x-2">
        <label>Height</label>
        <input
          className="border outline-none p-2 w-20"
          max={12}
          min={1}
          type="number"
          value={appContext.height}
          onChange={(e) => appContext.setHeight(e.target.value)}
        />
      </div>
      <div className="space-x-2">
        <label>Width</label>
        <input
          className="border outline-none p-2 w-20"
          type="number"
          max={12}
          min={1}
          value={appContext.width}
          onChange={(e) => appContext.setWidth(e.target.value)}
        />
      </div>
    </div>
  );
};

const ActionControls = ({ onUndo }) => {
  const appContext = useContext(AppContext);

  return (
    <div className="flex flex-row space-x-4">
      <button
        className="flex flex-row items-center bg-white font-semibold text-sm outline-none focus:ring-2 focus:rounded p-1 active:text-black/50"
        onClick={onUndo}
      >
        <span className="material-symbols-outlined">undo</span>
        Undo (Z)
      </button>

      <button
        className={classnames(
          "flex flex-row items-center bg-white font-semibold text-sm outline-none focus:ring-2 focus:rounded p-1 active:text-black/50",
          {
            ["line-through"]: !appContext.buttonsVisible,
          }
        )}
        onClick={() => appContext.setButtonsVisible(!appContext.buttonsVisible)}
      >
        Buttons (B)
      </button>

      <button
        className={classnames(
          "flex flex-row items-center bg-white font-semibold text-sm outline-none focus:ring-2 focus:rounded p-1 active:text-black/50",
          {
            ["line-through"]: !appContext.colorsVisible,
          }
        )}
        onClick={() => appContext.setColorsVisible(!appContext.colorsVisible)}
      >
        Colors (C)
      </button>

      <button
        className={classnames(
          "flex flex-row items-center bg-white font-semibold text-sm outline-none focus:ring-2 focus:rounded p-1 active:text-black/50 ",
          {
            ["line-through"]: !appContext.gridVisible,
          }
        )}
        onClick={() => appContext.setGridVisible(!appContext.gridVisible)}
      >
        Grid (G)
      </button>
    </div>
  );
};

const Controls = ({ onUndo }) => {
  const appContext = useContext(AppContext);

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-2xl">
      <div className="container mx-auto my-4 flex flex-row items-center justify-between">
        <ActionControls onUndo={onUndo} />
        <div className="h-8 w-[1px] bg-gray-200" />
        <div className="flex flex-row items-center space-x-2">
          <label>Split Count</label>
          <Counter
            defaultValue={appContext.segmentCount}
            onChange={(count) => appContext.setSegmentCount(count)}
          />
        </div>
        <div className="h-8 w-[1px] bg-gray-200" />
        <SizeControls />

        <div className="h-8 w-[1px] bg-gray-200" />

        <div>
          <Link
            className="outline-none focus:ring-2 focus:rounded flex p-2"
            to={"/view"}
            target="_blank"
          >
            <span className="material-icons-outlined">view_in_ar</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Controls;
