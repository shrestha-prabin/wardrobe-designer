import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import React from "react";

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
          
          children0: [
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

const Pane = ({ width, height, color, position, divide, vertical }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width, height, 0.2]} />
        <meshPhysicalMaterial
          // color={color}
          color={'white'}
          transmission={1}
          reflectivity={1}
          metalness={0}
          roughness={0.2}
        />
      </mesh>

      {Array.from({ length: divide + 1 }).map((item, i) => {
        let horizontal = !vertical;
        let px = (i * width) / divide - width / 2;
        let py = (i * height) / divide - height / 2;

        return (
          <mesh position={[horizontal ? px : 0, vertical ? py : 0, 0.2]}>
            <boxGeometry
              args={[horizontal ? 0.1 : width, vertical ? 0.1 : height, 1.2]}
            />
            <meshPhysicalMaterial
              color={"black"}
              transmission={1}
              reflectivity={12}
              metalness={2}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const Cabinet = ({ width, height, position, children, vertical, color }) => {
  if (!children || children.length == 0) {
    return (
      <Pane
        position={position}
        height={width}
        width={height}
        color={color}
        divide={2}
      />
    );
  }

  return (
    <>
      {children.map((item) => {
        return (
          <Cabinet
            height={width}
            width={height}
            color={item.color}
            position={item.position}
            // position={[Math.random()*10, Math.random()*10, Math.random()]}
            children={item.children}
            vertical={item.vertical}
          />
        );
      })}
    </>
  );
};

const Wardrobe = (props) => {
  const { height, width } = useControls("size", {
    height: { min: 1, max: 12, value: 6, step: 0.5 },
    width: { min: 1, max: 12, value: 6, step: 0.5 },
  });

  const depth = 2;

  return <Cabinet width={width} height={height} children={data.children} />;
};

const PreviewPage = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach={"background"} args={["white"]} />
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} intensity={0.4}/>

        {/* <Pane
          width={4}
          height={4}
          color="orange"
          // position={[-3, -6, 0]}
          divide={4}
          vertical
        />

        <Pane
          width={4}
          height={4}
          color="orange"
          // position={[3, -6, 0]}
          divide={2}
        /> */}
        <Wardrobe />
      </Canvas>
    </div>
  );
};

export default PreviewPage;
