import React, { Fragment, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useControls } from "leva";

const thickness = 0.1;

const data = {
  children: [
    {
      id: 1669190061186,
      vertical: false,
      color: "#FFD56B",
      children: [
        {
          id: 1669190061497,
          color: "red",
          vertical: false,
          children: [
            {
              id: 1669190062630,
              color: "orange",
              children: [
                {
                  id: 1669190062630,
                  color: "red",
                },
                {
                  id: 1669190062629,
                  color: "green",
                },
                {
                  id: 1669190062630,
                  color: "blue",
                },
              ],
            },
            {
              id: 1669190062629,
              color: "yellow",
            },
            {
              id: 1669190062630,
              color: "orange",
            },
          ],
        },
        {
          id: 1669190061498,
          color: "green",
        },
      ],
    },
  ],
};

const NormalizedPane = ({
  parentWidth,
  parentHeight,
  width,
  height,
  color,
  position,
  offsetX = 0,
  offsetY = 0,
}) => {
  if (parentWidth) {
    position[0] = position[0] - parentWidth / 2 + width / 2 + offsetX;
    position[1] = position[1] + parentHeight / 2 - height / 2 + offsetY;
  }
  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, 0.2]} />
      <meshPhysicalMaterial
        color={color}
        transmission={1}
        reflectivity={1}
        metalness={0}
        roughness={0.2}
      />
    </mesh>
  );
};

// const PaneContainer = ({ width, height, position, color }) => {
//   let childWidth = width / 2;
//   let childHeight = height;

//   return (
//     <group>
//       <NormalizedPane
//         parentWidth={6}
//         parentHeight={6}
//         parentPosition={[0, 0, -0.2]}
//         width={childWidth}
//         height={childHeight}
//         color="red"
//         position={[0, 0, 0]}
//       />

//       <NormalizedPane
//         parentWidth={6}
//         parentHeight={6}
//         parentPosition={[0, 0, -0.2]}
//         width={childWidth}
//         height={childHeight}
//         color="green"
//         position={[childWidth, 0, 0]}
//       />
//     </group>
//   );
// };

const Cabinet = ({
  parentWidth,
  parentHeight,
  parentPosition,
  width,
  height,
  children,
  vertical,
  color,
  position,
  offsetX = 0,
  offsetY = 0,
}) => {
  const ref = useRef(null);

  // const [dimen, setDimen] = useState({ height: 0, width: 0, depth: 0 });

  useEffect(() => {
    // console.log(ref);
    // const position = ref.current.position;
    // const { width, height, depth } = ref.current.geometry.parameters;
    // setDimen({ width, height, depth });
    // console.log(ref.current.parent);
    // console.log(position, width, height, depth);
  }, []);

  if (!children || children.length == 0) {
    return (
      <NormalizedPane
        parentWidth={parentWidth}
        parentHeight={parentHeight}
        parentPosition={parentPosition}
        position={position}
        width={width}
        height={height}
        color={color}
        offsetX={offsetX + width}
      />
      // <mesh position={position}>
      //   <boxGeometry args={[width, height, 0.2]} />
      //   <meshPhysicalMaterial
      //     color={color}
      //     transmission={1}
      //     reflectivity={1}
      //     metalness={0}
      //     roughness={0.2}
      //   />
      // </mesh>
    );
  }

  const childrenWidth = width / children.length;
  const childrenHeight = height;

  return (
    <group position={position}>
      {/* <NormalizedPane
        width={width}
        height={height + 10}
        color="magenta"
        position={[0, 0, -10 * Math.random()]}
      /> */}

      {children.map((item, i) => {
        return (
          <Fragment key={i}>
            <Cabinet
              parentWidth={width}
              parentHeight={height}
              parentPosition={position}
              width={childrenWidth}
              height={childrenHeight}
              color={item.color}
              position={[childrenWidth * i, 0, 0]}
              children={item.children}
              offsetX={offsetX - childrenWidth / 2 - (childrenWidth / 2) * i}
            />
          </Fragment>
        );
      })}

      {/* <NormalizedPane
        parentWidth={width}
        parentHeight={height}
        parentPosition={[0, 0, -0.2]}
        width={childrenWidth}
        height={childrenHeight}
        color="green"
        position={[childrenWidth, 0, 0]}
      /> */}
    </group>
  );

  return (
    <group ref={ref} position={position}>
      {/* <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[width, height, 0.2]} />
        <meshPhysicalMaterial
          color={"orange"}
          transmission={1}
          reflectivity={1}
          metalness={0}
          roughness={0.2}
        />
      </mesh> */}

      <NormalizedPane
        position={position}
        width={width}
        height={height}
        color={"blue"}
      />

      {/* <PaneContainer width={width} height={height} vertical={vertical} /> */}

      {children.map((item, i) => {
        return (
          <Fragment key={i}>
            {/* <Cabinet
              width={childrenWidth}
              height={childrenHeight}
              children={item.children}
              color={item.color}
              position={[childrenWidth * i, 0, 0]}
            /> */}
            {/* {i < children.length - 1 && (
              <mesh position={[0, -height / 2, 0]}>
                <boxGeometry args={[width, 0.1, 2]} />
                <meshStandardMaterial color="white" />
              </mesh>
            )} */}
          </Fragment>
        );
      })}
    </group>
  );
};

