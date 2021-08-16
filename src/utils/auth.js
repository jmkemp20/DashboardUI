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
    case 'SET_FIRST_NAME':
      return {
        ...currentState,
        firstName: action.payload
      };
    case 'SET_LAST_NAME':
      return {
        ...currentState,
        lastName: action.payload
      };
    case 'SET_EMAIL':
      return {
        ...currentState,
        email: action.payload
      };
    default:
      return currentState;
  }
}
