import React, { useState, useRef } from "react";
import { Rect, Text } from "react-konva";
import { editText } from "../../drawingTools/editText";

const Grid = ({
  tools,
  columns,
  sizeCanvas,
  currentTool,
  saveGridLayer,
  positionCanvas,
}) => {
  const color = "#E65100";
  const stroke = 1;

  const [startCoords, _setStartCoords] = useState({});
  const [finalCoords, _setFinalCoords] = useState({});
  const [movedColumnData, _setMovedColumnData] = useState({});
  const [latestColumns, _setLatestColumns] = useState([]);

  const startCoordsRef = useRef(startCoords);
  const setStartCoords = (coords) => {
    startCoordsRef.current = coords;
    _setStartCoords(coords);
  };

  const finalCoordsRef = useRef(finalCoords);
  const setFinalCoords = (coords) => {
    finalCoordsRef.current = coords;
    _setFinalCoords(coords);
  };

  const movedColumnDataRef = useRef(movedColumnData);
  const setMovedColumnData = (columnData) => {
    movedColumnDataRef.current = columnData;
    _setMovedColumnData(columnData);
  };

  const latestColumnsRef = useRef(latestColumns);
  const setLatestColumns = (columns) => {
    latestColumnsRef.current = columns;
    _setLatestColumns(columns);
  };

  const checkConditionsForReturnColumn = (
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

  const changeColumnLayout = (layout) => {
    const recentlyColumns = latestColumns.length > 0 ? latestColumns : columns;

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

    setLatestColumns(newColumns);
  };

  const moveColumn = (event) => {
    const { pageX: mouseX, pageY: mouseY } = event;

    const {
      x: diffBetweenDocAndParentX,
      y: diffBetweenDocAndParentY,
    } = startCoordsRef.current;

    if (currentTool !== tools.pointer) return;

    const layout = {
      id: movedColumnDataRef.current.id,
      x: mouseX - diffBetweenDocAndParentX,
      y: mouseY - diffBetweenDocAndParentY,
    };

    setFinalCoords({ x: layout.x, y: layout.y });
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
      const findingColumns = latestColumns.find(
        (col) => col.id === movedColumnDataRef.current.id
      );

      const layout = {
        id: movedColumnDataRef.current.id,
        x: findingColumns.columnX,
        y: findingColumns.columnY,
      };
      changeColumnLayout(layout);
    }

    saveGridLayer(latestColumnsRef.current);
    setStartCoords({});

    window.removeEventListener("mousemove", moveColumn);
    window.removeEventListener("mouseup", endMoveColumn);
  };

  const settingStartCoords = (coords) => setStartCoords(coords);
  const settingMovedColumnData = (data) => setMovedColumnData(data);

  const startMoveColumn = (event) => {
    if (currentTool !== tools.pointer) return;
    const {
      width,
      height,
      x: relatedToParentX,
      y: relatedToParentY,
    } = event.currentTarget.attrs;

    const { pageX: mouseX, pageY: mouseY } = event.evt;

    settingStartCoords({
      x: mouseX - relatedToParentX,
      y: mouseY - relatedToParentY,
    });

    settingMovedColumnData({
      id: event.target.attrs.id,
      width,
      height,
    });

    window.addEventListener("mousemove", moveColumn);
    window.addEventListener("mouseup", endMoveColumn);
  };

  const recentlyColumns = latestColumns.length > 0 ? latestColumns : columns;

  return (
    <>
      {recentlyColumns.length > 0 &&
        recentlyColumns.map((column) => {
          return (
            <React.Fragment key={column.id}>
              <Rect
                id={column.id}
                x={column.columnX}
                y={column.columnY}
                width={column.widthColumn}
                height={column.heightColumn}
                stroke={color}
                strokeWidth={stroke}
                onMouseDown={startMoveColumn}
              />
              <Text
                x={column.titleX}
                y={column.titleY}
                text={column.title}
                fontSize={16}
                fontFamily={"Open Sans"}
                fill={color}
                onDblClick={editText}
              />
            </React.Fragment>
          );
        })}
    </>
  );
};

export default Grid;
