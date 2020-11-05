const CREATE_PROJECT = "CREATE_PROJECT";
const SET_ACTIVE_PROJECT = "SET_ACTIVE_PROJECT";

export const createProject = (project) => ({
  type: CREATE_PROJECT,
  payload: { project },
});

export const setActiveProject = (project) => ({
  type: SET_ACTIVE_PROJECT,
  payload: { project },
});

const initialState = {
  currentProject: {},
  projectsList: [],
};

export const projects = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_PROJECT: {
      return {
        currentProject: payload.project,
        projectsList: state.projectsList.concat(payload.project),
      };
    }
    case SET_ACTIVE_PROJECT: {
      return {
        ...state,
        currentProject: payload.project,
      };
    }
    default: {
      return state;
    }
  }
};
