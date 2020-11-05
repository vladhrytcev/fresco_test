import React, { useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  createNote,
  changePositionEmptyNote,
  addTextInJustCreatedNote,
  setFocusedNoteId,
} from "../../redux/notes/notes";
import {
  createRectangle,
  selectActiveRectangle,
  changeTextInRectangle,
  updateRectangles,
  disableAllRectangles,
} from "../../redux/rectangles/rectangles";
import { setCurrentTool } from "../../redux/tools/tools";
import {
  setColumns,
  changeTextInColumn,
  changePositionColumn,
  setMovedColumnId,
} from "../../redux/columns/columns";
import { brush } from "../../utils";
import { layouts } from "../../constants/layouts";
import { toolsList } from "../../constants/toolsList";
import { useCalculateCanvasLayout } from "../../hooks/useCalculateCanvasLayout";
import Canvas from "../Canvas";

const CanvasContainer = ({
  notes,
  users,
  actions,
  columns,
  gridLayerRef,
  customGridLayerRef,
  projects,
  stageRef,
  dimensions,
  drawLayerRef,
  tools,
}) => {
  const {
    sizeCanvas,
    positionCanvas,
    columnsInitial,
  } = useCalculateCanvasLayout(
    dimensions.header.height,
    dimensions.toolbar.width
  );

  const conditionShowingGridTemplate =
    projects.currentProject.projectTemplate !== "Custom";

  const findingColumns = columns.columnsList.digitalPolicyModelCanvas.columnsArray.find(
    (col) =>
      col.userId === users.currentUser.userId &&
      col.projectId === projects.currentProject.projectId
  );

  const latestColumns = findingColumns ? findingColumns : columnsInitial;

  const switchTool = () => {
    switch (tools.currentTool) {
      case toolsList.pointer:
        if (!columns.movedColumnId) actions.setCurrentTool(toolsList.default);
        actions.disableAllRectangles();
        return;
      case toolsList.note:
        return addNote();
      case toolsList.rectangle:
        addRectangle();
        return;
      default:
        return;
    }
  };

  const addNote = () => {
    if (tools.currentTool !== toolsList.note) return;

    const findingNote = notes.notesList.find(
      (note) => note.noteId === notes.focusedNoteId
    );

    const conditionEmptyNoteText = findingNote
      ? !!findingNote.text
      : !!findingNote;
    const noteText = conditionEmptyNoteText && findingNote.text;

    const { x, y } = stageRef.current.getPointerPosition();
    const lastNote = notes.notesList[notes.notesList.length - 1];
    const newNote = {
      text: "",
      x: Math.floor(x),
      y: Math.floor(y),
      noteId: uuidv4(),
      userId: users.currentUser.userId,
      projectId: projects.currentProject.projectId,
    };

    if (notes.notesList.length > 0 && lastNote.text.length === 0) {
      actions.changePositionEmptyNote({ x, y });
    } else if (notes.notesList.length > 0 && conditionEmptyNoteText) {
      actions.addTextInJustCreatedNote(noteText);
      actions.setCurrentTool(toolsList.pointer);
      actions.setFocusedNoteId("");
    } else {
      actions.createNote(newNote);
    }
  };

  const drawLine = () => {
    brush(
      tools.currentTool,
      toolsList,
      tools.colorBrush,
      stageRef.current.getStage()
    );
  };

  const addRectangle = () => {
    if (tools.currentTool !== toolsList.rectangle) return;
    const { x: mouseX, y: mouseY } = stageRef.current.getPointerPosition();

    const rectX = Math.floor(mouseX);
    const rectY = Math.floor(mouseY);

    const rectangle = {
      x: rectX,
      y: rectY,
      width: layouts.widthPlaceholder,
      height: layouts.heightPlaceholder,
      rectangleId: uuidv4(),
      isSelectedRectangle: false,
      text: layouts.textPlaceholder,
      stroke: layouts.colorPlaceholder,
      userId: users.currentUser.userId,
      projectId: projects.currentProject.projectId,
    };

    actions.createRectangle(rectangle);
  };

  useEffect(() => {
    if (columnsInitial.length > 0) {
      actions.setColumns({
        projectId: projects.currentProject.projectId,
        userId: users.currentUser.userId,
        columns: columnsInitial,
      });
    }
  }, [columnsInitial]); //eslint-disable-line

  useEffect(() => {
    actions.setFocusedNoteId("");
  }, []); //eslint-disable-line

  return (
    <Canvas
      stageRef={stageRef}
      drawLayerRef={drawLayerRef}
      gridLayerRef={gridLayerRef}
      actions={actions}
      switchTool={switchTool}
      drawLine={drawLine}
      sizeCanvas={sizeCanvas}
      positionCanvas={positionCanvas}
      latestColumns={latestColumns}
      customGridLayerRef={customGridLayerRef}
      conditionShowingGridTemplate={conditionShowingGridTemplate}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    tools: state.tools,
    users: state.users,
    projects: state.projects,
    rectangles: state.rectangles,
    layers: state.layers,
    columns: state.columns,
    dimensions: state.dimensions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    createNote: (notes) => dispatch(createNote(notes)),
    changePositionEmptyNote: (coordinates) =>
      dispatch(changePositionEmptyNote(coordinates)),
    addTextInJustCreatedNote: (text) =>
      dispatch(addTextInJustCreatedNote(text)),
    setFocusedNoteId: (noteId) => dispatch(setFocusedNoteId(noteId)),
    setCurrentTool: (tool) => dispatch(setCurrentTool(tool)),
    createRectangle: (rectangle) => dispatch(createRectangle(rectangle)),
    updateRectangles: (rectangles) => dispatch(updateRectangles(rectangles)),
    disableAllRectangles: () => dispatch(disableAllRectangles()),
    selectActiveRectangle: (rectangleId) =>
      dispatch(selectActiveRectangle(rectangleId)),
    changeTextInRectangle: (rectangle) =>
      dispatch(changeTextInRectangle(rectangle)),
    setColumns: (columns) => dispatch(setColumns(columns)),
    changeTextInColumn: (column) => dispatch(changeTextInColumn(column)),
    changePositionColumn: (column) => dispatch(changePositionColumn(column)),
    setMovedColumnId: (columnId) => dispatch(setMovedColumnId(columnId)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
