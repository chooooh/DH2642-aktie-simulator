
import { connect } from "react-redux";

import { SearchBarView } from "../views/searchBarView.js";
import { stockTicker } from "../redux/actions/stockActions.js";
import { changeLocation } from "../redux/actions/userActions.js";
import { userSearching, searchStock, fetchCompanyOverview } 
    from "../apiHandling/tickerSource.js";


const mapStateToProps = (state) => ({
    bestMatches: state.StockReducer.bestMatches,
    searchingStocks: state.StockReducer.searchStockRequest,
});

const mapDispatchToProps = (dispatch) => ({
    search: (currentInput) => userSearching(currentInput, dispatch),
    stockChosen: (tickerChosen) => {
        dispatch(stockTicker(tickerChosen));
        searchStock(tickerChosen, "TIME_SERIES_DAILY_ADJUSTED", dispatch);
        fetchCompanyOverview(tickerChosen, dispatch);
        dispatch(changeLocation("/detailedStock"));
    },
    redirectToResults: () => dispatch(changeLocation("/results")),

});

export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBarView);
 