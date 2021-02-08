import { combineReducers } from "redux";
import { UserReducer } from "./userReducer.js";
import { StockReducer } from "./stockReducer.js";
import { AuthReducer } from "./authReducer.js";

export const rootReducer = combineReducers({
    UserReducer,
    AuthReducer,
    StockReducer,
});
