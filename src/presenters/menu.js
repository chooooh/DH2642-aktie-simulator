
import { connect } from "react-redux";

import { MenuView } from "../views/hellView.js";
import { getUser, signOut } from "../apiHandling/auth.js";
import { changeLocation } from "../redux/actions/userActions";

const mapStateToProps = (state) => ({
    currentLocation: state.UserReducer.currentLocation,
    user:            state.AuthReducer.currentUser,
    boughtStocks:    state.UserReducer.boughtStocks,
});

const mapDispatchToProps = (dispatch) => ({
    signOut:             () => signOut(dispatch),
    onSignInButtonClick: () => dispatch(changeLocation("/account")),
    onPortfolio:         () => dispatch(changeLocation("/portfolio")),
    onHomePage:          () => dispatch(changeLocation("/homePage")),
    onResults:           () => dispatch(changeLocation("/results")),
});

export const Menu = connect(mapStateToProps, mapDispatchToProps)(NavigationView);
