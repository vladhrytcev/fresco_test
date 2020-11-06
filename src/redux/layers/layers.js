const SAVE_LAYER = "SAVE_LAYER";
const DELETE_LAYER = "DELETE_LAYER";

export const saveLayer = (layer) => ({
  type: SAVE_LAYER,
  payload: { layer },
});

export const deleteLayer = (identifiedData) => ({
  type: DELETE_LAYER,
  payload: { identifiedData },
});

const initialState = [];

export const layers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_LAYER: {
      const findingLayer = !!state.find(
        (layer) => layer.projectId === payload.layer.projectId
      );
      if (findingLayer) {
        return state.map((layer) => {
          if (layer.projectId === payload.layer.projectId) {
            return {
              ...layer,
              isClear: false,
              drawLayer: payload.layer.drawLayer,
            };
          } else {
            return layer;
          }
        });
      } else {
        return state.concat(payload.layer);
      }
    }
    case DELETE_LAYER: {
      return state.map((layer) => {
        if (
          layer.userId === payload.identifiedData.userId &&
          layer.projectId === payload.identifiedData.projectId
        ) {
          return {
            ...layer,
            isClear: true,
          };
        } else {
          return layer;
        }
      });
    }
    default: {
      return state;
    }
  }
};
