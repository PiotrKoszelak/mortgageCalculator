import { Parameters } from '../../utils/constants';
import { type DataInputs, type DataRow, type SummaryData } from './types';

export const fallbackSummaryValue = {
    [Parameters.totalPayment]: 0,
    [Parameters.totalInterestPayment]: 0,
    [Parameters.totalOverpayment]: 0,
};

const sumValues = (data: number[]) =>
    data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

export const calculateSummary = (
    data: DataRow[],
    overpayment: OverpaymentData,
    totalPrincipal: number
): SummaryData => {
    if (!data.length) return fallbackSummaryValue;

    const totalInterestPayment = sumValues(
        data
            .map((row) => row.interest as number)
            .filter((interest) => interest >= 0)
    );
    return {
        [Parameters.totalPayment]: totalInterestPayment + totalPrincipal,
        [Parameters.totalInterestPayment]: totalInterestPayment,
        [Parameters.totalOverpayment]: sumValues(Object.values(overpayment)),
    };
};

function numberWithSpaces(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const parseNumber = (number: number) =>
    number && numberWithSpaces(Number(number.toFixed(2)));

export const defaultDataInputs = {
    [Parameters.totalPrincipal]: 0,
    [Parameters.interestRate]: 0,
    [Parameters.numberOfMonths]: 0,
    [Parameters.installementType]: Parameters.equal,
    [Parameters.overpaymentResult]: Parameters.lowerInterest,
} as DataInputs;
