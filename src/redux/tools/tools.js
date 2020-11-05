import { toolsList } from "../../constants/toolsList";
const SET_CURRENT_TOOL = "SET_CURRENT_TOOL";
const SELECT_COLOR_BRUSH = "SELECT_COLOR_BRUSH";

export const setCurrentTool = (tool) => ({
  type: SET_CURRENT_TOOL,
  payload: { tool },
});

export const selectColorBrush = (color) => ({
  type: SELECT_COLOR_BRUSH,
  payload: { color },
});

const initialState = {
  currentTool: toolsList.default,
  colorBrush: "red",
};

export const tools = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_TOOL: {
      return {
        ...state,
        currentTool: payload.tool,
      };
    }
    case SELECT_COLOR_BRUSH: {
      return {
        currentTool: toolsList.brush,
        colorBrush: payload.color,
      };
    }
    default: {
      return state;
    }
  }
};
