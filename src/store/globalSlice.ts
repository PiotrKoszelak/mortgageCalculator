import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { GlobalState } from './types';
import { LanguageList } from '../utils/constants';

const initialState: GlobalState = {
    language: LanguageList.en,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<LanguageList>) => {
            state.language = action.payload;
        },
    },
});

export const { changeLanguage } = globalSlice.actions;

export const selectLanguage = (state: RootState) => state.global.language;

export default globalSlice.reducer;
