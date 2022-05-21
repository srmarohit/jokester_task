import { FETCH_USERS, LOGIN, LOGOUT, UPDATE_PROFILE } from "./actions";

const initialState = {
  user: null,
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log("login action performed");
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    }

    case LOGOUT:
      (state = initialState, action) => {
        return {
          user: null,
          users: null,
        };
      };

    case FETCH_USERS:
      (state = initialState, action) => {
        const users = action.payload;
        return {
          ...state,
          users,
        };
      };

    case UPDATE_PROFILE:
      (state = initialState, action) => {
        const { name, email, password } = action.payload;
        return {
          ...state,
          user: { ...state.user, name, email, password },
        };
      };

    default:
      return { ...state };
  }
};

export default reducer;
