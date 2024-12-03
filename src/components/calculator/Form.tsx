import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { selectDataInputs, updateDataInput } from '../../store/cardSlice';
import {
    type UpdateInputFunction,
    DataInputsParams,
    InstallementType,
    OverpaymentResult,
} from './types';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Input from './Input';

const Form = () => {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const dataInputs = useAppSelector(selectDataInputs);

    const updateInputValue: UpdateInputFunction = (name, value) => {
        const typedName = name as DataInputsParams;
        dispatch(updateDataInput({ name: typedName, value }));
    };

    const updateSelectValue = (name: DataInputsParams, value: string) => {
        dispatch(updateDataInput({ name, value }));
    };

    const {
        totalPrincipal,
        interestRate,
        numberOfMonths,
        installementType,
        overpaymentResult,
    } = dataInputs;

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Input
                    parameter={DataInputsParams.totalPrincipal}
                    translations={translations}
                    updateInputValue={updateInputValue}
                    value={totalPrincipal}
                    rules={{
                        integer: true,
                        min: 0,
                        max: 100000000,
                    }}
                />
                <Input
                    parameter={DataInputsParams.interestRate}
                    translations={translations}
                    updateInputValue={updateInputValue}
                    value={interestRate}
                    endAdornment="%"
                    rules={{
                        integer: false,
                        min: 0,
                        max: 100,
                    }}
                />
                <Input
                    parameter={DataInputsParams.numberOfMonths}
                    translations={translations}
                    updateInputValue={updateInputValue}
                    value={numberOfMonths}
                    rules={{
                        integer: true,
                        min: 0,
                        max: 360,
                    }}
                />
                <TextField
                    id={DataInputsParams.installementType}
                    select
                    label={translations.installementType}
                    defaultValue={InstallementType.equal}
                    required
                    size="small"
                    value={installementType}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateSelectValue(
                            DataInputsParams.installementType,
                            event.target.value
                        );
                    }}
                >
                    <MenuItem
                        key={InstallementType.equal}
                        value={InstallementType.equal}
                    >
                        {translations.equal}
                    </MenuItem>
                    <MenuItem
                        key={InstallementType.decreasing}
                        value={InstallementType.decreasing}
                    >
                        {translations.decreasing}
                    </MenuItem>
                </TextField>
                <TextField
                    id={DataInputsParams.overpaymentResult}
                    select
                    label={translations.overpaymentResult}
                    defaultValue={OverpaymentResult.lowerInterest}
                    size="small"
                    value={overpaymentResult}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateSelectValue(
                            DataInputsParams.overpaymentResult,
                            event.target.value
                        );
                    }}
                >
                    <MenuItem
                        key={OverpaymentResult.lowerInterest}
                        value={OverpaymentResult.lowerInterest}
                    >
                        {translations.lowerInterest}
                    </MenuItem>
                    <MenuItem
                        key={OverpaymentResult.shortenTime}
                        value={OverpaymentResult.shortenTime}
                    >
                        {translations.shortenTime}
                    </MenuItem>
                </TextField>
            </div>
        </Box>
    );
};
export default Form;
