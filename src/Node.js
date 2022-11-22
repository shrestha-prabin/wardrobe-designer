import "./App.css";
import { Container, Section, Bar } from "react-simple-resizer";
import React, {
  Fragment,
  useRef,
  useContext,
} from "react";
import AppContext from "./AppContext";

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
      <Container className="relative h-full" vertical={vertical}>
        <Section
          className="section"
          style={appContext.colorsVisible && { backgroundColor: color }}
        >
          {appContext.buttonsVisible && (
            <div className="absolute h-full w-full flex items-center justify-center">
              <div className="bg-white rounded flex flex-col items-center">
                <div className="rounded bg-white w-full p-1 flex flex-row flex-wrap justify-center items-center">
                  <button
                    className="h-6 w-6 text-black relative rotate-90 overflow-hidden"
                    title="Split Vertically"
                    onClick={() => splitNode(appContext.segmentCount, id, true)}
                  >
                    <span className="material-icons-outlined md-24">
                      view_column_outline
                    </span>
                  </button>
                  <button
                    className="h-6 w-6 text-black overflow-hidden"
                    title="Split Horizontally"
                    onClick={() =>
                      splitNode(appContext.segmentCount, id, false)
                    }
                  >
                    <span className="material-icons-outlined overflow-hidden">
                      view_column_outline
                    </span>
                  </button>
                  <button
                    className="h-6 w-6 text-red-500 overflow-hidden"
                    onClick={() => deleteNode(id)}
                  >
                    <span className="material-icons-outlined red-600">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </Section>
      </Container>
    );
  }
  return (
    <Container
      className="relative h-full"
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

            {i < children.length - 1 && <Bar className="bg-black" size={8} />}
          </Fragment>
        );
      })}
    </Container>
  );
};

export default React.memo(Node);
