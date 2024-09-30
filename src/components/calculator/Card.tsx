import { useState } from 'react';
import { calculateSummary } from './utils';
import { calculateData } from './calculations';
import { Parameters } from '../../utils/constants';
import { type DataInputs } from './types';

import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import DataTable from './Table';
import Form from './Form';
import Summary from './Summary';

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

    const [inputs] = useState<DataInputs>({
        [Parameters.principalBalance]: 200000,
        [Parameters.interestRate]: 5 / 100,
        [Parameters.numberOfMonths]: 240,
        [Parameters.installementType]: Parameters.equal,
        [Parameters.overpaymentResult]: Parameters.lowerInterest,
    });

    const data = calculateData(inputs);
    const summaryData = calculateSummary(data.slice(1));

    return (
        <StyledContainer variant="outlined" isSingle={isSingle}>
            <Form />
            <Summary data={summaryData} />
            <DataTable data={data} />
        </StyledContainer>
    );
};

export default Card;
