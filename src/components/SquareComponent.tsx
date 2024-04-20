import React from "react";
import { Rect as KonvaRect } from "react-konva";

interface SquareProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  strokeWidth: number;
}

const Square: React.FC<SquareProps> = ({ x, y, width, height, fill, strokeWidth }) => {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3];

  return (
    <>
      {rows.map((row) =>
        cols.map((col) => (
            <div style={{display: "flex", flexDirection: "column"}}>
          <KonvaRect
            key={`${row}-${col}`}
            x={x + col * (width + strokeWidth)}
            y={y + row * (height + strokeWidth)}
            width={width}
            height={height}
            fill={fill}
            strokeWidth={strokeWidth}
            stroke="black"
            />
            </div>
        ))
      )}
    </>
  );
};

export default Square;
