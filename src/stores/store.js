import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // ✅ Import as named export
import authReducer from "../reducers/authReducer";
import movieReducer from "../reducers/movieReducer";

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        movie: movieReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares)
});

export default store;
