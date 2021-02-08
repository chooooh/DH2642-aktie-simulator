import {
    FETCH_STOCK_REQUEST,
    FETCH_STOCK_SUCCESS,
    FETCH_STOCK_ERROR,
    SEARCH_STOCK_REQUEST,
    SEARCH_STOCK_SUCCESS,
    SEARCH_STOCK_ERROR,
    TICKER_CHOSEN,
    INTERVAL_CHANGE,
    FETCH_COMPANY_INFO_REQUEST,
    FETCH_COMPANY_INFO_SUCCESS,
    FETCH_COMPANY_INFO_ERROR,
    INITIALIZE_STOCK_STATE,
} from "../actions/actionTypes";

const initialState = {
    bestMatches: [],
    stockData: {},
    companyInfo: {},
    tickerChosen: "",
    fetchStockRequest: false,
    fetchStockSuccess: false,
    fetchStockError: null,
    fetchCompanyInfoRequest: false,
    fetchCompanyInfoSuccess: false,
    fetchCompanyInfoError: null,
    searchStockRequest: false,
    searchStockSuccess: false,
    searchStockError: null,
    interval: "TIME_SERIES_DAILY_ADJUSTED",   
}

export function StockReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_STOCK_STATE: {
            return {
                ...state,
                ...action.payload,
            };
        }

        case FETCH_COMPANY_INFO_REQUEST:
            return {
                ...state,
                fetchCompanyInfoRequest: true,
                fetchCompanyInfoSuccess: false,
                fetchCompanyInfoError: null,
                companyInfo: {},
            };

        case FETCH_COMPANY_INFO_SUCCESS:
            return {
                ...state,
                fetchCompanyInfoRequest: false,
                fetchCompanyInfoSuccess: true,
                fetchCompanyInfoError: null,
                companyInfo: action.payload.companyInfo,
            };

        case FETCH_COMPANY_INFO_ERROR:
            return {
                ...state,
                fetchCompanyInfoRequest: false,
                fetchCompanyInfoSuccess: false,
                fetchCompanyInfoError: action.payload.errorMessage,
                companyInfo: null,
            };

        case INTERVAL_CHANGE:
            return {
                ...state,
                interval: action.payload.interval,
            };

        case FETCH_STOCK_REQUEST:
            return {
                ...state,
                fetchStockRequest: true,
                fetchStockSuccess: false,
                fetchStockError: false,
                stockData: {}
            };

        case FETCH_STOCK_SUCCESS:
            return {
                ...state,
                stockData: action.payload.stockData,
                fetchStockRequest: false,
                fetchStockSuccess: true,
                fetchStockError: false,
            };

        case FETCH_STOCK_ERROR:
            return {
                ...state,
                fetchStockRequest: false,
                fetchStockSuccess: false,
                fetchStockError: action.payload.errorMessage,
            };

        case SEARCH_STOCK_REQUEST:
            return {
                ...state,
                searchStockRequest: true,
                searchStockSuccess: false,
                searchStockError: false,
            };

        case SEARCH_STOCK_SUCCESS:
            return {
                ...state,
                bestMatches: action.payload.bestMatches,
                searchStockRequest: false,
                searchStockSuccess: true,
                searchStockError: false,
            };

        case SEARCH_STOCK_ERROR:
            return {
                ...state,
                searchStockRequest: false,
                searchStockSuccess: false,
                searchStockError: action.payload.errorMessage,
            };

        case TICKER_CHOSEN:
            return {
                ...state,
                tickerChosen: action.payload.tickerChosen,
            };

        default:
            return state;
    }
}
