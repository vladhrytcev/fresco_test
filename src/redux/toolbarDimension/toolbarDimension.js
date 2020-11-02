export const SET_TOOLBAR_DIMENSION = "SET_TOOLBAR_DIMENSION";

export const setToolbarDimension = (dimension) => ({
  type: SET_TOOLBAR_DIMENSION,
  payload: { dimension },
});

const initialState = {};

export const toolbarDimension = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOOLBAR_DIMENSION: {
      return payload.dimension;
    }
    default: {
      return state;
    }
  }
};
