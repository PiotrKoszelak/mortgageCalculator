import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    global: globalReducer,
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
