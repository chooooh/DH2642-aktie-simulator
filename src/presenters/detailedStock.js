
import { connect} from "react-redux";

import { DetailedStockView } from "../views/detailedStockView";
import { writeStockToDB } from "../apiHandling/firebase.js";
import { setPopUpMessage } from "../redux/actions/userActions.js"

const mapStateToProps = (state) => ({
    tickerChosen:        state.StockReducer.tickerChosen,
    companyInfo:         state.StockReducer.companyInfo,
    data:                state.StockReducer.stockData,
    requestingStockData: state.StockReducer.fetchStockRequest,
    user:                state.AuthReducer.currentUser,
    userBalance:         state.UserReducer.userBalance,
})

const mapDispatchToProps = (dispatch) => ({
    onBuy: (date, price, quantity, tickerChosen, user) => {
        writeStockToDB(
            user,
            tickerChosen,
            date,
            price,
            quantity,
            dispatch
        );

        setTimeout(() => dispatch(setPopUpMessage("Stock bought!")), 500);
    }
})

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    onBuy: (date, price, quantity) => dispatchProps.onBuy(
        date, price, quantity, stateProps.tickerChosen, stateProps.user
    )
})

export const DetailedStock = connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailedStockView)
