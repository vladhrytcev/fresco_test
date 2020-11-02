import { useEffect, useState } from "react";
import { drawDigitalPolicyModelCanvas } from "../utils/helpers";

export function useCanvasDimension(headerDimension, toolbarDimension) {
  const [sizeCanvas, setSizeCanvas] = useState({});
  const [columns, setColumns] = useState([]);
  const [positionCanvas, setPositionCanvas] = useState({});

  const conditionNonEmptyHeaderDimensionArray =
    Object.keys(headerDimension).length > 0;

  const conditionAbsenceUndefinedValueInHeaderDimensionArray = !!Object.values(
    headerDimension
  ).find((size) => typeof size === "number");

  const conditionNonEmptyToolbarDimensionArray =
    Object.keys(toolbarDimension).length > 0;

  const conditionAbsenceUndefinedValueInToolbarDimensionArray = !!Object.values(
    toolbarDimension
  ).find((size) => typeof size === "number");

  const finalCorrectCondition =
    conditionNonEmptyHeaderDimensionArray &&
    conditionAbsenceUndefinedValueInHeaderDimensionArray &&
    conditionNonEmptyToolbarDimensionArray &&
    conditionAbsenceUndefinedValueInToolbarDimensionArray;

  useEffect(() => {
    if (finalCorrectCondition) {
      const widthCanvas = window.innerWidth - toolbarDimension.width;
      const heightCanvas = window.innerHeight - headerDimension.height;

      setSizeCanvas({ width: widthCanvas, height: heightCanvas });

      const dimensionCanvas = { widthCanvas, heightCanvas };

      drawDigitalPolicyModelCanvas(dimensionCanvas);
      setColumns(drawDigitalPolicyModelCanvas(dimensionCanvas).grid);
      setPositionCanvas(
        drawDigitalPolicyModelCanvas(dimensionCanvas).positionCanvas
      );
    }
  }, [headerDimension, toolbarDimension, finalCorrectCondition]);
  return { sizeCanvas, positionCanvas, columns };
}