const Facade = ({ width, height, depth }) => {
  return (
    <group position={[0, height / 2, 0]}>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh
        rotation={[0, 0, (90 * Math.PI) / 180]}
        position={[width / 2, -height / 2, 0]}
      >
        <boxGeometry args={[height, thickness, depth]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh rotation={[0, 0, 0]} position={[0, -height, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh
        rotation={[0, 0, (90 * Math.PI) / 180]}
        position={[-width / 2, -height / 2, 0]}
      >
        <boxGeometry args={[height, thickness, depth]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

const TestWardrobe = () => {
  return (
    <mesh>
      <group position={[0, 0, 0]}>
        <group position={[0, 0, 0]}>
          <NormalizedPane
            width={6}
            height={6}
            color="magenta"
            position={[0, 0, -5]}
          />
        </group>

        <group position={[0, 0, 0]}>
          <NormalizedPane
            parentHeight={6}
            parentWidth={6}
            width={6}
            height={6}
            color="green"
            position={[0, 0, -4]}
          />

          <NormalizedPane
            parentHeight={6}
            parentWidth={6}
            width={3}
            height={6}
            color="yellow"
            position={[3, 0, -3]}
          />

          <group position={[0, 0, 0]}>
            <NormalizedPane
              parentHeight={6}
              parentWidth={6}
              width={3}
              height={6}
              color="blue"
              position={[0, 0, -3]}
            />

            <NormalizedPane
              parentHeight={6}
              parentWidth={3}
              width={1.5}
              height={6}
              color="white"
              position={[-1.5, 0, -2]}
            />

            <NormalizedPane
              parentHeight={6}
              parentWidth={3}
              width={1.5}
              height={6}
              color="teal"
              position={[0, 0, -2]}
            />

            <NormalizedPane
              parentHeight={6}
              parentWidth={1.5}
              width={1.5 / 2}
              height={6}
              color="cyan"
              position={[-1.5 - 0.75, 0, -1]}
            />

            <NormalizedPane
              parentHeight={6}
              parentWidth={1.5}
              width={1.5 / 2}
              height={6}
              color="violet"
              position={[-1.5 - 0.75 + 0.75, 0, -1]}
            />

            {/* <NormalizedPane
              parentHeight={6}
              parentWidth={1.5}
              width={1.5}
              height={3}
              color="cyan"
              position={[-1.5 - 0.75, 0, -1]}
            />

            <NormalizedPane
              parentHeight={6}
              parentWidth={1.5}
              width={1.5}
              height={3}
              color="violet"
              position={[-1.5 - 0.75, -3, -1]}
            /> */}
          </group>
        </group>

        {/* {children.map((item, i) => {
            return (
              <Fragment key={i}>
                <Cabinet
                  parentWidth={width}
                  parentHeight={height}
                  parentPosition={position}
                  width={childrenWidth}
                  height={childrenHeight}
                  color={item.color}
                  position={[childrenWidth * i, 0, 0]}
                  children={item.children}
                />
              </Fragment>
            );
          })} */}
      </group>
    </mesh>
  );
};

const Wardrobe = (props) => {
  const { height, width } = useControls("size", {
    height: { min: 1, max: 12, value: 6, step: 0.5 },
    width: { min: 1, max: 12, value: 6, step: 0.5 },
  });

  const depth = 2;

  return (
    <>
      <mesh>
        {/* <Facade {...{ width, height, depth }} /> */}

        {/* <PaneContainer width={width} height={height} /> */}

        <Cabinet
          width={width}
          height={height}
          children={data.children}
          vertical={data.vertical}
          offsetX={width / 2}
        />

        {/* <NormalizedPane
          width={4}
          height={4}
          color="orange"
          position={[0, 0, -0.2]}
        />
        <NormalizedPane
          parentWidth={4}
          parentHeight={4}
          parentPosition={[0, 0, -0.2]}
          width={1}
          height={1}
          color="red"
          position={[0, 0, 0]}
        />
        <NormalizedPane
          parentWidth={4}
          parentHeight={4}
          parentPosition={[0, 0, -0.2]}
          width={1}
          height={1}
          color="green"
          position={[1, 0, 0]}
        /> */}
      </mesh>
    </>
  );
};

const PreviewPage = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [0, 0, 6] }}>
        {/* <Canvas camera={{ position: [0, 0, 10], zoom: 100 }} orthographic> */}
        <color attach={"background"} args={["white"]} />
        <Stars count={100} />
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} />

        <Wardrobe />
        <TestWardrobe />
      </Canvas>
    </div>
  );
};

export default PreviewPage;
