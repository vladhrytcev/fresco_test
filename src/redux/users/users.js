export const SIGN_IN = "SIGN_IN";

export const signIn = (user) => ({
  type: SIGN_IN,
  payload: { user },
});

const initialState = {
  currentUser: {},
  usersList: [],
};

export const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN: {
      return {
        currentUser: payload.user,
        usersList: state.usersList.concat(payload.user),
      };
    }
    default: {
      return state;
    }
  }
};
