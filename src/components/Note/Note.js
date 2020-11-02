import React, { useState, useRef } from "react";
import { layouts } from "../../constants/layouts";
import "./Note.scss";

const Note = ({
  note,
  tools,
  sizeCanvas,
  noteChange,
  currentTool,
  noteLayoutChange,
}) => {
  const [isEditableNote, setIsEditableNote] = useState(true);
  const [finalNoteCoords, _setFinalNoteCoords] = useState({});
  const [offsetsNoteFromParent, _setOffsetsNoteFromParent] = useState({});

  const handleBlur = () => note.text.length > 0 && setIsEditableNote(false);
  const switchEditableNote = () => setIsEditableNote(true);

  const offsetsNoteFromParentRef = useRef(offsetsNoteFromParent);
  const setOffsetsNoteFromParent = (offsets) => {
    offsetsNoteFromParentRef.current = offsets;
    _setOffsetsNoteFromParent(offsets);
  };

  const finalNoteCoordsRef = useRef(finalNoteCoords);
  const setFinalNoteCoords = (coords) => {
    finalNoteCoordsRef.current = coords;
    _setFinalNoteCoords(coords);
  };

  const checkConditionForStopMovingNote = (
    mouseCoords,
    offsetsNoteFromParentRef,
    sizeCanvas,
    clientRect,
    layouts,
    isEditableNote
  ) => {
    const { x: mouseX, y: mouseY } = mouseCoords;
    const {
      x: offsetsNoteX,
      y: offsetsNoteY,
    } = offsetsNoteFromParentRef.current;
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

  const moveNote = (event) => {
    const { pageX: mouseX, pageY: mouseY } = event;

    const {
      x: diffBetweenDocAndParentX,
      y: diffBetweenDocAndParentY,
    } = offsetsNoteFromParentRef.current;

    const mouseCoords = { x: mouseX, y: mouseY };
    const clientRect = event.target.getBoundingClientRect();

    const conditonStopMovingNote = checkConditionForStopMovingNote(
      mouseCoords,
      offsetsNoteFromParentRef,
      sizeCanvas,
      clientRect,
      layouts,
      isEditableNote
    );

    if (conditonStopMovingNote) return;

    setFinalNoteCoords({
      x: mouseX - diffBetweenDocAndParentX,
      y: mouseY - diffBetweenDocAndParentY,
    });
  };

  const endMoveNote = (event) => {
    if (isEditableNote) return;

    const layout = {
      id: event.target.id,
      x: finalNoteCoordsRef.current.x,
      y: finalNoteCoordsRef.current.y,
    };

    setOffsetsNoteFromParent({});
    window.removeEventListener("mousemove", moveNote);
    window.removeEventListener("mouseup", endMoveNote);

    noteLayoutChange(layout);
  };

  const startMoveNote = (event) => {
    if (currentTool !== tools.pointer) return;
    const {
      offsetLeft: relatedToParentX,
      offsetTop: relatedToParentY,
    } = event.currentTarget;

    const { pageX: mouseX, pageY: mouseY } = event;

    setOffsetsNoteFromParent({
      x: mouseX - relatedToParentX,
      y: mouseY - relatedToParentY,
    });

    window.addEventListener("mousemove", moveNote);
    window.addEventListener("mouseup", endMoveNote);
  };

  return (
    <div
      id={note.id}
      key={note.id}
      className="note"
      onMouseDown={startMoveNote}
      onDoubleClick={switchEditableNote}
      style={{
        top: finalNoteCoords.y || note.y,
        left: finalNoteCoords.x || note.x,
      }}
    >
      {isEditableNote ? (
        <textarea
          autoFocus
          id={note.id}
          value={note.text}
          onBlur={handleBlur}
          onChange={noteChange}
          className="note__textarea"
        />
      ) : (
        <div id={note.id} className="note__text">
          {note.text}
        </div>
      )}
    </div>
  );
};

export default Note;
