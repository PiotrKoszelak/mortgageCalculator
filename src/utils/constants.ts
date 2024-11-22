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
    signInUsersHaveAccessTo = 'signInUsersHaveAccessTo',
    multipleCalculators = 'multipleCalculators',
    easyComparison = 'easyComparison',
    savedResults = 'savedResults',
    exportTo = 'exportTo',
    aboutAuthor = 'aboutAuthor',
    authorDescription = 'authorDescription',
    multipleCalculatorsDesc = 'multipleCalculatorsDesc',
    easyComparisonDesc = 'easyComparisonDesc',
    savedResultsDesc = 'savedResultsDesc',
    exportToDesc = 'exportToDesc',
    showCalculator = 'showCalculator',
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

export enum MenuList {
    about = 'about',
    contact = 'contact',
    signIn = 'signIn',
    calculator = 'calculator',
}

export const menuHeight = 50;

export const mobileWidth = 900;

export const seoValues = {
    default: {
        title: 'Justfin app',
        description:
            'Justfin is an application that allows quickly and easily calculating all the costs of loan or mortgage',
    },
    [MenuList.contact]: {
        title: 'Justfin contact',
        description: 'Contact to the author of Justfin app',
    },
    [MenuList.calculator]: {
        title: 'Justfin calc',
        description:
            'Justfin calculator that allows calculating all the costs of loan or mortgage',
    },
};
