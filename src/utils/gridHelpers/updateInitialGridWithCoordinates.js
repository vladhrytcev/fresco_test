export function updateInitialGridWithCoordinates(
  emptyGrid,
  cellSize,
  cellIndex
) {
  const { width, widthSmall, height } = cellSize;

  const fillGrid = emptyGrid.map((square, index) => {
    switch (index) {
      case cellIndex.cell_2:
      case cellIndex.cell_3:
        return { ...square, x: width * index };
      case cellIndex.cell_4:
        return { ...square, y: height };
      case cellIndex.cell_5:
        return {
          ...square,
          x: width,
          y: height,
        };
      case cellIndex.cell_6:
        return {
          ...square,
          x: width * 2,
          y: height,
        };
      case cellIndex.cell_7:
        return {
          ...square,
          x: width,
          y: height * 2,
        };
      case cellIndex.cell_8:
        return {
          ...square,
          x: widthSmall + width,
          y: height * 2,
        };
      case cellIndex.cell_9:
        return {
          ...square,
          x: width + widthSmall * 2,
          y: height * 2,
        };
      default:
        return square;
    }
  });

  return fillGrid;
}
