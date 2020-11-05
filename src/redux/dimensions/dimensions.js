const SET_HEADER_DIMENSION = "SET_HEADER_DIMENSION";
const SET_TOOLBAR_DIMENSION = "SET_TOOLBAR_DIMENSION";

export const setHeaderDimension = (dimension) => ({
  type: SET_HEADER_DIMENSION,
  payload: { dimension },
});

export const setToolbarDimension = (dimension) => ({
  type: SET_TOOLBAR_DIMENSION,
  payload: { dimension },
});

const initialState = {
  header: { height: 0 },
  toolbar: { width: 0 },
};

export const dimensions = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_HEADER_DIMENSION: {
      return {
        ...state,
        header: {
          ...state.header,
          height: payload.dimension.height,
        },
      };
    }
    case SET_TOOLBAR_DIMENSION: {
      return {
        ...state,
        toolbar: {
          ...state.toolbar,
          width: payload.dimension.width,
        },
      };
    }
    default: {
      return state;
    }
  }
};
