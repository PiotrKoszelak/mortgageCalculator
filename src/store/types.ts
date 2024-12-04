import { DataInputs, DataOptions } from '../components/calculator/types';
import { LanguageList, MenuList } from '../utils/constants';

export interface GlobalState {
    language: LanguageList;
    menu: MenuList;
    isPanelVisible: boolean;
}

export interface CardState {
    dataInputs: DataInputs;
    dataOptions: DataOptions;
}
