import { updateInitialGridWithCoordinates } from "./updateInitialGridWithCoordinates";
import { createInitialGrid } from "./createInitialGrid";
import { createFinalGrid } from "./createFinalGrid";
import {
  cellIndex,
  digitalPolicyModelCanvasTitles,
} from "../../constants/grid";

export const drawDigitalPolicyModelCanvas = ({ widthCanvas, heightCanvas }) => {
  const padding = 20;
  const columnsCoefficient = 3;
  const rowsCoefficient = 3;
  const columnsCount = 3;
  const rowsCount = 3;

  const cellSize = {
    width: Math.floor(widthCanvas / columnsCoefficient) - padding,
    widthSmall: Math.floor(
      ((widthCanvas / columnsCoefficient - padding) * 2) / 3
    ),
    height: Math.floor(heightCanvas / rowsCoefficient) - padding,
    heightBig: Math.floor((heightCanvas / rowsCoefficient - padding) * 2),
  };

  const initialGrid = createInitialGrid(
    rowsCount,
    columnsCount,
    digitalPolicyModelCanvasTitles
  );

  const updatedInitialGridWithCoordinates = updateInitialGridWithCoordinates(
    initialGrid,
    cellSize,
    cellIndex
  );

  const finalGrid = createFinalGrid(
    updatedInitialGridWithCoordinates,
    cellSize
  );

  const positionCanvas = {
    x: Math.floor((widthCanvas - columnsCount * cellSize.width) / 2),
    y: Math.floor((heightCanvas - rowsCount * cellSize.height) / 2),
  };

  return { grid: finalGrid, positionCanvas };
};
