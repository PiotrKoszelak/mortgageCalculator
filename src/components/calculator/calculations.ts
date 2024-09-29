export enum InstallementType {
    decreasing = 'decreasing',
    equal = 'equal',
}

export enum OverpaymentResult {
    amount = 'amount',
    time = 'time',
}

interface DataRow {
    nr: number;
    month: string;
    debt: number;
    principalInstallment?: number;
    interest?: number;
    installmentAmount?: number;
    overpayment?: number;
}

interface DataRowInputs {
    nr: number;
    month: string;
    debt: number;
    interestRate: number;
    type: InstallementType;
    overpaymentResult: OverpaymentResult;
    totalMonthsNumber: number;
    totalDebt: number;
}

interface DataInputs {
    debt: number;
    interestRate: number;
    months: number;
    type: InstallementType;
    overpaymentResult: OverpaymentResult;
}

const inputs: DataInputs = {
    debt: 200000,
    interestRate: 0.05,
    months: 240,
    type: InstallementType.equal,
    overpaymentResult: OverpaymentResult.amount,
};

const parseNumber = (number: number) => Number(number.toFixed(2));

const calculateDataRow = (inputs: DataRowInputs): DataRow => {
    const { nr, month, debt, type } = inputs;
    if (nr === 0) {
        return { nr, month, debt };
    }

    const { interestRate, totalMonthsNumber, totalDebt } = inputs;

    const interestRateMonthly = interestRate / 12;

    let principalInstallment;
    const interest = parseNumber(debt * interestRateMonthly);

    if (type === InstallementType.decreasing) {
        principalInstallment = parseNumber(totalDebt / totalMonthsNumber);
    } else {
        const totalAmount =
            (totalDebt *
                interestRateMonthly *
                Math.pow(1 + interestRateMonthly, totalMonthsNumber)) /
            (Math.pow(1 + interestRateMonthly, totalMonthsNumber) - 1);
        principalInstallment = parseNumber(totalAmount - interest);
    }

    return {
        nr,
        month,
        debt: parseNumber(debt - principalInstallment),
        principalInstallment,
        interest,
        installmentAmount: parseNumber(principalInstallment + interest),
        overpayment: 0,
    };
};

const calculateData = (inputs: DataInputs): DataRow[] => {
    const { debt, months, ...rest } = inputs;
    const firstRow = calculateDataRow({
        nr: 0,
        month: '01.2021',
        debt,
        totalMonthsNumber: months,
        totalDebt: debt,
        ...rest,
    });
    let remainingDebt = debt;
    const data = [...Array(months).keys()].map((index) => {
        const dataRow = calculateDataRow({
            nr: index + 1,
            month: '01.2021',
            debt: remainingDebt,
            totalMonthsNumber: months,
            totalDebt: debt,
            ...rest,
        });
        remainingDebt = dataRow.debt;

        return dataRow;
    });

    return [firstRow, ...data];
};

export const exampleData = calculateData(inputs);
