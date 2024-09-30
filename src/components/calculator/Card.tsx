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

    const [inputs, setInputs] = useState<DataInputs>({
        [Parameters.totalPrincipal]: 0,
        [Parameters.interestRate]: 0,
        [Parameters.numberOfMonths]: 0,
        [Parameters.installementType]: Parameters.equal,
        [Parameters.overpaymentResult]: Parameters.lowerInterest,
    });

    const updateInputValue = (name: Parameters, value: unknown) => {
        setInputs({ ...inputs, [name]: value });
    };

    const canCalculate = !!(
        inputs.totalPrincipal &&
        inputs.interestRate &&
        inputs.numberOfMonths
    );

    const data = calculateData(inputs);
    const summaryData = calculateSummary(data.slice(1));

    return (
        <StyledContainer variant="outlined" isSingle={isSingle}>
            <Form updateInputValue={updateInputValue} inputs={inputs} />
            {canCalculate && (
                <>
                    <Summary data={summaryData} />
                    <DataTable data={data} />
                </>
            )}
        </StyledContainer>
    );
};

export default Card;
