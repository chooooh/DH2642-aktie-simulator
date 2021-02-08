import { connect } from "react-redux";

import { AccountView } from "../views/authenticationView.js";
import { signUp, signIn } from "../apiHandling/auth.js";


const mapStateToProps = (state) => ({
    signUpError:   state.AuthReducer.signUpError,
    signInError:   state.AuthReducer.signInError,
    signUpSuccess: state.AuthReducer.signUpSuccess,
    signInRequest: state.AuthReducer.signInRequest
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (email, password) => signUp(email, password, dispatch),
    signIn: (email, password) => signIn(email, password, dispatch)
});

export const Account = connect(mapStateToProps, mapDispatchToProps)(AccountView);
