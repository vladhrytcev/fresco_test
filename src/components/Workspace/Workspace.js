import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useCanvasDimension } from "../../hooks/useCanvasDimension";
import { brush } from "../../drawingTools/brush";
import Konva from "konva";
import HeaderTemplate from "../../layouts/HeaderTemplate";
import Drawing from "../Drawing";
import Toolbar from "../Toolbar";
import "./Workspace.scss";

const Workspace = ({
  users,
  layers,
  projects,
  saveLayer,
  headerDimension,
  toolbarDimension,
  setToolbarDimension,
}) => {
  const tools = {
    note: "note",
    brush: "brush",
    pointer: "pointer",
    palette: "palette",
    default: "default",
  };

  const stageRef = useRef(null);
  const gridLayerRef = useRef(null);
  const drawLayerRef = useRef(null);

  const [notes, setNotes] = useState([]);
  const [textNote, setTextNote] = useState("");
  const [colorBrush, setColorBrush] = useState("");
  const [currentGridLayer, setCurrentGridLayer] = useState([]);
  const [currentDrawLayer, setCurrentDrawLayer] = useState({});
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [currentTool, setCurrentTool] = useState(tools.default);

  const { sizeCanvas, positionCanvas, columns } = useCanvasDimension(
    headerDimension,
    toolbarDimension
  );

  const selectColorBrush = (color) => setColorBrush(color);
  const switchBrushTool = () => setCurrentTool(tools.brush);
  const switchAddNoteTool = () => setCurrentTool(tools.note);
  const switchPointerTool = () => setCurrentTool(tools.pointer);
  const switchPaletteTool = () => setCurrentTool(tools.palette);
  const saveGridLayer = (gridLayer) => setCurrentGridLayer(gridLayer);

  const addNote = () => {
    if (currentTool === tools.pointer) {
      if (notes.length > 0 && textNote.length > 0) {
        setTextNote("");
      }
    }

    if (currentTool !== tools.note) return;
    const { x, y } = stageRef.current.getPointerPosition();
    const newNote = { id: uuidv4(), x, y, text: "" };
    const newNotes = [...notes];
    const lastNote = newNotes[newNotes.length - 1];

    if (newNotes.length === 0) {
      newNotes.push(newNote);
    } else if (newNotes.length > 0 && lastNote.text.length === 0) {
      newNotes.splice(newNotes.length - 1, 1, newNote);
    } else if (newNotes.length > 0 && textNote.length > 0) {
      newNotes.splice(newNotes.length - 1, 1, { ...lastNote, text: textNote });
      setCurrentTool(tools.pointer);
      setTextNote("");
    } else {
      newNotes.push(newNote);
    }

    setNotes(newNotes);
  };

  const noteLayoutChange = (layout) => {
    const { id, x, y } = layout;

    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, x, y };
      }
      return note;
    });

    setNotes(newNotes);
  };

  const drawLine = () => {
    brush(
      currentTool,
      tools,
      colorBrush,
      stageRef.current.getStage(),
      Object.keys(currentDrawLayer).length > 0
        ? currentDrawLayer
        : drawLayerRef.current
    );
  };

  const saveSheet = () => {
    const layer = {
      projectId: projects.currentProject.projectId,
      userId: users.currentUser.userId,
      drawLayer:
        Object.keys(currentDrawLayer).length > 0
          ? currentDrawLayer.toJSON()
          : drawLayerRef.current.toJSON(),
      gridLayer: currentGridLayer,
      notes,
    };
    saveLayer(layer);
  };

  const noteChange = (event) => {
    const text = event.target.value;
    setTextNote(text);
    const noteId = event.target.id;
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, text };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const toggleShowingSavePopup = () => {
    setIsShowPopup(true);
    setTimeout(() => setIsShowPopup(false), 1000);
  };

  useEffect(() => {
    if (layers.length === 0) return;
    const findingLayer = layers.find(
      (layer) =>
        layer.userId === users.currentUser.userId &&
        layer.projectId === projects.currentProject.projectId
    );
    if (!findingLayer) return;
    const drawLayer = Konva.Node.create(findingLayer.drawLayer);
    setCurrentGridLayer(findingLayer.gridLayer);
    setCurrentDrawLayer(drawLayer);
    drawLayerRef.current.destroyChildren();
    stageRef.current.add(drawLayer);
    setNotes(findingLayer.notes);
  }, []); //eslint-disable-line

  return (
    <HeaderTemplate>
      <div className="workspace">
        <Toolbar
          tools={tools}
          saveSheet={saveSheet}
          colorBrush={colorBrush}
          currentTool={currentTool}
          switchBrushTool={switchBrushTool}
          selectColorBrush={selectColorBrush}
          switchAddNoteTool={switchAddNoteTool}
          switchPointerTool={switchPointerTool}
          switchPaletteTool={switchPaletteTool}
          setToolbarDimension={setToolbarDimension}
          toggleShowingSavePopup={toggleShowingSavePopup}
        />
        <Drawing
          notes={notes}
          tools={tools}
          columns={columns}
          addNote={addNote}
          drawLine={drawLine}
          stageRef={stageRef}
          noteChange={noteChange}
          sizeCanvas={sizeCanvas}
          currentTool={currentTool}
          isShowPopup={isShowPopup}
          drawLayerRef={drawLayerRef}
          gridLayerRef={gridLayerRef}
          saveGridLayer={saveGridLayer}
          positionCanvas={positionCanvas}
          currentGridLayer={currentGridLayer}
          noteLayoutChange={noteLayoutChange}
        />
      </div>
    </HeaderTemplate>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  layers: state.layers,
  projects: state.projects,
  headerDimension: state.headerDimension,
  toolbarDimension: state.toolbarDimension,
});

export default connect(mapStateToProps)(Workspace);
