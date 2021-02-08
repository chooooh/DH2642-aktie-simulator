import * as actions from "../actions/actionTypes.js";

const initialState = {
    currentUser: null,
    signUpRequest: false,
    signUpSuccess: false,
    signUpError: null,
    signInRequest: false,
    signInSuccess: false,
    signInError: null,
    signOutRequest: false,
    signOutSuccess: false,
    signOutError: null,
};

export function AuthReducer(state = initialState, action) {
  switch (action.type) {

    case actions.INITIALIZE_AUTH_STATE: {
      return{
        ...state,
        ...action.payload
      }
    }

    case actions.SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpRequest: true,
        signUpSuccess: false,
        signUpError: null,
        signInError: null
      };
    }

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpRequest: false,
        signUpSuccess: true,
        signUpError: null,
      };

    case actions.SIGN_UP_ERROR:
      return {
        ...state,
        signUpRequest: false,
        signUpSuccess: false,
        signUpError: action.payload.errorMessage,
        signInError: null,
      };

    case actions.SIGN_IN_REQUEST: {
      return {
        ...state,
        signInRequest: true,
        signInSuccess: false,
        signUpSuccess: false,
        signInError: null,
        signUpError: null,
        currentUser: null,
      };
    }

    case actions.SIGN_IN_SUCCESS: {
      return {
        ...state,
        signInRequest: false,
        signInSuccess: true,
        signInError: false,
        signUpSuccess: false,
        currentUser: action.payload.currentUser,
      };
    }

    case actions.SIGN_IN_ERROR: {
      return {
        ...state,
        signInRequest: false,
        signInSuccess: false,
        signInError: action.payload.errorMessage,
        signUpError: null,
        currentUser: null,
      };
    }

    case actions.SIGN_OUT_REQUEST: {
      return {
        ...state,
        signOutRequest: true,
        signOutSuccess: false,
        signOutError: null,
      };
    }

    case actions.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        signOutRequest: false,
        signOutSuccess: true,
        signOutError: null,
        signInSuccess: false,
        currentUser: null,
      };
    }

    case actions.SIGN_OUT_ERROR: {
      return {
        ...state,
        signOutRequest: false,
        signOutSuccess: false,
        signOutError: action.payload.errorMessage,
      };
    }

    default:
      return state;
  }
}
