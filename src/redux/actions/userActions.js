import {
    URL_CHANGED,
    LOAD_PORTFOLIO_FROM_FIREBASE,
    INITIALIZE_USER_STATE,
    FETCH_USER_STOCK,
    SET_FETCH_USER_STOCKS_LOCK,
    BALANCE_CHANGED,
    SET_POP_UP_MESSAGE,
    STOCK_SOLD,
    STOCK_BOUGHT,
    CHANGE_THEME,
    CLEAR_USER_REDUCER,
    FOUND_USERS,
    SEARCHING_FOR_USERS_REQUEST,
} from "./actionTypes.js";

export const foundUsers = (users) => ({
    type: FOUND_USERS,
    payload: {
        users,
    }
})

export const clearUserReducer = () => ({
    type: CLEAR_USER_REDUCER
})

export const changeTheme = () => ({
    type: CHANGE_THEME,
})

export const stockSold = (id) => ({
    type: STOCK_SOLD,
    payload:{
        id
    }
}) 

export const stockBought = (stock, date, price, quantity, id) => ({
    type: STOCK_BOUGHT,
    payload: [date, price, quantity, stock, id]
    
});
        
export const setPopUpMessage = (message) => ({
    type: SET_POP_UP_MESSAGE,
    payload: {
        message
    }
});

export const changedBalance = (newBalance) => ({
    type: BALANCE_CHANGED,
    payload: {
        newBalance
    }
});

export const initUserState = (storedUserReducer) => ({
    type: INITIALIZE_USER_STATE,
    payload: {
        ...storedUserReducer,
    },
});

export const setFetchUserStocksLock = (boolean) => ({
    type: SET_FETCH_USER_STOCKS_LOCK,
    payload:{
        boolean,
    }
})

export const fetchUserStock = (stockData, id) => ({
    type: FETCH_USER_STOCK,
    payload: {
        stockData,
        id
    },
});

export const loadAndStorePortfolio = (stockData, email) => ({
    type: LOAD_PORTFOLIO_FROM_FIREBASE,
    payload: {
        stockData,
        email,
    },
});

export const changeLocation = (newNavLocation) => ({
    type: URL_CHANGED,
    payload: {
        newNavLocation,
    },
});

export const searchingForUsersRequest = () => ({
    type: SEARCHING_FOR_USERS_REQUEST
})
