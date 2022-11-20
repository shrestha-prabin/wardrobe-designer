import "./App.css";
import { Container, Section, Bar } from "react-simple-resizer";
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import AppContext from "./AppContext";

const containerStyle = {
  position: "relative",
  height: "100%",
  userSelect: "none",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const barStyle = {
  background: "black",
};

const Node = ({
  id,
  vertical,
  children,
  defaultSize,
  splitNode,
  deleteNode,
  color,
}) => {
  const containerRef = useRef();

  const [splitCount, setSplitCount] = useState(2);

  const appContext = useContext(AppContext);

  const updateSizes = () => {};

  // useEffect(() => {
  //   setTimeout(() => {
  //     const container = containerRef.current;
  //     console.log({ containerRef: containerRef.current });

  //     if (defaultSize && container) {
  //       console.log(defaultSize);
  //       const resizer = container.getResizer();
  //       resizer.resizeSection(0, { toSize: 100 });
  //       container.applyResizer(resizer);
  //     }
  //   }, 100);
  // }, [defaultSize, containerRef]);

  if (!children || children?.length === 0) {
    return (
      <Container style={containerStyle} vertical={vertical}>
        <Section
          className="section"
          style={appContext.colorsVisible && { backgroundColor: color }}
        >
          {appContext.buttonsVisible && (
            <div style={{ position: "absolute" }}>
              <div>
                <button
                  onClick={() =>
                    setSplitCount((count) => Math.max(2, count - 1))
                  }
                >
                  -
                </button>
                <button>{splitCount}</button>
                <button
                  onClick={() =>
                    setSplitCount((count) => Math.min(10, count + 1))
                  }
                >
                  +
                </button>
              </div>
              <div>
                <button
                  style={{ fontSize: 10 }}
                  onClick={() => splitNode(splitCount, id, true)}
                >
                  V
                </button>
                <button
                  style={{ fontSize: 10 }}
                  onClick={() => splitNode(splitCount, id, false)}
                >
                  H
                </button>
                <button style={{ fontSize: 10 }} onClick={() => deleteNode(id)}>
                  D
                </button>
              </div>
            </div>
          )}
        </Section>
      </Container>
    );
  }
  return (
    <Container
      style={containerStyle}
      vertical={vertical}
      ref={containerRef}
      onClick={() => updateSizes()}
    >
      {children?.map((item, i) => {
        return (
          <Fragment key={i}>
            <Section className="section">
              <Node
                id={item.id}
                vertical={item.vertical}
                children={item.children}
                defaultSize={item.defaultSize}
                splitNode={splitNode}
                deleteNode={deleteNode}
                color={item.color}
              />
            </Section>

            {i < children.length - 1 && <Bar style={barStyle} size={8} />}
          </Fragment>
        );
      })}
    </Container>
  );
};

export default React.memo(Node);
