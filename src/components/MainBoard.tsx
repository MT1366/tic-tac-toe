// MainBoard.tsx
import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Circle from "./CircleComponent";
import Square from "./SquareComponent";
import useDisableCircle from "../services/useDisableCircle";

const MainBoard: React.FC = () => {
  const { disableCircle, isCircleDisabled } = useDisableCircle();
  const [clickedCircles, setClickedCircles] = useState<
    { index: number; x: number; y: number }[]
  >([]);
  const [squareFillColor, setSquareFillColor] = useState("gray");
  const [circleFillColors, setCircleFillColors] = useState<string[]>(new Array(16).fill("black"));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.random() < 0.5 ? "X" : "O"
  );

  useEffect(() => {
    if (clickedCircles.length === 4) {
      setSquareFillColor("lightblue");
    }
  }, [clickedCircles]);

  const handleClick = (circleIndex: number, x: number, y: number) => {
    if (!isCircleDisabled(circleIndex)) {
      disableCircle(circleIndex);
      setClickedCircles((prev) => [...prev, { index: circleIndex, x, y }]);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      const updatedColors = circleFillColors.map((color, index) =>
        index === circleIndex - 1 ? (currentPlayer === "X" ? "red" : "blue") : color
      );
      setCircleFillColors(updatedColors);
    }
  };

  return (
    <Stage width={250} height={250}>
      <Layer>
        <Square x={0} y={0} width={245} height={245} fill={squareFillColor} strokeWidth={1} />
        {[...Array(2)].map((_, i) => (
          [...Array(2)].map((_, j) => (
            <Circle
              key={i * 4 + j}
              x={20 + j * 200}
              y={20 + i * 200}
              radius={10}
              fill={circleFillColors[i * 2 + j]}
              onClick={() => handleClick(i * 2 + j + 1, 20 + j * 60, 20 + i * 60)}
              listening={!isCircleDisabled(i * 2 + j + 1)}
            />
          ))
        ))}
      </Layer>
    </Stage>
  );
};

export default MainBoard;
