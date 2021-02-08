
import { connect } from "react-redux";

import { changeLocation } from "../redux/actions/userActions.js";
import { stockTicker } from "../redux/actions/stockActions.js";
import { PortfolioView } from "../views/portfolioView.js";
import { removeStockFromDB } from "../apiHandling/firebase.js";
import { searchUserStocks, fetchCompanyOverview, searchStock } from "../apiHandling/tickerSource.js";

const mapStateToProps = (state) => ({
    boughtStocks: state.UserReducer.boughtStocks,
    currentStateOfBoughtStocks: state.UserReducer.currentStateOfBoughtStocks,
    fetchUserStocksLock: state.UserReducer.fetchUserStocksLock,
    balance: state.UserReducer.userBalance,
    viewedUser: state.UserReducer.viewedUser,
    currentUser: state.AuthReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    viewStock: (tickerChosen) => {
        dispatch(stockTicker(tickerChosen));
        searchStock(tickerChosen, "TIME_SERIES_DAILY_ADJUSTED", dispatch);
        fetchCompanyOverview(tickerChosen, dispatch);
        dispatch(changeLocation("/detailedStock"));
    },
    fetchCurrentStateOfBoughtStocks: (boughtStocks, fetchUserStocksLock) => {
        searchUserStocks(boughtStocks, fetchUserStocksLock, dispatch)
    },
    onSell: (id, quantity, price, currentUser) => {
        removeStockFromDB(
            currentUser,
            id,
            quantity,
            price,
            dispatch,
        );
    },
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    
    fetchCurrentStateOfBoughtStocks: () => {
        dispatchProps.fetchCurrentStateOfBoughtStocks(
            stateProps.boughtStocks,
            stateProps.fetchUserStocksLock         
        );
    },

    onSell: (id, quantity, price) => dispatchProps.onSell(id, quantity, price, stateProps.currentUser)
});

export const Portfolio = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(PortfolioView);
