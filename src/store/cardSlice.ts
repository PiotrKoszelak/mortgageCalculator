import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { type CardState } from './types';
import {
    DataInputsParams,
    InstallementType,
    OverpaymentResult,
    DataOptions,
    CalculatorParams,
} from '../components/calculator/types';

import { Currency } from '../utils/constants';

const initialState: CardState = {
    dataInputs: {
        [DataInputsParams.totalPrincipal]: 0,
        [DataInputsParams.interestRate]: 0,
        [DataInputsParams.numberOfMonths]: 0,
        [DataInputsParams.installementType]: InstallementType.equal,
        [DataInputsParams.overpaymentResult]: OverpaymentResult.lowerInterest,
        [DataInputsParams.overpayment]: {},
    },
    dataOptions: {
        columnsVisibility: {
            [CalculatorParams.nr]: true,
            [CalculatorParams.principalBalance]: true,
            [CalculatorParams.principalInstallment]: true,
            [CalculatorParams.interest]: true,
            [CalculatorParams.installmentAmount]: true,
            [CalculatorParams.overpayment]: true,
        },
        currency: {
            enabled: false,
            value: Currency.pln,
        },
    },
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        updateDataInput: (
            state: CardState,
            action: PayloadAction<{
                name: DataInputsParams;
                value: number | string;
            }>
        ) => {
            const { name, value } = action.payload;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.dataInputs[name] = value || 0;
        },
        updateOverpaymentInput: (
            state: CardState,
            action: PayloadAction<{
                nr: number;
                value: number;
            }>
        ) => {
            const { nr, value } = action.payload;
            if (!value) delete state.dataInputs.overpayment[nr];
            else {
                state.dataInputs.overpayment[nr] = value;
            }
        },
        toggleColumnVisibility: (
            state: CardState,
            action: PayloadAction<{
                name: keyof DataOptions['columnsVisibility'];
            }>
        ) => {
            const { name } = action.payload;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.dataOptions.columnsVisibility[name] =
                !state.dataOptions.columnsVisibility[name];
        },
        toggleCurrency: (state: CardState) => {
            state.dataOptions.currency.enabled =
                !state.dataOptions.currency.enabled;
        },
        changeCurrency: (
            state: CardState,
            action: PayloadAction<{ value: Currency }>
        ) => {
            const { value } = action.payload;
            state.dataOptions.currency.value = value;
        },
    },
});

export const {
    updateDataInput,
    updateOverpaymentInput,
    toggleColumnVisibility,
    toggleCurrency,
    changeCurrency,
} = cardSlice.actions;

export const selectDataInputs = (state: RootState) => state.card.dataInputs;
export const selectOverpayment = (state: RootState) =>
    state.card.dataInputs.overpayment;
export const selectDataOptions = (state: RootState) => state.card.dataOptions;
export const selectCurrency = (state: RootState) =>
    selectDataOptions(state).currency.enabled
        ? selectDataOptions(state).currency.value
        : null;

export default cardSlice.reducer;
