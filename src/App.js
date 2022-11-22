import "./App.css";
import React, { useEffect, useState } from "react";
import Node from "./Node";
import AppContext from "./AppContext";
import Controls from "./components/Controls";
import RulerView from "./components/RulerView";

const App = () => {
  const [data, setData] = useState({});
  const [dataStack, setDataStack] = useState([]);

  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [colorsVisible, setColorsVisible] = useState(true);
  const [gridVisible, setGridVisible] = useState(true);
  const [height, setHeight] = useState(6);
  const [width, setWidth] = useState(6);
  const [segmentCount, setSegmentCount] = useState(2);

  useEffect(() => {
    init();

    window.onbeforeunload = () => {
      // return "";
    };
  }, []);

  const addData = (data) => {
    setDataStack((prevData) => [...prevData, data]);
  };

  useEffect(() => {
    setData(dataStack[dataStack.length - 1]);

    window.onkeydown = (e) => {
      switch (e.key.toUpperCase()) {
        case "Z":
          undo();
          break;

        case "C":
          setColorsVisible((visible) => !visible);
          break;

        case "B":
          setButtonsVisible((visible) => !visible);
          break;

        case "G":
          setGridVisible((visible) => !visible);
          break;

        default:
          break;
      }
    };
  }, [dataStack]);

  const init = () => {
    addData({
      children: [
        {
          id: new Date().getTime(),
          vertical: false,
          children: [],
          color: randomColor(),
          // defaultSize: 100
        },
      ],
    });
  };

  const addLeft = () => {
    addData({
      ...data,
      children: [
        {
          id: new Date().getTime(),
          vertical: false,
          children: [],
          defaultSize: 100,
          color: randomColor(),
        },
        ...data.children,
      ],
    });
  };

  const addRight = () => {
    addData({
      ...data,
      children: [
        ...data.children,
        {
          id: new Date().getTime(),
          vertical: false,
          children: [],
          color: randomColor(),
        },
      ],
    });
  };

  const splitNode = (count, id, vertical) => {
    addData(updateTreeNode(count, data, id, vertical));
  };

  useEffect(() => {
    // console.log("data", data);
  }, [data]);

  const updateTreeNode = (count, node, id, vertical) => {
    if (node.id === id) {
      let color = randomColor();
      return {
        ...node,
        vertical,
        children: Array.from({ length: count }).map((_, i) => ({
          id: new Date().getTime() + i,
          color: color,
        })),
      };
    } else {
      return {
        ...node,
        children: node.children?.map((node) => {
          return updateTreeNode(count, node, id, vertical);
        }),
      };
    }
  };

  const deleteNode = (id) => {
    console.log("delete", id, data);
    addData(_deleteNode(data, id));
  };

  const _deleteNode = (node, id) => {
    console.log(node.children?.map((item) => item.id));

    if (node.children?.map((item) => item.id).includes(id)) {
      // console.log("node found");
      return {
        ...node,
        children: node.children.filter((item) => item.id !== id),
      };
    } else {
      return {
        ...node,
        children: node.children?.map((child) => _deleteNode(child, id)),
      };
    }
  };

  const undo = () => {
    if (dataStack.length > 1) {
      setDataStack((data) => data.splice(0, data.length - 1));
    }
  };

  return (
    <AppContext.Provider
      value={{
        buttonsVisible,
        colorsVisible,
        gridVisible,
        segmentCount,
        height,
        width,
        setButtonsVisible,
        setColorsVisible,
        setGridVisible,
        setSegmentCount,
        setHeight,
        setWidth,
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <div className="flex flex-col items-center h-screen w-screen bg-slate-200">
        <div className="flex items-center justify-center h-[85vh] w-[100vh] mt-6 space-x-4">
          {true && (
            <button
              className="font-bold text-sm text-gray-800 border-2 border-slate-400 border-dashed p-4 rounded outline-none"
              onClick={addLeft}
            >
              ADD
            </button>
          )}

          <AppContext.Consumer>
            {({ height, width }) => {
              return (
                <div className="relative flex items-center justify-center h-[80vh] w-[80vh]">
                  <div
                    className={`border-8 border-solid shadow-2xl border-black`}
                    style={{
                      height: `${(height / Math.max(height, width)) * 100}%`,
                      width: `${(width / Math.max(height, width)) * 100}%`,
                    }}
                  >
                    <Node
                      id={data?.id}
                      vertical={data?.vertical}
                      children={data?.children}
                      defaultSize={data?.defaultSize}
                      splitNode={splitNode}
                      deleteNode={deleteNode}
                    />
                  </div>

                  {gridVisible && (
                    <RulerView
                      className="absolute top-0 left-0 h-full w-full bg-white/0 pointer-events-none"
                      height={height}
                      width={width}
                    />
                  )}
                </div>
              );
            }}
          </AppContext.Consumer>

          {true && (
            <button
              className="font-bold text-sm text-gray-800 border-2 border-slate-400 border-dashed p-4 rounded outline-none"
              onClick={addRight}
            >
              ADD
            </button>
          )}
        </div>
      </div>
      <Controls onUndo={undo} />
    </AppContext.Provider>
  );
};

export default App;

// const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16)

const randomColor = () => {
  const colors = [
    '#EA907A', '#FBC687', '#F4F7C5', '#AACDBE',
    '#DFF4F3', '#DDE7F2', '#B9BBDF', '#878ECD',
    '#FFF5E4', '#FFE3E1', '#FFD1D1', '#FF9494',
    '#E3FDFD', '#CBF1F5', '#A6E3E9', '#71C9CE',
    '#BE9FE1', '#C9B6E4', '#E1CCEC', '#F1F1F6',
    '#F9ECEC', '#F0D9DA', '#C8D9EB', '#ECF2F9',
    '#FFEDDB', '#EDCDBB', '#E3B7A0', '#BF9270',
    '#F5F0BB', '#C4DFAA', '#90C8AC', '#73A9AD',
    '#FF7B54', '#FFB26B', '#FFD56B', '#939B62'
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
