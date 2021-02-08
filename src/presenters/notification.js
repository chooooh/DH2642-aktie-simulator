
import { connect } from "react-redux";

import { NotificationView } from "../views/notificationView.js";
import { setPopUpMessage } from "../redux/actions/userActions.js";

const mapStateToProps = (state) => ({
    message: state.UserReducer.popUpMessage
}) 

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(setPopUpMessage("")),
});

export const Notification = connect(mapStateToProps, mapDispatchToProps)(NotificationView);