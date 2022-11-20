import "./App.css";
import { Container, Section, Bar } from "react-simple-resizer";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Node from "./Node";
import AppContext from "./AppContext";

const App = () => {
  const outline = {
    borderWidth: 8,
    borderColor: "black",
    borderStyle: "solid",
  };

  const [data, setData] = useState({});
  const [dataStack, setDataStack] = useState([]);

  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [colorsVisible, setColorsVisible] = useState(true);

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
        case "T":
          toggleButtons();
          break;

        case "Z":
          if (e.metaKey || e.ctrlKey) {
            undo();
          }
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
        children: node.children.filter((item) => item.id != id),
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

  const toggleButtons = () => {
    setButtonsVisible((visible) => !visible);
  };

  const toggleColors = () => {
    setColorsVisible((visible) => !visible);
  };

  return (
    <AppContext.Provider
      value={{
        buttonsVisible,
        colorsVisible,
        setButtonsVisible,
        setColorsVisible,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          paddingTop: 40,
        }}
      >
        <div
          style={{
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {buttonsVisible && <button onClick={addLeft}>Add</button>}

          <div style={{ ...outline, flex: 1, height: 600, width: 600 }}>
            <Node
              id={data?.id}
              vertical={data?.vertical}
              children={data?.children}
              defaultSize={data?.defaultSize}
              splitNode={splitNode}
              deleteNode={deleteNode}
            />
          </div>

          {buttonsVisible && <button onClick={addRight}>Add</button>}
        </div>
        <br />
        <div>
          <button onClick={undo}>Undo</button>
          <button onClick={() => toggleButtons()}>Toggle</button>
          <button onClick={() => toggleColors()}>Color</button>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;

// const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16)

const randomColor = () => {
  const colors = [
    "#5A8C9A",
    "#84BAD2",
    "#B6A0DE",
    "#E2C756",
    "#CE4826",
    "#D64D5C",
    "#46845B",
    "#719E8D",
    "#8AB793",
    "#91A635",
    "#73A23E",
    "#3E448A",
    "#335CBD",
    "#577EB9",
    "#2A5B78",
    "#93A0AD",
    "#C5A47A",
    "#DDC590",
    "#E2DECB",
    "#67B5AB",
    "#803B4F",
    "#AC2290",
    "#D18195",
    "#A9C3EC",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
