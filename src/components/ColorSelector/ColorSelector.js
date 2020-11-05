import React from "react";
import { connect } from "react-redux";
import { selectColorBrush } from "../../redux/tools/tools";
import { v4 as uuidv4 } from "uuid";
import { palette } from "../../constants/palette";
import { toolsList } from "../../constants/toolsList";
import "./ColorSelector.scss";

const ColorSelector = ({ tools, actions }) => {
  const colors = Object.values(palette);

  const conditionShowingColorSelector = tools.currentTool === toolsList.palette;
  const chooseColorBrush = ({ target }) => {
    actions.selectColorBrush(target.style.backgroundColor);
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

const mapStateToProps = (state) => ({
  tools: state.tools,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    selectColorBrush: (color) => dispatch(selectColorBrush(color)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorSelector);
