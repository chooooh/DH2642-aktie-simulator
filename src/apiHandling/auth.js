import { auth, readUserFromDB, createNewUser, loadBalanceFromDB } from "./firebase";
import {
    signUpRequest,
    signUpError,
    signUpSuccess,
    signInRequest,
    signInSuccess,
    signInError,
    signOutRequest,
    signOutSuccess,
    signOutError,
} from "../redux/actions/authActions.js";
import { changeLocation, setPopUpMessage, clearUserReducer } from "../redux/actions/userActions.js";

export function signUp(email, password, dispatch) {
    dispatch(signUpRequest());
    return auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            dispatch(signUpSuccess());
            createNewUser(email);
        })
        .catch((err) => dispatch(signUpError(err.message)));
}

export function signIn(email, password, dispatch) {
    dispatch(signInRequest());
    return auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch(signInSuccess(getUser()));
            dispatch(changeLocation("/homePage"));
            dispatch(setPopUpMessage("Successful login! Welcome " + email));
            loadBalanceFromDB(email, dispatch);
        })
        .catch((err) => dispatch(signInError(err.message)));
}

export function signOut(dispatch) {
    dispatch(signOutRequest());
    return auth()
        .signOut()
        .then(() => {
            dispatch(signOutSuccess());
            dispatch(clearUserReducer());
            dispatch(changeLocation("/homepage"));
            dispatch(setPopUpMessage("Successfully signed out!"));
        })
        .catch((err) => dispatch(signOutError(err.message)));
}

export function getUser() {
    const user = auth().currentUser;
    return user ? user : false;
}
