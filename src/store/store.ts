import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import cardReducer from './cardSlice';
import { calculateApi } from './services/calculate';

const rootReducer = combineReducers({
    global: globalReducer,
    card: cardReducer,
    [calculateApi.reducerPath]: calculateApi.reducer,
});
export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(calculateApi.middleware),
    });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
