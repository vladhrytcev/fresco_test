import React from "react";
import { connect } from "react-redux";
import { Stage, Layer } from "react-konva";
import Note from "../Note";
import DigitalPolicyModelCanvas from "../DigitalPolicyModelCanvas";
import Rectangle from "../Rectangle";
import "./Canvas.scss";

const Canvas = ({
  notes,
  users,
  projects,
  stageRef,
  tools,
  actions,
  latestColumns,
  positionCanvas,
  rectangles,
  switchTool,
  drawLine,
  customGridLayerRef,
  conditionShowingGridTemplate,
  sizeCanvas,
  drawLayerRef,
  gridLayerRef,
}) => {
  return (
    <div className="canvas">
      <div>
        <Stage
          ref={stageRef}
          onClick={switchTool}
          onMouseDown={drawLine}
          width={sizeCanvas.width}
          height={sizeCanvas.height}
          onTouchStart={drawLine}
        >
          {conditionShowingGridTemplate ? (
            <Layer ref={gridLayerRef} x={positionCanvas.x} y={positionCanvas.y}>
              <DigitalPolicyModelCanvas
                users={users}
                tools={tools}
                projects={projects}
                stageRef={stageRef}
                sizeCanvas={sizeCanvas}
                changeTextInColumn={actions.changeTextInColumn}
                changePositionColumn={actions.changePositionColumn}
                gridLayerRef={gridLayerRef}
                positionCanvas={positionCanvas}
                setMovedColumnId={actions.setMovedColumnId}
                columns={latestColumns}
              />
            </Layer>
          ) : (
            <Layer ref={customGridLayerRef}>
              {rectangles.rectanglesList.length > 0 &&
                rectangles.rectanglesList.map((rect, i) => {
                  const conditionShowingCertainRectangles =
                    users.currentUser.userId === rect.userId &&
                    projects.currentProject.projectId === rect.projectId;
                  if (conditionShowingCertainRectangles) {
                    return (
                      <Rectangle
                        tools={tools}
                        shapeProps={rect}
                        customGridLayerRef={customGridLayerRef}
                        stageRef={stageRef}
                        changeTextInRectangle={actions.changeTextInRectangle}
                        key={rect.rectangleId}
                        setCurrentTool={actions.setCurrentTool}
                        selectActiveRectangle={actions.selectActiveRectangle}
                        onChange={(newAttrs) => {
                          const rects = rectangles.rectanglesList.slice();
                          rects[i] = newAttrs;
                          actions.updateRectangles(rects);
                        }}
                      />
                    );
                  }
                  return null;
                })}
            </Layer>
          )}
          <Layer ref={drawLayerRef} />
        </Stage>
      </div>
      <div>
        {notes.notesList.length > 0 &&
          notes.notesList.map((note) => {
            const conditionShowingCertainNotes =
              users.currentUser.userId === note.userId &&
              projects.currentProject.projectId === note.projectId;
            if (conditionShowingCertainNotes) {
              return (
                <Note key={note.noteId} note={note} sizeCanvas={sizeCanvas} />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    layers: state.layers,
    notes: state.notes,
    tools: state.tools,
    users: state.users,
    rectangles: state.rectangles,
    columns: state.columns,
    projects: state.projects,
  };
};

export default connect(mapStateToProps)(Canvas);
