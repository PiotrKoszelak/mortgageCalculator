import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import {
    selectDataOptions,
    selectOverpayment,
    updateOverpaymentInput,
} from '../../store/cardSlice';

import {
    CalculatorParams,
    type DataRow,
    type UpdateInputFunction,
} from './types';
import { parseNumberToString } from './utils';
import { useCurrencyFormat } from '../../hooks/common';
import { MonthDateFormat } from '../../utils/constants';

import { styled } from '@mui/material';
import { appColors } from '../../utils/theme';
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
}

const StyledContainer = styled(Paper)`
    overflow: hidden;
    width: 100%;
`;

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
        background: ${appColors.lightPurple};
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${appColors.darkPurple};
    }
`;

const StyledTableCell = styled(TableCell)`
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
    padding: 5px;
    vertical-align: baseline;
`;

function DataTable(props: TableProps) {
    const { data } = props;
    const dispatch = useAppDispatch();
    const currencyFormat = useCurrencyFormat();
    const translations = useAppSelector(selectTranslations);
    const overpayment = useAppSelector(selectOverpayment);
    const dataOptions = useAppSelector(selectDataOptions);
    const { columnsVisibility, startingMonth } = dataOptions;

    const updateInputValue: UpdateInputFunction = (name, value) => {
        const typedName = name as number;
        dispatch(updateOverpaymentInput({ nr: typedName, value }));
    };

    return (
        <StyledContainer>
            <StyledTableContainer>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(CalculatorParams).map((name) => {
                                const typedName = name as CalculatorParams;
                                return (
                                    columnsVisibility[typedName] && (
                                        <StyledTableCell
                                            align="center"
                                            key={name}
                                        >
                                            {translations[typedName]}
                                        </StyledTableCell>
                                    )
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.nr}>
                                {columnsVisibility.nr && (
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {row.nr}
                                    </StyledTableCell>
                                )}
                                {columnsVisibility.month && (
                                    <StyledTableCell align="center">
                                        {moment(startingMonth, MonthDateFormat)
                                            .add(index, 'months')
                                            .format(MonthDateFormat)}
                                    </StyledTableCell>
                                )}
                                {columnsVisibility.principalBalance && (
                                    <StyledTableCell align="center">
                                        {parseNumberToString({
                                            number: row.principalBalance,
                                            format: currencyFormat,
                                        })}
                                    </StyledTableCell>
                                )}
                                {columnsVisibility.principalInstallment && (
                                    <StyledTableCell align="center">
                                        {parseNumberToString({
                                            number: row.principalInstallment,
                                            format: currencyFormat,
                                        })}
                                    </StyledTableCell>
                                )}
                                {columnsVisibility.interest && (
                                    <StyledTableCell align="center">
                                        {parseNumberToString({
                                            number: row.interest,
                                            format: currencyFormat,
                                        })}
                                    </StyledTableCell>
                                )}
                                {columnsVisibility.installmentAmount && (
                                    <StyledTableCell align="center">
                                        {parseNumberToString({
                                            number: row.installmentAmount,
                                            format: currencyFormat,
                                        })}
                                    </StyledTableCell>
                                )}
                                {columnsVisibility.overpayment && (
                                    <StyledTableCell align="center">
                                        {row.interest > 0 ? (
                                            <Input
                                                parameter={row.nr}
                                                translations={translations}
                                                updateInputValue={
                                                    updateInputValue
                                                }
                                                value={overpayment[row.nr] || 0}
                                                rules={{
                                                    integer: false,
                                                    min: 0,
                                                    max: data[index]
                                                        .principalBalance,
                                                }}
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </StyledTableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </StyledContainer>
    );
}

export default DataTable;
