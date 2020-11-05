export const checkConditionsForReturnColumn = (
  sizeCanvas,
  mouseCoords,
  positionCanvas,
  startCoordsRef,
  movedColumnDataRef
) => {
  const { x: mouseX, y: mouseY } = mouseCoords;
  const { x: startX, y: startY } = startCoordsRef.current;
  const { width: canvasWidth, height: canvasHeight } = sizeCanvas;
  const { x: canvasX, y: canvasY } = positionCanvas;
  const {
    width: columnWidth,
    height: columnHeight,
  } = movedColumnDataRef.current;

  const pointerX = mouseX - startX;
  const pointerY = mouseY - startY;
  const limitX = canvasWidth - columnWidth - canvasX;
  const limitY = canvasHeight - columnHeight - canvasY;

  const conditonStopMovingColumn =
    pointerX < 0 || pointerX > limitX || pointerY < 0 || pointerY > limitY;

  return conditonStopMovingColumn;
};
