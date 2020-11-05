export const checkConditionForStopMovingNote = (
  layouts,
  sizeCanvas,
  clientRect,
  mouseCoords,
  isEditableNote,
  offsetsNoteFromParentRef
) => {
  const { x: mouseX, y: mouseY } = mouseCoords;
  const { x: offsetsNoteX, y: offsetsNoteY } = offsetsNoteFromParentRef.current;
  const { width: widthCanvas, height: heightCanvas } = sizeCanvas;
  const { width: widthClientRect, height: heightClientRect } = clientRect;

  const conditonStopMovingNote =
    mouseX - offsetsNoteX >
      widthCanvas - widthClientRect - layouts.coefficientLimitMovingShape ||
    mouseX - offsetsNoteX < layouts.coefficientLimitMovingShape ||
    mouseY - offsetsNoteY >
      heightCanvas - heightClientRect - layouts.coefficientLimitMovingShape ||
    mouseY - offsetsNoteY < layouts.coefficientLimitMovingShape ||
    isEditableNote;

  return conditonStopMovingNote;
};
