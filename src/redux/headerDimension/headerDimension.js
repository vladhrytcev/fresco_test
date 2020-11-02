export const SET_HEADER_DIMENSION = "SET_HEADER_DIMENSION";

export const setHeaderDimension = (dimension) => ({
  type: SET_HEADER_DIMENSION,
  payload: { dimension },
});

const initialState = {};

export const headerDimension = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_HEADER_DIMENSION: {
      return payload.dimension;
    }
    default: {
      return state;
    }
  }
};
