
import { connect } from "react-redux";

import { GraphView } from "../views/graphView";
import { searchStock } from "../apiHandling/tickerSource";
import { intervalChange } from "../redux/actions/stockActions.js";

const mapStateToProps = (state) => ({
    data:     state.StockReducer.stockData,
    ticker:   state.StockReducer.tickerChosen,
    interval: state.StockReducer.interval
});

const mapDispatchToProps = (dispatch) => ({
    onIntervalChange: (interval, ticker) => {
        dispatch(intervalChange(interval))
        searchStock(ticker, interval, dispatch)
    },
})

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    onIntervalChange: (interval) =>
        dispatchProps.onIntervalChange(interval, stateProps.ticker),
});

export const Graph = connect(mapStateToProps, mapDispatchToProps, mergeProps)(GraphView);