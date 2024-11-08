import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectDataInputs } from '../../store/cardSlice';
import { useCalculateQuery } from '../../store/services/calculate';

import { calculateSummary } from './utils';

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
    position: relative;
`;

const StyledBackdrop = styled(Backdrop)<CardProps>`
    height: max(100%, 800px);
    max-width: ${(props) => (props.isSingle ? '100%' : '500px')};
    width: 100%;
    position: absolute;
`;

const Calculator = (props: CardProps) => {
    const { isSingle } = props;

    const dataInputs = useAppSelector(selectDataInputs);

    const { data: fetchedData, isFetching } = useCalculateQuery(dataInputs);

    const data = useMemo(() => fetchedData?.data || [], [fetchedData]);

    const canCalculate = !!(
        dataInputs.totalPrincipal &&
        dataInputs.interestRate &&
        dataInputs.numberOfMonths
    );

    const { overpayment, totalPrincipal } = dataInputs;
    const summaryData = useMemo(
        () => calculateSummary(data, overpayment, totalPrincipal),
        [data, overpayment, totalPrincipal]
    );

    return (
        <StyledContainer variant="outlined" isSingle={isSingle}>
            <StyledBackdrop
                open={canCalculate && isFetching}
                isSingle={isSingle}
            >
                <CircularProgress color="inherit" size="large" />
            </StyledBackdrop>
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

export default Calculator;
