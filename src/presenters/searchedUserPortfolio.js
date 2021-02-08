import { connect } from "react-redux";

import { changeLocation } from "../redux/actions/userActions.js";
import { stockTicker } from "../redux/actions/stockActions.js";
import { SearchedUserPortfolioView } from "../views/searchedUserPortfolioView.js";
import { searchUserStocks, fetchCompanyOverview, searchStock } from "../apiHandling/tickerSource.js";

const mapStateToProps = (state) => ({
    boughtStocks: state.UserReducer.boughtStocks,
    currentStateOfBoughtStocks: state.UserReducer.currentStateOfBoughtStocks,
    fetchUserStocksLock: state.UserReducer.fetchUserStocksLock,
    balance: state.UserReducer.userBalance,
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
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    
    fetchCurrentStateOfBoughtStocks: () => {
        dispatchProps.fetchCurrentStateOfBoughtStocks(
            stateProps.boughtStocks,
            stateProps.fetchUserStocksLock         
        );
    }
});

export const SearchedUserPortfolio = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(SearchedUserPortfolioView);