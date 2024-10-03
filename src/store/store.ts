import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import cardReducer from './cardSlice';

const rootReducer = combineReducers({
    global: globalReducer,
    card: cardReducer,
});
export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
