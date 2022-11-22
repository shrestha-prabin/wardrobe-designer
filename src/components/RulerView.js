import React from "react";

const RulerView = ({ height, width, ...props }) => {
  const count = Math.max(height, width);

  return (
    <div {...props}>
      <div
        className="absolute w-full h-full grid border-[0.5px]"
        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: count }).map((_, i) => {
          return (
            <div className="col-span-1 border-x-[0.5px] border-black/20 h-full"></div>
          );
        })}
      </div>

      <div
        className={`absolute w-full h-full grid border-[0.5px]`}
        style={{ gridTemplateRows: `repeat(${count}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: count }).map((_, i) => {
          return (
            <div className="row-span-1 border-y-[0.5px] border-black/20 h-full" />
          );
        })}
      </div>
    </div>
  );
};

export default RulerView;
