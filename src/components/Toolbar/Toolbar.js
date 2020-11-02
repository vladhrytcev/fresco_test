import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { withResizeDetector } from "react-resize-detector";
import ColorSelector from "../ColorSelector";
import "./Toolbar.scss";

const Toolbar = ({
  width,
  height,
  tools,
  saveSheet,
  colorBrush,
  currentTool,
  switchBrushTool,
  selectColorBrush,
  switchAddNoteTool,
  switchPointerTool,
  switchPaletteTool,
  setToolbarDimension,
  toggleShowingSavePopup,
}) => {
  const conditionShowingSelectedColor = currentTool === tools.brush;
  const toolbarWidth = Math.floor(width);
  const toolbarHeight = Math.floor(height);

  const saveButton = () => {
    saveSheet();
    toggleShowingSavePopup();
  };

  useEffect(() => {
    setToolbarDimension({ width: toolbarWidth, height: toolbarHeight });
  }, [width, height]); //eslint-disable-line

  return (
    <div className="toolbar">
      <button
        className={
          currentTool === tools.pointer
            ? "toolbar__btn selected"
            : "toolbar__btn"
        }
        onClick={switchPointerTool}
      >
        <FontAwesomeIcon
          icon={faHandPointer}
          className="toolbar__icon"
          size="lg"
        />
      </button>
      <button
        className={
          currentTool === tools.note ? "toolbar__btn selected" : "toolbar__btn"
        }
        onClick={switchAddNoteTool}
      >
        <FontAwesomeIcon
          icon={faClipboard}
          className="toolbar__icon"
          size="lg"
        />
      </button>
      <button
        className={
          currentTool === tools.brush
            ? "toolbar__btn  selected"
            : "toolbar__btn"
        }
        onClick={switchPaletteTool}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faPaintRoller}
          className="toolbar__icon"
          style={{ color: conditionShowingSelectedColor ? colorBrush : "" }}
        />
      </button>
      <button className="toolbar__btn" onClick={saveButton}>
        <FontAwesomeIcon icon={faSave} className="toolbar__icon" size="lg" />
      </button>
      <ColorSelector
        currentTool={currentTool}
        switchBrushTool={switchBrushTool}
        selectColorBrush={selectColorBrush}
        switchPaletteTool={switchPaletteTool}
      />
    </div>
  );
};

export default withResizeDetector(Toolbar);
