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
    [Parameters.overpayment]: number;
}

export interface DataInputs {
    [Parameters.totalPrincipal]: number;
    [Parameters.interestRate]: number;
    [Parameters.numberOfMonths]: number;
    [Parameters.installementType]: InstallementType;
    [Parameters.overpaymentResult]: OverpaymentResult;
}

export type Translations = { [key: string]: string };

export type UpdateInputFunction = (
    name: Parameters,
    value: number | string,
    nr?: number
) => void;

export interface TextFieldRules {
    integer: boolean;
    min: number;
    max: number;
}
