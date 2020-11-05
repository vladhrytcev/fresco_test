import React, { useState, useRef } from "react";
import { Rect, Text } from "react-konva";
import { editText } from "../../utils";
import { checkConditionsForReturnColumn } from "./DPMCHelpers";
import { toolsList } from "../../constants/toolsList";
import { layouts } from "../../constants/layouts";
import { setReferenceData } from "../../utils";

const DigitalPolicyModelCanvas = ({
  columns,
  sizeCanvas,
  positionCanvas,
  gridLayerRef,
  stageRef,
  tools,
  changeTextInColumn,
  users,
  projects,
  changePositionColumn,
  setMovedColumnId,
}) => {
  const [startCoords, _setStartCoords] = useState({});
  const [finalCoords, _setFinalCoords] = useState({});
  const [latestColumns, _setLatestColumns] = useState([]);
  const [movedColumnData, _setMovedColumnData] = useState({});

  const startCoordsRef = useRef(startCoords);
  const finalCoordsRef = useRef(finalCoords);
  const latestColumnsRef = useRef(latestColumns);
  const movedColumnDataRef = useRef(movedColumnData);

  const references = {
    layer: gridLayerRef.current,
    stage: stageRef.current,
  };

  const recentlyColumns = columns.hasOwnProperty("projectId")
    ? columns.columns
    : columns;

  const changeColumnLayout = (layout) => {
    const { id, x, y } = layout;

    const newColumns = recentlyColumns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          columnX: x,
          columnY: y,
          titleX: x + 5,
          titleY: y + 5,
        };
      }
      return column;
    });

    setReferenceData(newColumns, latestColumnsRef, _setLatestColumns);
    changePositionColumn({
      userId: users.currentUser.userId,
      projectId: projects.currentProject.projectId,
      columnId: id,
      x,
      y,
    });
  };

  const moveColumn = (event) => {
    const { pageX: mouseX, pageY: mouseY } = event;

    const {
      x: diffBetweenDocAndParentX,
      y: diffBetweenDocAndParentY,
    } = startCoordsRef.current;

    if (tools.currentTool !== toolsList.pointer) return;

    const layout = {
      id: movedColumnDataRef.current.id,
      x: mouseX - diffBetweenDocAndParentX,
      y: mouseY - diffBetweenDocAndParentY,
    };

    const finalCoords = { x: layout.x, y: layout.y };
    setReferenceData(finalCoords, finalCoordsRef, _setFinalCoords);
    changeColumnLayout(layout);
  };

  const endMoveColumn = (event) => {
    const { pageX: mouseX, pageY: mouseY } = event;
    const mouseCoords = { x: mouseX, y: mouseY };

    const conditonReturnColumnInitialPosition = checkConditionsForReturnColumn(
      sizeCanvas,
      mouseCoords,
      positionCanvas,
      startCoordsRef,
      movedColumnDataRef
    );

    if (conditonReturnColumnInitialPosition) {
      const findingColumn = latestColumns.find(
        (col) => col.id === movedColumnDataRef.current.id
      );

      const layout = {
        id: movedColumnDataRef.current.id,
        x: findingColumn.columnX,
        y: findingColumn.columnY,
      };
      changeColumnLayout(layout);
    }

    setMovedColumnId("");
    setReferenceData({}, startCoordsRef, _setStartCoords);

    window.removeEventListener("mousemove", moveColumn);
    window.removeEventListener("mouseup", endMoveColumn);
  };

  const startMoveColumn = (event) => {
    if (tools.currentTool !== toolsList.pointer) return;

    const {
      width,
      height,
      x: relatedToParentX,
      y: relatedToParentY,
    } = event.currentTarget.attrs;

    const { pageX: mouseX, pageY: mouseY } = event.evt;

    const gettedStartCoords = {
      x: mouseX - relatedToParentX,
      y: mouseY - relatedToParentY,
    };

    setReferenceData(gettedStartCoords, startCoordsRef, _setStartCoords);

    const gettedMovedColumnData = {
      id: event.target.attrs.id,
      width,
      height,
    };

    setReferenceData(
      gettedMovedColumnData,
      movedColumnDataRef,
      _setMovedColumnData
    );

    setMovedColumnId(gettedMovedColumnData.id);

    window.addEventListener("mousemove", moveColumn);
    window.addEventListener("mouseup", endMoveColumn);
  };

  const handleChange = (id) => (text) => {
    const newColumns = recentlyColumns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          title: text,
        };
      }
      return column;
    });
    setReferenceData(newColumns, latestColumnsRef, _setLatestColumns);
    changeTextInColumn({
      userId: users.currentUser.userId,
      projectId: projects.currentProject.projectId,
      title: text,
      columnId: id,
    });
  };

  const handleDoubleClick = (references, widthParent) => (event) => {
    editText(
      references,
      handleChange(event.target.attrs.id),
      widthParent,
      event
    );
  };

  return (
    <>
      {recentlyColumns.length > 0 &&
        recentlyColumns.map((column) => {
          return (
            <React.Fragment key={column.id}>
              <Rect
                id={column.id}
                width={column.widthColumn}
                height={column.heightColumn}
                x={column.columnX}
                y={column.columnY}
                strokeWidth={layouts.strokeWidthPlaceholder}
                stroke={layouts.colorPlaceholder}
                onMouseDown={startMoveColumn}
              />
              <Text
                id={column.id}
                x={column.titleX}
                y={column.titleY}
                text={column.title}
                fontFamily={layouts.fontFamilyPlaceholder}
                fontSize={layouts.fontSizePlaceholder}
                fill={layouts.colorPlaceholder}
                onDblClick={handleDoubleClick(references, column.widthColumn)}
              />
            </React.Fragment>
          );
        })}
    </>
  );
};

export default DigitalPolicyModelCanvas;
