export enum LanguageList {
    pl = 'pl',
    en = 'en',
}

export enum Parameters {
    totalPrincipal = 'totalPrincipal',
    interestRate = 'interestRate',
    interest = 'interest',
    numberOfMonths = 'numberOfMonths',
    installementType = 'installementType',
    decreasing = 'decreasing',
    equal = 'equal',
    overpaymentResult = 'overpaymentResult',
    lowerInterest = 'lowerInterest',
    shortenTime = 'shortenTime',
    totalPayment = 'totalPayment',
    totalInterestPayment = 'totalInterestPayment',
    totalOverpayment = 'totalOverpayment',
    nr = 'nr',
    month = 'month',
    principalBalance = 'principalBalance',
    principalInstallment = 'principalInstallment',
    installmentAmount = 'installmentAmount',
    overpayment = 'overpayment',
    availableSoon = 'availableSoon',
    provideData = 'provideData',
    minLimit = 'minLimit',
    maxLimit = 'maxLimit',
    mustBeInteger = 'mustBeInteger',
}

export const SummaryParameters = [
    Parameters.totalPayment,
    Parameters.totalInterestPayment,
    Parameters.totalOverpayment,
];

export const calculatorParameters = [
    Parameters.nr,
    // Parameters.month,
    Parameters.principalBalance,
    Parameters.principalInstallment,
    Parameters.interest,
    Parameters.installmentAmount,
    Parameters.overpayment,
];

export const menuHeight = 50;
