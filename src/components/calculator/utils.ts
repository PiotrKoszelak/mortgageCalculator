import { DataRow, SummaryData } from './types';

const sumValues = (data: number[]) =>
    parseNumber(
        data.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        )
    );

export const calculateSummary = (data: DataRow[]): SummaryData => ({
    totalPayment: sumValues(data.map((row) => row.installmentAmount as number)),
    totalInterest: sumValues(data.map((row) => row.interest as number)),
    totalOverpayment: sumValues(data.map((row) => row.overpayment as number)),
});

export const parseNumber = (number: number) => Number(number.toFixed(2));
