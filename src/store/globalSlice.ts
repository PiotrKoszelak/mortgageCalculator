import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { type GlobalState } from './types';
import { LanguageList, MenuList } from '../utils/constants';
import { translationsEn, translationsPl } from '../utils/i18n';

const initialState: GlobalState = {
    language: LanguageList.en,
    menu: MenuList.about,
    isPanelVisible: true,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<LanguageList>) => {
            state.language = action.payload;
        },
        changeMenu: (state, action: PayloadAction<MenuList>) => {
            state.menu = action.payload;
            state.isPanelVisible = true;
        },
        hidePanel: (state) => {
            state.isPanelVisible = false;
        },
    },
});

export const { changeLanguage, changeMenu, hidePanel } = globalSlice.actions;

export const selectLanguage = (state: RootState) => state.global.language;
export const selectMenu = (state: RootState) => state.global.menu;
export const selectTranslations = (state: RootState) =>
    state.global.language === LanguageList.en ? translationsEn : translationsPl;
export const selectIsPanelVisible = (state: RootState) =>
    state.global.isPanelVisible;

export default globalSlice.reducer;
