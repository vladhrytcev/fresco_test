import { useEffect, useState } from "react";
import { drawDigitalPolicyModelCanvas } from "../utils";

export function useCalculateCanvasLayout(headerHeight, toolbarWidth) {
  const [sizeCanvas, setSizeCanvas] = useState({});
  const [columnsInitial, setColumnsInitial] = useState([]);
  const [positionCanvas, setPositionCanvas] = useState({});

  useEffect(() => {
    if (!!(headerHeight && toolbarWidth)) {
      const widthCanvas = window.innerWidth - toolbarWidth;
      const heightCanvas = window.innerHeight - headerHeight;

      setSizeCanvas({ width: widthCanvas, height: heightCanvas });

      const dimensionCanvas = { widthCanvas, heightCanvas };

      drawDigitalPolicyModelCanvas(dimensionCanvas);
      setColumnsInitial(drawDigitalPolicyModelCanvas(dimensionCanvas).grid);
      setPositionCanvas(
        drawDigitalPolicyModelCanvas(dimensionCanvas).positionCanvas
      );
    }
  }, [headerHeight, toolbarWidth]);
  return { sizeCanvas, positionCanvas, columnsInitial };
}
