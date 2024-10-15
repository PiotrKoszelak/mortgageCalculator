import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { Parameters } from '../utils/constants';
import { type CardState } from './types';

const initialState: CardState = {
    dataInputs: {
        [Parameters.totalPrincipal]: 0,
        [Parameters.interestRate]: 0,
        [Parameters.numberOfMonths]: 0,
        [Parameters.installementType]: Parameters.equal,
        [Parameters.overpaymentResult]: Parameters.lowerInterest,
        [Parameters.overpayment]: {},
    },
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        updateDataInput: (
            state: CardState,
            action: PayloadAction<{
                name: Parameters;
                value: number | '';
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
                value: number | '';
            }>
        ) => {
            const { nr, value } = action.payload;
            if (!value) delete state.dataInputs.overpayment[nr];
            else {
                state.dataInputs.overpayment[nr] = value as number;
            }
        },
    },
});

export const { updateDataInput, updateOverpaymentInput, stopLoading } =
    cardSlice.actions;

export const selectDataInputs = (state: RootState) => state.card.dataInputs;
export const selectOverpayment = (state: RootState) =>
    state.card.dataInputs.overpayment;

export default cardSlice.reducer;
