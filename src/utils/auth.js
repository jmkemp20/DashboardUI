/* eslint-disable */
let initialState = {
  auth: false,
  email: '',
  firstName: '',
  lastName: ''
};

export default function auth(currentState = initialState, action) {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
       ...currentState,
        auth: action.payload
      };
    case 'SET_USER_NAME':
      return {
        auth: action.payload,
        ...payload.currentState
      };
    default:
      return currentState;
  }
}
