import { v4 as uuidv4 } from "uuid";
import { digitalPolicyModelCanvasTitles } from "../constants/gridTitles";

function calculateCoordinates(cell, rows, columns) {
  let coordinates = [];

  for (let i = 1; i <= rows; i++) {
    for (let k = 1; k <= columns; k++) {
      const initCoords = { x: 0, y: 0 };
      const firstCellInFirstRow = i === 1 && k === 1;
      const allCellsInFirstRowAcceptFirstCell = i === 1 && k > 1;
      const firstCellOfEachRowsAcceptThirdRow = i > 1 && i < 3 && k === 1;
      const firstCellInThirdRow = i === 3 && k === 1;
      const secondCellInThirdRow = i === 3 && k === 2;
      const thirdCellInThirdRow = i === 3 && k === 3;

      if (firstCellInFirstRow) {
        coordinates.push({ x: initCoords.x, y: initCoords.y });
      } else if (allCellsInFirstRowAcceptFirstCell) {
        coordinates.push({
          x: cell.width * (k - 1) + initCoords.x,
          y: initCoords.y,
        });
      } else if (firstCellOfEachRowsAcceptThirdRow) {
        coordinates.push({
          x: initCoords.x,
          y: cell.height * (i - 1) + initCoords.y,
        });
      } else if (firstCellInThirdRow) {
        coordinates.push({
          x: cell.width * k + initCoords.x,
          y: cell.height * (i - 1) + initCoords.y,
        });
      } else if (secondCellInThirdRow) {
        coordinates.push({
          x: cell.widthSmall + cell.width * (k - 1) + initCoords.x,
          y: cell.height * (i - 1) + initCoords.y,
        });
      } else if (thirdCellInThirdRow) {
        coordinates.push({
          x: cell.width + cell.widthSmall * 2 + initCoords.x,
          y: cell.height * (i - 1) + initCoords.y,
        });
      } else {
        coordinates.push({
          x: cell.width * (k - 1) + initCoords.x,
          y: cell.height * (i - 1) + initCoords.y,
        });
      }
    }
  }

  return coordinates;
}

function addNameToCoordinates(names, coordinates) {
  let arr = [];
  for (let i = 0; i < coordinates.length; i++) {
    arr.push({ ...coordinates[i], title: names[i] });
  }
  return arr;
}

function createGrid(coordinates, cell) {
  return coordinates.map((coordinate, index) => {
    const gridItem = {
      id: uuidv4(),
      title: coordinate.title,
      columnX: coordinate.x,
      columnY: coordinate.y,
      titleX: coordinate.x + 10,
      titleY: coordinate.y + 10,
      widthColumn: cell.width,
      heightColumn: cell.height,
    };
    if (index === 3) {
      return {
        ...gridItem,
        heightColumn: cell.heightBig,
      };
    }
    if (index === 6 || index === 7 || index === 8) {
      return {
        ...gridItem,
        widthColumn: cell.widthSmall,
      };
    }
    return gridItem;
  });
}

export const drawDigitalPolicyModelCanvas = ({ widthCanvas, heightCanvas }) => {
  const padding = 20;
  const columnsCoefficient = 3;
  const rowsCoefficient = 3;
  const columnsCount = 3;
  const rowsCount = 3;

  const cell = {
    width: Math.floor(widthCanvas / columnsCoefficient) - padding,
    widthSmall: Math.floor(
      ((widthCanvas / columnsCoefficient - padding) * 2) / 3
    ),
    height: Math.floor(heightCanvas / rowsCoefficient) - padding,
    heightBig: Math.floor((heightCanvas / rowsCoefficient - padding) * 2),
  };

  const coordinates = calculateCoordinates(cell, rowsCount, columnsCount);
  const coordinatesAndTitles = addNameToCoordinates(
    digitalPolicyModelCanvasTitles,
    coordinates
  );

  const positionCanvas = {
    x: Math.floor((widthCanvas - columnsCount * cell.width) / 2),
    y: Math.floor((heightCanvas - rowsCount * cell.height) / 2),
  };

  return { grid: createGrid(coordinatesAndTitles, cell), positionCanvas };
};
