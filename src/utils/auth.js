/* eslint-disable */
let initialState = {
  auth: false,
  email: '',
  info: {},
  students: []
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
    case 'SET_SESSION_ID':
      return {
        ...currentState,
        id: action.payload
      };
    case 'SET_INFO_ON_LOGIN':
      return {
        ...currentState,
        info: action.payload
      };
    case 'SET_STUDENT_LIST':
      return {
        ...currentState,
        students: action.payload
      };
    default:
      return currentState;
  }
}
