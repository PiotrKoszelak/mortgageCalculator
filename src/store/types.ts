import { DataInputs } from '../components/calculator/types';
import { LanguageList, MenuList } from '../utils/constants';

export interface GlobalState {
    language: LanguageList;
    menu: MenuList;
}

export interface CardState {
    isLoading: boolean;
    dataInputs: DataInputs;
}
