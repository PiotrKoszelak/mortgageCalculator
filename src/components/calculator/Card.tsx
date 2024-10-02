import { useMemo, useState } from 'react';
import { calculateSummary, defaultDataInputs } from './utils';
import { calculateData } from './calculations';
import { menuHeight, Parameters } from '../../utils/constants';
import { type DataInputs } from './types';

import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import DataTable from './Table';
import Form from './Form';
import Summary from './Summary';
import Curtain from './Curtain';

interface CardProps {
    isSingle?: boolean;
}

const StyledContainer = styled(Paper)<CardProps>`
    height: max(calc(100% - ${menuHeight + 42}px), 800px);
    max-width: ${(props) => (props.isSingle ? '100%' : '500px')};
    display: flex;
    padding: 20px;
    flex-direction: column;
`;

const Card = (props: CardProps) => {
    const { isSingle } = props;

    const [dataInputs, setDataInputs] = useState<DataInputs>({
        ...defaultDataInputs,
    });

    const updateDataInputs = (name: Parameters, value: number | string) => {
        setDataInputs({ ...dataInputs, [name]: value });
    };

    const updateOverpayment = (
        _: Parameters,
        value: number | string,
        nr?: number
    ) => {
        if (nr) {
            if (!value) {
                delete dataInputs.overpayment[nr];
                setDataInputs(dataInputs);
            } else {
                setDataInputs({
                    ...dataInputs,
                    overpayment: {
                        ...dataInputs.overpayment,
                        [nr]: value as number,
                    },
                });
            }
        }
    };

    const canCalculate = !!(
        dataInputs.totalPrincipal &&
        dataInputs.interestRate &&
        dataInputs.numberOfMonths
    );

    const data = useMemo(
        () => (canCalculate ? calculateData(dataInputs) : []),
        [canCalculate, dataInputs]
    );

    const { overpayment, totalPrincipal } = dataInputs;
    const summaryData = useMemo(
        () => calculateSummary(data, overpayment, totalPrincipal),
        [data, overpayment, totalPrincipal]
    );

    return (
        <StyledContainer variant="outlined" isSingle={isSingle}>
            <Form updateDataInputs={updateDataInputs} />
            {canCalculate ? (
                <>
                    <Summary data={summaryData} />
                    <DataTable
                        data={data}
                        overpaymentData={dataInputs.overpayment}
                        updateOverpayment={updateOverpayment}
                    />
                </>
            ) : (
                <Curtain />
            )}
        </StyledContainer>
    );
};

export default Card;
