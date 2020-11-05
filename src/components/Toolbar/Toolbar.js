import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setToolbarDimension } from "../../redux/dimensions/dimensions";
import { setCurrentTool } from "../../redux/tools/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { withResizeDetector } from "react-resize-detector";
import ColorSelector from "../ColorSelector";
import PopupSave from "../PopupSave";
import { toolsList } from "../../constants/toolsList";
import "./Toolbar.scss";

const Toolbar = ({
  actions,
  projects,
  toggleShowingSavePopup,
  saveCanvas,
  tools,
  width,
  isShowPopup,
}) => {
  const conditionShowingSelectedColor = tools.currentTool === toolsList.brush;
  const toolbarWidth = Math.floor(width);

  const conditionShowingAddRectangleTool =
    projects.currentProject.projectTemplate === "Custom";

  const saveButton = () => {
    saveCanvas();
    toggleShowingSavePopup();
  };

  const switchAddNoteTool = () => actions.setCurrentTool(toolsList.note);
  const switchPointerTool = () => actions.setCurrentTool(toolsList.pointer);
  const switchPaletteTool = () => actions.setCurrentTool(toolsList.palette);
  const switchRectangleTool = () => actions.setCurrentTool(toolsList.rectangle);

  useEffect(() => {
    if (!!toolbarWidth) {
      actions.setToolbarDimension({
        width: toolbarWidth,
      });
    }
  }, [actions, toolbarWidth]);

  return (
    <div className="toolbar">
      <button
        title="pointer"
        className={
          tools.currentTool === toolsList.pointer
            ? "toolbar__btn selected"
            : "toolbar__btn"
        }
        onClick={switchPointerTool}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faHandPointer}
          className="toolbar__icon"
        />
      </button>
      <button
        title="note"
        className={
          tools.currentTool === toolsList.note
            ? "toolbar__btn selected"
            : "toolbar__btn"
        }
        onClick={switchAddNoteTool}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faClipboard}
          className="toolbar__icon"
        />
      </button>
      <button
        title="brush"
        className={
          tools.currentTool === toolsList.brush
            ? "toolbar__btn  selected"
            : "toolbar__btn"
        }
        onClick={switchPaletteTool}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faPaintRoller}
          className="toolbar__icon"
          style={{ color: conditionShowingSelectedColor && tools.colorBrush }}
        />
      </button>
      {conditionShowingAddRectangleTool && (
        <button
          title="rectangle"
          className={
            tools.currentTool === toolsList.rectangle
              ? "toolbar__btn selected"
              : "toolbar__btn"
          }
          onClick={switchRectangleTool}
        >
          <FontAwesomeIcon
            size="lg"
            icon={faColumns}
            className="toolbar__icon"
          />
        </button>
      )}
      <button
        title="save"
        className="toolbar__btn  toolbar__btn--save"
        onClick={saveButton}
      >
        <FontAwesomeIcon icon={faSave} className="toolbar__icon" size="lg" />
        <PopupSave isShowPopup={isShowPopup} />
      </button>
      <ColorSelector />
    </div>
  );
};

const mapStateToProps = (state) => ({
  tools: state.tools,
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    setToolbarDimension: (dimension) =>
      dispatch(setToolbarDimension(dimension)),
    setCurrentTool: (tool) => dispatch(setCurrentTool(tool)),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withResizeDetector(Toolbar));
