import { useState } from "react";

const useDisableCircle = () => {
  const [disabledCircles, setDisabledCircles] = useState<number[]>([]);

  const disableCircle = (index: number) => {
    if (!disabledCircles.includes(index)) {
      setDisabledCircles((prevState) => [...prevState, index]);
    }
  };

  const isCircleDisabled = (index: number) => disabledCircles.includes(index);

  return { disableCircle, isCircleDisabled };
};
export default useDisableCircle;
