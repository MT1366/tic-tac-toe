import React, { useState, useEffect } from "react";
import { Stage, Layer, Circle, Rect } from "react-konva";
import useDisableCircle from "../services/useDisableCircle";

interface CurrentPlayerProp {
  currentPlayer: string;
}

const MainBoard: React.FC<CurrentPlayerProp> = ({ currentPlayer }) => {
  const [winner, setWinner] = useState<string | null>(null);

  const squares = Array(16).fill(null);
  return (
    <section className="bg-red-100 m-10">
      <div className="flex flex-wrap gap-0">
        {squares.map((_, index) => (
          <Square key={index} />
        ))}
      </div>
    </section>
  );
};

const Square: React.FC = () => {
  const { disableCircle, isCircleDisabled } = useDisableCircle();
  const [clickedCircles, setClickedCircles] = useState<
    { index: number; x: number; y: number }[]
  >([]);
  const [squareFillColor, setSquareFillColor] = useState("gray");
  const [circleFillColors, setCircleFillColors] = useState<string[]>(
    new Array(16).fill("black")
  );

  const renderCircles = () => {
    const positions = [];
    const numCircles = 1;
    const numRows = 4;
    const numCols = 4;

    for (let i = 0; i < numCircles; i++) {
      for (let j = 0; j < numCircles; j++) {
        positions.push({ x: 20 + j * 250, y: 20 + i * 72 });
      }
    }

    return positions.map((position, index) => (
      <Circle
        key={index}
        x={position.x}
        y={position.y}
        radius={10}
        fill={circleFillColors[index]}
        onClick={() => handleClick(index + 1, position.x, position.y)}
        listening={!isCircleDisabled(index + 1)}
      />
    ));
  };

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
        index === circleIndex - 1
          ? currentPlayer === "X"
            ? "red"
            : "blue"
          : color
      );
      setCircleFillColors(updatedColors);
    }
  };

  return (
    <Stage width={250} height={250}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={245}
          height={245}
          stroke="black"
          fill={squareFillColor}
          strokeWidth={1}
        />
        {renderCircles()}
      </Layer>
    </Stage>
  );
};

export default MainBoard;
