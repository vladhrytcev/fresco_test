import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  setFocusedNoteId,
  changeTextInExistingNote,
  changePositionInExistingNote,
} from "../../redux/notes/notes";
import { layouts } from "../../constants/layouts";
import { setReferenceData } from "../../utils";
import { checkConditionForStopMovingNote } from "./NoteHelpers";
import { toolsList } from "../../constants/toolsList";
import "./Note.scss";

const Note = ({ note, actions, sizeCanvas, tools, notes }) => {
  const [isEditableNote, setIsEditableNote] = useState(true);
  const [finalNoteCoords, _setFinalNoteCoords] = useState({});
  const [offsetsNoteFromParent, _setOffsetsNoteFromParent] = useState({});

  const finalNoteCoordsRef = useRef(finalNoteCoords);
  const offsetsNoteFromParentRef = useRef(offsetsNoteFromParent);

  const switchEditableNote = () => setIsEditableNote(true);
  const handleBlur = () => note.text.length > 0 && setIsEditableNote(false);

  const handleFocus = ({ target }) => actions.setFocusedNoteId(target.id);

  const noteTextChange = ({ target }) => {
    const text = target.value;
    const noteId = target.id;
    actions.changeTextInExistingNote({ noteId, text });
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
      layouts,
      sizeCanvas,
      clientRect,
      mouseCoords,
      isEditableNote,
      offsetsNoteFromParentRef
    );

    if (conditonStopMovingNote) return;

    const gettedFinalCoords = {
      x: mouseX - diffBetweenDocAndParentX,
      y: mouseY - diffBetweenDocAndParentY,
    };

    setReferenceData(
      gettedFinalCoords,
      finalNoteCoordsRef,
      _setFinalNoteCoords
    );
  };

  const endMoveNote = (event) => {
    if (isEditableNote) return;

    const layout = {
      noteId: event.target.id,
      x: finalNoteCoordsRef.current.x,
      y: finalNoteCoordsRef.current.y,
    };

    setReferenceData({}, offsetsNoteFromParentRef, _setOffsetsNoteFromParent);

    if (!!(layout.noteId && layout.x && layout.y))
      actions.changePositionInExistingNote(layout);

    window.removeEventListener("mousemove", moveNote);
    window.removeEventListener("mouseup", endMoveNote);
  };

  const startMoveNote = (event) => {
    if (tools.currentTool !== toolsList.pointer) return;
    const {
      offsetLeft: relatedToParentX,
      offsetTop: relatedToParentY,
    } = event.currentTarget;

    const { pageX: mouseX, pageY: mouseY } = event;

    const offsets = {
      x: mouseX - relatedToParentX,
      y: mouseY - relatedToParentY,
    };

    setReferenceData(
      offsets,
      offsetsNoteFromParentRef,
      _setOffsetsNoteFromParent
    );

    window.addEventListener("mousemove", moveNote);
    window.addEventListener("mouseup", endMoveNote);
  };

  useEffect(() => {
    console.log(!!notes.focusedNoteId);
    actions.setFocusedNoteId("");
  }, []); // eslint-disable-line

  return (
    <div
      id={note.noteId}
      key={note.noteId}
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
          autoFocus={!!notes.focusedNoteId}
          id={note.noteId}
          value={note.text}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={noteTextChange}
          className="note__textarea"
        />
      ) : (
        <div id={note.noteId} className="note__text">
          {note.text}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tools: state.tools,
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    changePositionInExistingNote: (note) =>
      dispatch(changePositionInExistingNote(note)),
    changeTextInExistingNote: (note) =>
      dispatch(changeTextInExistingNote(note)),
    setFocusedNoteId: (noteId) => dispatch(setFocusedNoteId(noteId)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
