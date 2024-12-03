import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { SummaryParams, type SummaryData } from './types';
import { parseNumberToString } from './utils';

import { Box, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface SumamryProps {
    data: SummaryData;
}

const StyledTableContainer = styled(TableContainer)`
    height: 200px;
`;

const StyledTableCell = styled(TableCell)`
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
    padding: 15px;
    vertical-align: baseline;
`;

function Summary(props: SumamryProps) {
    const { data } = props;
    const translations = useAppSelector(selectTranslations);

    const summaryValues = Object.keys(SummaryParams).map((param) => ({
        name: translations[param as keyof SummaryData],
        value: data[param as keyof SummaryData],
        key: param,
    }));

    return (
        <Box>
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
                                        isSpace: true,
                                        isDecimal: true,
                                    })}
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
}

export default Summary;
