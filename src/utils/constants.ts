export enum LanguageList {
    pl = 'plPL',
    en = 'enEN',
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
    signIn = 'signIn',
    about = 'about',
    contact = 'contact',
    appDescription = 'appDescription',
    email = 'email',
    password = 'password',
    rememberMe = 'rememberMe',
    benefitsForSignInUsers = 'benefitsForSignInUsers',
    multipleCalculators = 'multipleCalculators',
    easyComparison = 'easyComparison',
    savedResults = 'savedResults',
    exportTo = 'exportTo',
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

export enum MenuList {
    about = 'about',
    contact = 'contact',
    signIn = 'signIn',
}

export const contentThreshold = 968;
