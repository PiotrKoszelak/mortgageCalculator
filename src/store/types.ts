import { LanguageList } from '../utils/constants';

export interface GlobalState {
    language: LanguageList;
}

export interface State {
    global: GlobalState;
}
