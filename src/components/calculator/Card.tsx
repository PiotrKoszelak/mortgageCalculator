import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectDataInputs, selectLoadingStatus } from '../../store/cardSlice';

import { calculateSummary } from './utils';
import { calculateData } from './calculations';
import { menuHeight } from '../../utils/constants';
import { colors } from '../../utils/theme';

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
    height: max(calc(100% - ${menuHeight + 42}px), 800px);
    max-width: ${(props) => (props.isSingle ? '100%' : '500px')};
    display: flex;
    padding: 20px;
    flex-direction: column;
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
            <Backdrop
                sx={(theme) => ({
                    color: colors.white,
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={canCalculate && isLoading}
            >
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
