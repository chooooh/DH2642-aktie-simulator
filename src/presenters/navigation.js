
import { connect } from "react-redux";

import { NavigationView } from "../views/navigationView.js";
import { signOut } from "../apiHandling/auth.js";
import { changeLocation, changeTheme } from "../redux/actions/userActions";
import { readUsersInDB, readUserFromDB } from "../apiHandling/firebase";

const mapStateToProps = (state) => ({
    currentLocation:          state.UserReducer.currentLocation,
    userEmail:                state.AuthReducer.currentUser,    //logged in user
    boughtStocks:             state.UserReducer.boughtStocks,
    usersFound:               state.UserReducer.usersFound,
    searchingForUsersRequest: state.UserReducer.searchingForUsersRequest,
    searchingForUsersSuccess: state.UserReducer.ssearchingForUsersSuccess
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => signOut(dispatch),
    onSignInButtonClick: () => dispatch(changeLocation("/account")),
    onPortfolio: (userEmail) => {
        readUserFromDB(userEmail, dispatch);
        dispatch(changeLocation("/portfolio"));
    },
    onHomePage: () => dispatch(changeLocation("/homePage")),
    onResults: () => dispatch(changeLocation("/results")),
    onThemeChange: () => dispatch(changeTheme()),
    onSearch: (input) => readUsersInDB(input, dispatch),
    onUser: (email) => {
        readUserFromDB(email, dispatch);
        dispatch(changeLocation("/portfolio"));
    }
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,

    onPortfolio: () => dispatchProps.onPortfolio(stateProps.userEmail)
})

export const Menu = connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavigationView);
