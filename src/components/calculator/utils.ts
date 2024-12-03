import {
    type OverpaymentData,
    type DataRow,
    type SummaryData,
    type parseNumberToStringParams,
    SummaryParams,
} from './types';

export const fallbackSummaryValue = {
    [SummaryParams.totalPayment]: 0,
    [SummaryParams.totalInterestPayment]: 0,
    [SummaryParams.totalOverpayment]: 0,
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
        [SummaryParams.totalPayment]: totalInterestPayment + totalPrincipal,
        [SummaryParams.totalInterestPayment]: totalInterestPayment,
        [SummaryParams.totalOverpayment]: sumValues(Object.values(overpayment)),
    };
};

function numberWithSpaces(value: string) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const parseNumberToString = (params: parseNumberToStringParams) => {
    const { number, isDecimal, isSpace } = params;

    const parsedNumber = isDecimal ? number.toFixed(2) : String(number);
    if (isSpace) return numberWithSpaces(parsedNumber);

    return parsedNumber;
};

export const parseStringToNumber = (value: string) => {
    if (!value) return 0;

    return Number(value.replaceAll(' ', '').replaceAll(',', '.'));
};
