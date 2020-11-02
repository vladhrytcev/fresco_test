export const SAVE_LAYER = "SAVE_LAYER";

export const saveLayer = (layer) => ({
  type: SAVE_LAYER,
  payload: { layer },
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
              notes: payload.layer.notes,
              gridLayer: payload.layer.gridLayer,
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
    default: {
      return state;
    }
  }
};
