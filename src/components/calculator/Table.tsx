import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import {
    type OverpaymentData,
    type DataRow,
    type UpdateInputFunction,
} from './types';
import { calculatorParameters, Parameters } from '../../utils/constants';
import { parseNumber } from './utils';

import { styled } from '@mui/material';
import { colors } from '../../utils/theme';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from './Input';

interface TableProps {
    data: DataRow[];
    overpaymentData: OverpaymentData;
    updateOverpayment: UpdateInputFunction;
}

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
    padding: 5px;
    vertical-align: baseline;
`;

function DataTable(props: TableProps) {
    const { data, overpaymentData, updateOverpayment } = props;
    const translations = useAppSelector(selectTranslations);

    const [overpayment, setOverpayment] = useState<OverpaymentData>({});

    useEffect(() => {
        if (!Object.keys(overpayment)) {
            setOverpayment(overpaymentData);
        }
    }, [overpaymentData, overpayment]);

    const updateOverpaymenDataValue = (
        _: Parameters,
        value: number | string,
        nr?: number
    ) => {
        nr && updateOverpayment(Parameters.overpayment, value, nr);
    };

    const updateOverpaymentValue = (
        _: Parameters,
        value: number | string,
        nr?: number
    ) => {
        nr && setOverpayment({ ...overpayment, [nr]: value as number });
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <StyledTableContainer>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {calculatorParameters.map((name) => (
                                <StyledTableCell align="center" key={name}>
                                    {translations[name]}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.nr}>
                                <StyledTableCell component="th" scope="row">
                                    {row.nr}
                                </StyledTableCell>
                                {/* <StyledTableCell align="right">
                                    {row.month}
                                </StyledTableCell> */}
                                <StyledTableCell align="right">
                                    {parseNumber(row.principalBalance)}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {parseNumber(row.principalInstallment)}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {parseNumber(row.interest)}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {parseNumber(row.installmentAmount)}
                                </StyledTableCell>

                                <StyledTableCell align="right">
                                    {row.interest > 0 ? (
                                        <Input
                                            parameterName={
                                                Parameters.overpayment
                                            }
                                            translations={translations}
                                            updateDataInputs={
                                                updateOverpaymenDataValue
                                            }
                                            updateInputValue={
                                                updateOverpaymentValue
                                            }
                                            value={overpayment[row.nr] || ''}
                                            rules={{
                                                integer: false,
                                                min: 0,
                                                max: data[index]
                                                    .principalBalance,
                                            }}
                                            nr={row.nr}
                                        />
                                    ) : (
                                        ''
                                    )}
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
