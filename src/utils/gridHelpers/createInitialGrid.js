export function createInitialGrid(rows, columns, titles) {
  const emptyGrid = [];
  const initialCoords = { x: 0, y: 0 };
  const cellCount = rows * columns;

  for (let i = 0; i < cellCount; i++) {
    emptyGrid.push({
      ...initialCoords,
      title: titles[i],
    });
  }

  return emptyGrid;
}
