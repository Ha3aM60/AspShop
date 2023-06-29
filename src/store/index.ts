import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AuthRecuder } from "../env/components/Auth/AuthReducer/AuthReducer";

export const rootReducers = combineReducers({
    auth: AuthRecuder
});

export const store = configureStore({
    reducer:rootReducers,
    devTools: true,
    middleware: [thunk]
});