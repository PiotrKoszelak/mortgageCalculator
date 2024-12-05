export enum LanguageList {
    pl = 'pl-PL',
    en = 'en-EN',
}

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

export enum Currency {
    dollar = 'USD',
    pln = 'PLN',
    euro = 'EUR',
}

export const MonthDateFormat = 'MM-YYYY';
