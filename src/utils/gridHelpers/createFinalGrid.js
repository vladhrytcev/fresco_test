import { v4 as uuidv4 } from "uuid";

export function createFinalGrid(coordinates, cell) {
  return coordinates.map((coordinate, index) => {
    const columnBigHeight = index === 3;
    const smallColumns = index === 6 || index === 7 || index === 8;

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
    if (columnBigHeight) {
      return {
        ...gridItem,
        heightColumn: cell.heightBig,
      };
    }
    if (smallColumns) {
      return {
        ...gridItem,
        widthColumn: cell.widthSmall,
      };
    }
    return gridItem;
  });
}
