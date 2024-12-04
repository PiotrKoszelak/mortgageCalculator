export enum SummaryParams {
    totalPayment = 'totalPayment',
    totalInterestPayment = 'totalInterestPayment',
    totalOverpayment = 'totalOverpayment',
}

export interface SummaryData {
    [SummaryParams.totalPayment]: number;
    [SummaryParams.totalInterestPayment]: number;
    [SummaryParams.totalOverpayment]: number;
}

export enum InstallementType {
    decreasing = 'decreasing',
    equal = 'equal',
}

export enum OverpaymentResult {
    lowerInterest = 'lowerInterest',
    shortenTime = 'shortenTime',
}

export enum DataInputsParams {
    totalPrincipal = 'totalPrincipal',
    interestRate = 'interestRate',
    numberOfMonths = 'numberOfMonths',
    installementType = 'installementType',
    overpaymentResult = 'overpaymentResult',
    overpayment = 'overpayment',
}

export type OverpaymentData = { [nr: number]: number };

export interface DataInputs {
    [DataInputsParams.totalPrincipal]: number;
    [DataInputsParams.interestRate]: number;
    [DataInputsParams.numberOfMonths]: number;
    [DataInputsParams.installementType]: InstallementType;
    [DataInputsParams.overpaymentResult]: OverpaymentResult;
    [DataInputsParams.overpayment]: OverpaymentData;
}

export enum CalculatorParams {
    nr = 'nr',
    // month = 'month',
    principalBalance = 'principalBalance',
    principalInstallment = 'principalInstallment',
    interest = 'interest',
    installmentAmount = 'installmentAmount',
    overpayment = 'overpayment',
}

export interface DataRow {
    [CalculatorParams.nr]: number;
    // [CalculatorParams.month]: string;
    [CalculatorParams.principalBalance]: number;
    [CalculatorParams.principalInstallment]: number;
    [CalculatorParams.interest]: number;
    [CalculatorParams.installmentAmount]: number;
}

export type Translations = { [key: string]: string };

export type UpdateInputFunction = (
    name: number | DataInputsParams,
    value: number
) => void;

export interface TextFieldRules {
    integer: boolean;
    min: number;
    max: number;
}

export interface parseNumberToStringParams {
    number: number;
    isSpace: boolean;
    isDecimal: boolean;
}

export interface DataOptions {
    columnsVisibility: {
        [CalculatorParams.nr]: boolean;
        [CalculatorParams.principalBalance]: boolean;
        [CalculatorParams.principalInstallment]: boolean;
        [CalculatorParams.interest]: boolean;
        [CalculatorParams.installmentAmount]: boolean;
        [CalculatorParams.overpayment]: boolean;
    };
}
