import { DataInputs } from '../components/calculator/types';
import { LanguageList } from '../utils/constants';

export interface GlobalState {
    language: LanguageList;
}

export interface CardState {
    isLoading: boolean;
    dataInputs: DataInputs;
}
