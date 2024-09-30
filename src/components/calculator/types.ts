export interface SummaryData {
    totalPayment: number;
    totalInterest: number;
    totalOverpayment: number;
}

export enum InstallementType {
    decreasing = 'decreasing',
    equal = 'equal',
}

export enum OverpaymentResult {
    amount = 'amount',
    time = 'time',
}

export interface DataRow {
    nr: number;
    month: string;
    debt: number;
    principalInstallment?: number;
    interest?: number;
    installmentAmount?: number;
    overpayment?: number;
}
