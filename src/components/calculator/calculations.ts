import { Parameters } from '../../utils/constants';
import {
    type DataInputs,
    type DataRow,
    type InstallementType,
    type OverpaymentResult,
} from './types';

interface DataRowInputs {
    [Parameters.nr]: number;
    [Parameters.month]: string;
    [Parameters.principalBalance]: number;
    [Parameters.interestRate]: number;
    [Parameters.installementType]: InstallementType;
    [Parameters.overpaymentResult]: OverpaymentResult;
    [Parameters.numberOfMonths]: number;
    [Parameters.totalPrincipal]: number;
}

const calculateDataRow = (inputs: DataRowInputs): DataRow => {
    const { nr, month, principalBalance, installementType } = inputs;
    if (nr === 0) {
        return {
            nr,
            month,
            principalBalance,
            principalInstallment: 0,
            interest: 0,
            installmentAmount: 0,
            overpayment: 0,
        };
    }

    const { interestRate, numberOfMonths, totalPrincipal } = inputs;

    const interestRateMonthly = interestRate / 100 / 12;

    let principalInstallment;
    const interest = principalBalance * interestRateMonthly;

    if (installementType === Parameters.decreasing) {
        principalInstallment = totalPrincipal / numberOfMonths;
    } else {
        const totalAmount =
            (totalPrincipal *
                interestRateMonthly *
                Math.pow(1 + interestRateMonthly, numberOfMonths)) /
            (Math.pow(1 + interestRateMonthly, numberOfMonths) - 1);
        principalInstallment = totalAmount - interest;
    }

    return {
        nr,
        month,
        principalBalance: principalBalance - principalInstallment,
        principalInstallment,
        interest,
        installmentAmount: principalInstallment + interest,
        overpayment: 0,
    };
};

export const calculateData = (inputs: DataInputs): DataRow[] => {
    const { totalPrincipal, numberOfMonths } = inputs;
    const firstRow = calculateDataRow({
        nr: 0,
        month: '01.2021',
        ...inputs,
        principalBalance: totalPrincipal,
    });
    let remainingDebt = totalPrincipal;
    const data = [...Array(numberOfMonths).keys()].map((index) => {
        const dataRow = calculateDataRow({
            nr: index + 1,
            month: '01.2021',
            ...inputs,
            principalBalance: remainingDebt,
        });
        remainingDebt = dataRow.principalBalance;

        return dataRow;
    });

    return [firstRow, ...data];
};
