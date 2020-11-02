import React from "react";
import { connect } from "react-redux";
import { Stage, Layer } from "react-konva";
import Note from "../Note";
import PopupSave from "../PopupSave";
import Grid from "../../layouts/Grid";
import "./Drawing.scss";

const Drawing = ({
  notes,
  tools,
  columns,
  addNote,
  projects,
  drawLine,
  stageRef,
  noteChange,
  sizeCanvas,
  isShowPopup,
  currentTool,
  drawLayerRef,
  gridLayerRef,
  saveGridLayer,
  positionCanvas,
  currentGridLayer,
  noteLayoutChange,
}) => {
  const conditionShowingGridTemplate =
    projects.currentProject.projectTemplate !== "None";

  const latestColumns =
    currentGridLayer && currentGridLayer.length > 0
      ? currentGridLayer
      : columns;

  return (
    <div className="drawing">
      <div>
        <Stage
          ref={stageRef}
          onClick={addNote}
          onTouchEnd={addNote}
          onMouseDown={drawLine}
          onTouchStart={drawLine}
          width={sizeCanvas.width}
          height={sizeCanvas.height}
        >
          {conditionShowingGridTemplate && (
            <Layer ref={gridLayerRef} x={positionCanvas.x} y={positionCanvas.y}>
              <Grid
                tools={tools}
                columns={latestColumns}
                sizeCanvas={sizeCanvas}
                currentTool={currentTool}
                saveGridLayer={saveGridLayer}
                positionCanvas={positionCanvas}
              />
            </Layer>
          )}
          <Layer ref={drawLayerRef} />
        </Stage>
        <PopupSave isShowPopup={isShowPopup} />
      </div>
      <div>
        {notes.map((note) => (
          <Note
            note={note}
            tools={tools}
            key={note.id}
            sizeCanvas={sizeCanvas}
            noteChange={noteChange}
            currentTool={currentTool}
            noteLayoutChange={noteLayoutChange}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(Drawing);
