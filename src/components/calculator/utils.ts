import { Parameters } from '../../utils/constants';
import { type DataRow, type SummaryData } from './types';

const sumValues = (data: number[]) =>
    parseNumber(
        data.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        )
    );

export const calculateSummary = (data: DataRow[]): SummaryData => ({
    [Parameters.totalPayment]: sumValues(
        data.map((row) => row.installmentAmount as number)
    ),
    [Parameters.totalInterestPayment]: sumValues(
        data.map((row) => row.interest as number)
    ),
    [Parameters.totalOverpayment]: sumValues(
        data.map((row) => row.overpayment as number)
    ),
});

export const parseNumber = (number: number) => Number(number.toFixed(2));
