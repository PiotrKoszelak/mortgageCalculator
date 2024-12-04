import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectDataInputs } from '../../store/cardSlice';
import { useCalculateQuery } from '../../store/services/calculate';

import { calculateSummary } from './utils';

import { Backdrop, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import DataTable from './Table';
import Form from './Form';
import Summary from './Summary';
import Curtain from './Curtain';
import Loader from '../common/Loader';
import AdvancedOptions from './AdvancedOptions';

interface CalculatorProps {
    isSingle?: boolean;
}

const StyledContainer = styled(Paper)<CalculatorProps>`
    height: min(inherit, 1000px);
    max-width: ${(props) => (props.isSingle ? '100%' : '500px')};
    display: flex;
    padding: 24px;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
    position: relative;
`;

const StyledBackdrop = styled(Backdrop)<CalculatorProps>`
    height: min(100%, 1000px);
    max-width: ${(props) => (props.isSingle ? '100%' : '500px')};
    width: 100%;
    position: absolute;
    z-index: 10;
`;

const Calculator = (props: CalculatorProps) => {
    const { isSingle } = props;

    const dataInputs = useAppSelector(selectDataInputs);

    const canCalculate = !!(
        dataInputs.totalPrincipal &&
        dataInputs.interestRate &&
        dataInputs.numberOfMonths
    );

    const { data: fetchedData, isFetching } = useCalculateQuery(dataInputs, {
        skip: !canCalculate,
    });

    const data = useMemo(() => fetchedData?.data || [], [fetchedData]);

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
                <Loader size="50px" />
            </StyledBackdrop>
            <Form />
            <AdvancedOptions />
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
