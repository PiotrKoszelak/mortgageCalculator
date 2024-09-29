import { exampleData } from './calculations';

import { calculatorHeaders } from '../../utils/i18n';
import { useAppSelector } from '../../store/hooks';
import { selectLanguage } from '../../store/globalSlice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import { colors } from '../../utils/theme';

const StyledTableContainer = styled(TableContainer)`
    height: 100%;

    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${colors.lightPurple};
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${colors.darkPurple};
    }
`;

const StyledTableCell = styled(TableCell)`
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
`;

function DataTable() {
    const selectedLanguage = useAppSelector(selectLanguage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <StyledTableContainer>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {Object.values(calculatorHeaders).map((name) => (
                                <TableCell align="right">
                                    {name[selectedLanguage]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exampleData.map((row) => (
                            <TableRow key={row.nr}>
                                <StyledTableCell component="th" scope="row">
                                    {row.nr}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.month}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.debt}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.principalInstallment}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.interest}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.installmentAmount}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.overpayment}
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Paper>
    );
}

export default DataTable;
