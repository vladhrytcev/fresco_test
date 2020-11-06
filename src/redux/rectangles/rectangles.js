const CREATE_RECTANGLE = "CREATE_RECTANGLE";
const SELECT_ACTIVE_RECTANGLE = "SELECT_ACTIVE_RECTANGLE";
const UPDATE_RECTANGLES = "UPDATE_RECTANGLES";
const DISABLE_ALL_RECTANGLES = "DISABLE_ALL_RECTANGLES";
const CHANGE_TEXT_IN_RECTANGLE = "CHANGE_TEXT_IN_RECTANGLE";
const DELETE_ALL_RECTANGLES = "DELETE_ALL_RECTANGLES";

export const createRectangle = (rectangle) => ({
  type: CREATE_RECTANGLE,
  payload: { rectangle },
});

export const selectActiveRectangle = (rectangleId) => ({
  type: SELECT_ACTIVE_RECTANGLE,
  payload: { rectangleId },
});

export const updateRectangles = (rectangles) => ({
  type: UPDATE_RECTANGLES,
  payload: { rectangles },
});

export const disableAllRectangles = () => ({
  type: DISABLE_ALL_RECTANGLES,
});

export const changeTextInRectangle = (rectangle) => ({
  type: CHANGE_TEXT_IN_RECTANGLE,
  payload: { rectangle },
});

export const deleteAllRectangles = (identifiedData) => ({
  type: DELETE_ALL_RECTANGLES,
  payload: { identifiedData },
});

const initialState = {
  rectanglesList: [],
};

export const rectangles = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_RECTANGLE: {
      return {
        ...state,
        rectanglesList: state.rectanglesList.concat(payload.rectangle),
      };
    }
    case SELECT_ACTIVE_RECTANGLE: {
      const newRectangles = state.rectanglesList.map((rect) => {
        if (rect.rectangleId === payload.rectangleId) {
          return { ...rect, isSelectedRectangle: true };
        }
        return { ...rect, isSelectedRectangle: false };
      });
      return {
        ...state,
        rectanglesList: newRectangles,
      };
    }
    case UPDATE_RECTANGLES: {
      return {
        ...state,
        rectanglesList: payload.rectangles,
      };
    }
    case DISABLE_ALL_RECTANGLES: {
      const newRectangles = state.rectanglesList.map((rect) => {
        return { ...rect, isSelectedRectangle: false };
      });
      return {
        ...state,
        rectanglesList: newRectangles,
      };
    }
    case CHANGE_TEXT_IN_RECTANGLE: {
      const newRectangles = state.rectanglesList.map((rect) => {
        if (rect.rectangleId === payload.rectangle.rectangleId) {
          return { ...rect, text: payload.rectangle.text };
        }
        return rect;
      });
      return {
        ...state,
        rectanglesList: newRectangles,
      };
    }
    case DELETE_ALL_RECTANGLES: {
      const newRectangles = state.rectanglesList.filter(
        (rect) =>
          !(
            rect.userId === payload.identifiedData.userId &&
            rect.projectId === payload.identifiedData.projectId
          )
      );
      return {
        ...state,
        rectanglesList: newRectangles,
      };
    }
    default: {
      return state;
    }
  }
};
