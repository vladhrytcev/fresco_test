import React from "react";
import { v4 as uuidv4 } from "uuid";
import { palette } from "../../constants/palette";
import "./ColorSelector.scss";

const ColorSelector = ({
  currentTool,
  switchBrushTool,
  selectColorBrush,
  switchPaletteTool,
}) => {
  const colors = Object.values(palette);

  const conditionShowingColorSelector = currentTool === "palette";
  const chooseColorBrush = ({ target }) => {
    selectColorBrush(target.style.backgroundColor);
    switchPaletteTool(false);
    switchBrushTool(true);
  };

  return (
    <div
      className={conditionShowingColorSelector ? "selector active" : "selector"}
    >
      <div className="selector__inner">
        {colors.map((color) => (
          <div
            key={uuidv4()}
            className="selector__item"
            style={{ backgroundColor: color }}
            onClick={chooseColorBrush}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
