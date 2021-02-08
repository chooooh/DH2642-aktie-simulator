import {
    INITIALIZE_STOCK_STATE,
    FETCH_STOCK_REQUEST,
    FETCH_STOCK_SUCCESS,
    FETCH_STOCK_ERROR,
    SEARCH_STOCK_REQUEST,
    SEARCH_STOCK_SUCCESS,
    SEARCH_STOCK_ERROR,
    FETCH_COMPANY_INFO_REQUEST,
    FETCH_COMPANY_INFO_SUCCESS,
    FETCH_COMPANY_INFO_ERROR,
    TICKER_CHOSEN,
    INTERVAL_CHANGE,
} from "./actionTypes.js";


export const initStockState = (storedStockReducer) => ({
    type: INITIALIZE_STOCK_STATE,
    payload: {
        ...storedStockReducer
    }
})

export const intervalChange = (interval) => ({
    type: INTERVAL_CHANGE,
    payload: {
        interval,
    },
});

export const stockTicker = (tickerChosen) => ({
    type: TICKER_CHOSEN,
    payload: {
        tickerChosen,
    },
});

export const searchStockRequest = () => ({
    type: SEARCH_STOCK_REQUEST,
});

export const searchStockSuccess = (bestMatches) => ({
    type: SEARCH_STOCK_SUCCESS,
    payload: {
        bestMatches,
    },
});

export const searchStockError = (errorMessage) => ({
    type: SEARCH_STOCK_ERROR,
    payload: {
        errorMessage,
    },
});

export const fetchStockRequest = () => ({
    type: FETCH_STOCK_REQUEST,
});

export const fetchStockSuccess = (stockData) => ({
    type: FETCH_STOCK_SUCCESS,
    payload: {
        stockData,
    },
});

export const fetchStockError = (errorMessage) => ({
    type: FETCH_STOCK_ERROR,
    payload: {
        errorMessage,
    },
});

export const fetchCompanyInfoRequest = () => ({
    type: FETCH_COMPANY_INFO_REQUEST,
});

export const fetchCompanyInfoSuccess = (companyInfo) => ({
    type: FETCH_COMPANY_INFO_SUCCESS,
    payload: {
        companyInfo,
    },
});

export const fetchCompanyInfoError = (errorMessage) => ({
    type: FETCH_COMPANY_INFO_ERROR,
    payload: {
        errorMessage,
    },
});
