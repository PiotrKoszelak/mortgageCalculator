import { calculatorSummary } from '../../utils/i18n';
import { useAppSelector } from '../../store/hooks';
import { selectLanguage } from '../../store/globalSlice';

import { Box, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableContainer = styled(TableContainer)`
    height: 200px;
`;

const StyledTableCell = styled(TableCell)`
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
    padding: 15px;
    vertical-align: baseline;
`;

function Summary() {
    const selectedLanguage = useAppSelector(selectLanguage);

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
                        {Object.values(calculatorSummary).map((name) => (
                            <TableRow>
                                <StyledTableCell component="th" scope="row">
                                    {name[selectedLanguage]}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    100 000
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
