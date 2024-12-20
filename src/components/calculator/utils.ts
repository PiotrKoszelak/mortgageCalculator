import {
    type OverpaymentData,
    type DataRow,
    type SummaryData,
    type parseNumberToStringParams,
    SummaryParams,
} from './types';

export const fallbackSummaryValue = {
    [SummaryParams.totalPayment]: 0,
    [SummaryParams.totalPrincipal]: 0,
    [SummaryParams.totalInterest]: 0,
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

    const totalInterest = sumValues(
        data
            .map((row) => row.interest as number)
            .filter((interest) => interest >= 0)
    );
    return {
        [SummaryParams.totalPayment]: totalInterest + totalPrincipal,
        [SummaryParams.totalPrincipal]: totalPrincipal,
        [SummaryParams.totalInterest]: totalInterest,
        [SummaryParams.totalOverpayment]: sumValues(
            Object.values(overpayment).slice(0, data.length - 1)
        ),
    };
};

export const parseNumberToString = (params: parseNumberToStringParams) => {
    const { number, format } = params;

    if (!format) {
        return String(number);
    }

    const { locale, currency } = format;
    const options: { [name: string]: string | number } = {
        maximumFractionDigits: 2,
    };
    if (currency) {
        options.style = 'currency';
        options.currency = currency;
    }
    return number.toLocaleString(locale, options);
};

export const parseStringToNumber = (value: string) => {
    if (!value) return 0;
    return Number(value.replace(/[^0-9-.]+/g, ''));
};
