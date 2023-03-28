import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './home';

export const store = configureStore({
    reducer: {
        home: homeSlice,
    },
});