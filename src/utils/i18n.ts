import { LanguageList } from './constants';

export const appPlaceholder = {
    [LanguageList.en]: 'Application is under development',
    [LanguageList.pl]: 'Aplikacja w budowie',
};

export const calculatorHeaders = {
    nr: {
        [LanguageList.en]: 'No',
        [LanguageList.pl]: 'Nr',
    },
    month: {
        [LanguageList.en]: 'Month',
        [LanguageList.pl]: 'Miesiąc',
    },
    debt: {
        [LanguageList.en]: 'Principal balance',
        [LanguageList.pl]: 'Pozostała kwota kredytu',
    },
    principalInstallment: {
        [LanguageList.en]: 'Principal installment',
        [LanguageList.pl]: 'Kapitał',
    },
    interest: {
        [LanguageList.en]: 'Interest',
        [LanguageList.pl]: 'Odsetki',
    },
    installmentAmount: {
        [LanguageList.en]: 'Installment total',
        [LanguageList.pl]: 'Wysokość raty',
    },
    overpayment: {
        [LanguageList.en]: 'Overpayment',
        [LanguageList.pl]: 'Nadpłata',
    },
};
