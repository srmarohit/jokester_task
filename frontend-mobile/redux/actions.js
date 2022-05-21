export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const FETCH_USERS = "FETCH_USERS";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const fetchUsers = (payload) => (dispatch) => {
  dispatch({
    type: FETCH_USERS,
    payload,
  });
};

export const login = (payload) => (dispatch) =>
  dispatch({
    type: LOGIN,
    payload,
  });

export const logout = () => (dispatch) =>
  dispatch({
    type: LOGOUT,
  });

export const updateProfile = (payload) => (dispatch) =>
  dispatch({
    type: UPDATE_PROFILE,
    payload,
  });
