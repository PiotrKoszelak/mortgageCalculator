import { useMemo, useState } from 'react';
import { calculateSummary, defaultDataInputs } from './utils';
import { calculateData } from './calculations';
import { Parameters } from '../../utils/constants';
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
    height: 80%;
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

    const updateDataInputs = (name: Parameters, value: unknown) => {
        setDataInputs({ ...dataInputs, [name]: value });
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
    const summaryData = useMemo(() => calculateSummary(data), [data]);

    return (
        <StyledContainer variant="outlined" isSingle={isSingle}>
            <Form updateDataInputs={updateDataInputs} />
            {canCalculate ? (
                <>
                    <Summary data={summaryData} />
                    <DataTable data={data} />
                </>
            ) : (
                <Curtain />
            )}
        </StyledContainer>
    );
};

export default Card;
