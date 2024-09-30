import { calculatorSummary } from '../../utils/i18n';
import { useAppSelector } from '../../store/hooks';
import { selectLanguage } from '../../store/globalSlice';
import { SummaryData } from './types';

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
    const selectedLanguage = useAppSelector(selectLanguage);

    const dataValues = Object.values(data);
    const summaryValues = Object.values(calculatorSummary).map(
        (name, index) => ({
            name: name[selectedLanguage],
            value: dataValues[index],
        })
    );

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
                        {summaryValues.map(({ name, value }) => (
                            <TableRow>
                                <StyledTableCell component="th" scope="row">
                                    {name}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {value}
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
