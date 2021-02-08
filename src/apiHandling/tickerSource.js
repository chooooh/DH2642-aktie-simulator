import { API_KEY, BASE_URL } from "./apiConfig.js";
import { Parser } from "../js/parser.js";
import {
    fetchStockRequest,
    fetchStockSuccess,
    fetchStockError,
    fetchCompanyInfoRequest,
    fetchCompanyInfoSuccess,
    fetchCompanyInfoError,
    searchStockRequest,
    searchStockSuccess,
    searchStockError
} from "../redux/actions/stockActions.js";
import { 
    fetchUserStock, 
    setFetchUserStocksLock,
    setPopUpMessage, 
} from "../redux/actions/userActions.js";

const TickerSource = {
    apiCall(params) {
        return fetch(BASE_URL + params).then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("Not status code 200");
        });
    },

    searchStock(ticker, interval) {
        if (!ticker) throw new Error("searchStock: Invalid ticker symbol");
        return this.apiCall(
            interval + "&symbol=" + ticker + "&apikey=" + API_KEY
        );
    },
};

export const userSearching = (keywords, dispatch) => {
    dispatch(searchStockRequest());
    return TickerSource.apiCall(
        "SYMBOL_SEARCH&keywords=" + keywords + "&apikey=" + API_KEY
    )
        .then((data) =>
            data["Note"]
                ? dispatch(setPopUpMessage(data["Note"]))
                : dispatch(searchStockSuccess(Parser.parseSearchResults(data)))
        )
        .catch((err) => dispatch(searchStockError(err)));
};

export const searchStock = (ticker, interval, dispatch) => {
    dispatch(fetchStockRequest());
    return TickerSource.searchStock(ticker, interval)
        .then((data) =>
            data["Note"]
                ? dispatch(setPopUpMessage(data["Note"]))
                : dispatch(fetchStockSuccess(Parser.parseStock(data)))
        )
        .catch((err) => dispatch(fetchStockError(err)));
};

export const searchUserStocks = (boughtStocks, fetchUserStocksLock, dispatch) => {
    
    if(fetchUserStocksLock)
        return;
    
    dispatch(setFetchUserStocksLock(true));

    for (const stock of boughtStocks) {
        TickerSource.searchStock(stock[3], "TIME_SERIES_DAILY_ADJUSTED") //stock[3] is ticker
            .then((data) => {
                if (data["Note"]) 
                    dispatch(setPopUpMessage(data["Note"]));
                else 
                    dispatch(fetchUserStock(Parser.parseStock(data), stock[4]));    //stock[4] is id
            })
            .catch((err) => {
                dispatch(fetchStockError(err.message));
            });
    }
};

export const fetchCompanyOverview = (ticker, dispatch) => {
    dispatch(fetchCompanyInfoRequest());
    TickerSource.apiCall(
        "OVERVIEW&symbol=" + ticker + "&apikey=" + API_KEY
    )
        .then((data) =>
            data["Note"]
                ? dispatch(setPopUpMessage(data["Note"]))
                : dispatch(fetchCompanyInfoSuccess(Parser.parseCompanyInfo(data)))
        )
        .catch((err) => dispatch(fetchCompanyInfoError(err)));
};
