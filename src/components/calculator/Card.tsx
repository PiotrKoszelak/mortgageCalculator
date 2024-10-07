import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectDataInputs, selectLoadingStatus } from '../../store/cardSlice';

import { calculateSummary } from './utils';
import { calculateData } from './calculations';

import { Backdrop, CircularProgress, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import DataTable from './Table';
import Form from './Form';
import Summary from './Summary';
import Curtain from './Curtain';

interface CardProps {
    isSingle?: boolean;
}

const StyledContainer = styled(Paper)<CardProps>`
    height: max(100%, 800px);
    max-width: ${(props) => (props.isSingle ? '100%' : '500px')};
    display: flex;
    padding: 24px;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
`;

const Card = (props: CardProps) => {
    const { isSingle } = props;

    const dataInputs = useAppSelector(selectDataInputs);
    const isLoading = useAppSelector(selectLoadingStatus);

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
            <Backdrop open={canCalculate && isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Form />
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
