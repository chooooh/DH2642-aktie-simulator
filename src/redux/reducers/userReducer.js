import * as actions from "../actions/actionTypes.js";

const initialState = {
    currentLocation: "/homePage",
    darkMode: "true",
    boughtStocks: [],
    currentStateOfBoughtStocks: [],
    fetchUserStocksLock: true,
    popUpMessage: "",
    userBalance: 0,
    usersFound: [],
    viewedUser: null,
    searchingForUsersRequest: false,
};

export function UserReducer(state = initialState, action) {
    switch (action.type) {

        case actions.CHANGE_THEME: {
            return{
                ...state,
                darkMode: !state.darkMode
            }
        }

        case actions.SET_POP_UP_MESSAGE: {
            return {
                ...state,
                popUpMessage: action.payload.message
            }
        }

        case actions.BALANCE_CHANGED: {
            return {
                ...state,
                userBalance: action.payload.newBalance
            }
        }
        case actions.INITIALIZE_USER_STATE: {
            return {
              ...state,
              ...action.payload
            }
        }
        case actions.URL_CHANGED:
            return {
                ...state,
                currentLocation: action.payload.newNavLocation,
            };

        case actions.LOAD_PORTFOLIO_FROM_FIREBASE:
            return {
                ...state,
                boughtStocks: [...action.payload.stockData],
                currentStateOfBoughtStocks: [],
                viewedUser: action.payload.email
            };

        case actions.FETCH_USER_STOCK:
            return {
                ...state,
                currentStateOfBoughtStocks: (state.currentStateOfBoughtStocks.find((stock) => stock[1] === action.payload.id)) ? 
                state.currentStateOfBoughtStocks : [...state.currentStateOfBoughtStocks, [action.payload.stockData, action.payload.id]]
            }

        case actions.SET_FETCH_USER_STOCKS_LOCK:
            return {
                ...state,
                fetchUserStocksLock: action.payload.boolean
            }

        case actions.STOCK_SOLD: 
            return {
                ...state,
                currentStateOfBoughtStocks: (state.currentStateOfBoughtStocks.filter((stock) => stock[1] !== action.payload.id)),
                boughtStocks: (state.boughtStocks.filter((stock) => stock[4] !== action.payload.id)),
            }

        case actions.STOCK_BOUGHT:
            return {
                ...state,
                boughtStocks: [...state.boughtStocks, action.payload],
                currentStateOfBoughtStocks: []
            }

        case actions.CLEAR_USER_REDUCER:
            return {
                ...initialState
            }
        
        case actions.FOUND_USERS: 
            return {
                ...state,
                usersFound: action.payload.users,
                searchingForUsersRequest: false,
            }
            

        case actions.SEARCHING_FOR_USERS_REQUEST: 
            return {
                ...state,
                searchingForUsersRequest: true
            }
            
        default:
            return state;
    }
}
