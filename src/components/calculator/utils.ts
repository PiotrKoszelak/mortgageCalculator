import { Parameters } from '../../utils/constants';
import { type DataInputs, type DataRow, type SummaryData } from './types';

export const fallbackSummaryValue = {
    [Parameters.totalPayment]: 0,
    [Parameters.totalInterestPayment]: 0,
    [Parameters.totalOverpayment]: 0,
};

const sumValues = (data: number[]) =>
    parseNumber(
        data.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        )
    );

export const calculateSummary = (data: DataRow[]): SummaryData => {
    if (!data.length) return fallbackSummaryValue;

    const summaryData = data.slice(1);
    return {
        [Parameters.totalPayment]: sumValues(
            summaryData.map((row) => row.installmentAmount as number)
        ),
        [Parameters.totalInterestPayment]: sumValues(
            summaryData.map((row) => row.interest as number)
        ),
        [Parameters.totalOverpayment]: sumValues(
            summaryData.map((row) => row.overpayment as number)
        ),
    };
};

export const parseNumber = (number: number) => Number(number.toFixed(2));

export const defaultDataInputs = {
    [Parameters.totalPrincipal]: 0,
    [Parameters.interestRate]: 0,
    [Parameters.numberOfMonths]: 0,
    [Parameters.installementType]: Parameters.equal,
    [Parameters.overpaymentResult]: Parameters.lowerInterest,
} as DataInputs;
