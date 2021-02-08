import { 
    INITIALIZE_AUTH_STATE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    SIGN_IN_ERROR,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_ERROR
} from "./actionTypes.js";

export const initAuthState = (storedAuthReducer) => ({
    type: INITIALIZE_AUTH_STATE,
    payload: {
        ...storedAuthReducer,
    },
});

export const signUpRequest = () => ({
    type: SIGN_UP_REQUEST,
});

export const signUpSuccess = () => ({
    type: SIGN_UP_SUCCESS,
});

export const signUpError = (errorMessage) => ({
    type: SIGN_UP_ERROR,
    payload: {
        errorMessage,
    },
});

export const signInRequest = () => ({
    type: SIGN_IN_REQUEST,
});

export const signInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: {
        currentUser: user.email,
    },
});

export const signInError = (errorMessage) => ({
    type: SIGN_IN_ERROR,
    payload: {
        errorMessage,
    },
});

export const signOutRequest = () => ({
    type: SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS,
});

export const signOutError = (errorMessage) => ({
    type: SIGN_OUT_ERROR,
    payload: {
        errorMessage,
    },
});
