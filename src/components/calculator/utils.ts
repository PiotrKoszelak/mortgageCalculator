import { Parameters } from '../../utils/constants';
import { type OverpaymentData, type DataRow, type SummaryData } from './types';

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

export const parseNumber = (number: number, noSpace?: boolean) => {
    if (number) {
        if (noSpace) return Number(number.toFixed(2));

        return numberWithSpaces(Number(number.toFixed(2)));
    }

    return 0;
};
