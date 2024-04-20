// Circle.tsx
import React from "react";
import { Circle as KonvaCircle } from "react-konva";

interface CircleProps {
  x: number;
  y: number;
  fill: string;
  radius: number;
  onClick: () => void;
  listening: boolean;
}

const CircleComponent: React.FC<CircleProps> = ({ x, y, fill, radius, onClick, listening }) => {
  return (
    <KonvaCircle
      x={x}
      y={y}
      fill={fill}
      radius={radius}
      onClick={onClick}
      listening={listening}
    />
  );
};

export default CircleComponent;
