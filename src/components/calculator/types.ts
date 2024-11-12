import { Parameters } from '../../utils/constants';

export interface SummaryData {
    [Parameters.totalPayment]: number;
    [Parameters.totalInterestPayment]: number;
    [Parameters.totalOverpayment]: number;
}

export type InstallementType = Parameters.decreasing | Parameters.equal;

export type OverpaymentResult =
    | Parameters.lowerInterest
    | Parameters.shortenTime;

export interface DataRow {
    [Parameters.nr]: number;
    [Parameters.month]: string;
    [Parameters.principalBalance]: number;
    [Parameters.principalInstallment]: number;
    [Parameters.interest]: number;
    [Parameters.installmentAmount]: number;
}

export interface DataInputs {
    [Parameters.totalPrincipal]: number;
    [Parameters.interestRate]: number;
    [Parameters.numberOfMonths]: number;
    [Parameters.installementType]: InstallementType;
    [Parameters.overpaymentResult]: OverpaymentResult;
    [Parameters.overpayment]: OverpaymentData;
}

export type Translations = { [key: string]: string };

export type UpdateInputFunction = (
    name: number | Parameters,
    value: number | string
) => void;

export interface TextFieldRules {
    integer: boolean;
    min: number;
    max: number;
}

export type OverpaymentData = { [nr: number]: number };

export interface parseNumberToStringParams {
    number: number;
    isSpace: boolean;
    isDecimal: boolean;
}
