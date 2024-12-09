import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { SummaryParams, type SummaryValues, type SummaryData } from './types';
import { parseNumberToString } from './utils';
import { useCurrencyFormat } from '../../hooks/common';

import { Box, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CustomPieChart from './Chart';

interface SumamryProps {
    data: SummaryData;
}

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const StyledTableContainer = styled(TableContainer)`
    height: 260px;
`;

const StyledTableCell = styled(TableCell)`
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
    padding: 15px;
    vertical-align: baseline;
`;

function Summary(props: SumamryProps) {
    const { data } = props;
    const translations = useAppSelector(selectTranslations);
    const currencyFormat = useCurrencyFormat();

    const summaryValues: SummaryValues = Object.keys(SummaryParams).map(
        (param) => ({
            name: translations[param as keyof SummaryData],
            value: data[param as keyof SummaryData],
            key: param,
        })
    );

    return (
        <StyledContainer>
            <StyledTableContainer>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {summaryValues.map(({ name, value, key }) => (
                            <TableRow key={key}>
                                <StyledTableCell component="th" scope="row">
                                    {name}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {parseNumberToString({
                                        number: value,
                                        format: currencyFormat,
                                    })}
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <CustomPieChart summaryValues={summaryValues} />
        </StyledContainer>
    );
}

export default Summary;
