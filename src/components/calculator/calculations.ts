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
    const {
        nr,
        month,
        principalBalance,
        installementType,
        interestRate,
        numberOfMonths,
        totalPrincipal,
    } = inputs;

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
        principalBalance,
        principalInstallment,
        interest,
        installmentAmount: principalInstallment + interest,
    };
};

export const calculateData = (inputs: DataInputs): DataRow[] => {
    const { totalPrincipal, numberOfMonths, overpayment } = inputs;
    let remainingDebt = totalPrincipal;
    let updatedTotalPrincipal = totalPrincipal;
    const data = [];

    for (let index = 1; index <= numberOfMonths; ++index) {
        const dataRow = calculateDataRow({
            nr: index,
            month: '01.2021',
            ...inputs,
            principalBalance: remainingDebt,
            totalPrincipal: updatedTotalPrincipal,
        });

        remainingDebt = dataRow.principalBalance - dataRow.principalInstallment;
        remainingDebt -= overpayment[index] || 0;
        if (inputs.overpaymentResult === Parameters.lowerInterest) {
            updatedTotalPrincipal -= overpayment[index] || 0;
        }

        data.push(dataRow);

        if (dataRow.principalBalance < 0) {
            break;
        }
    }

    return data;
};
