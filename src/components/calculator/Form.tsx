import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { selectDataInputs, updateDataInput } from '../../store/cardSlice';
import { Parameters } from '../../utils/constants';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Input from './Input';

const Form = () => {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const dataInputs = useAppSelector(selectDataInputs);

    const updateInputValue = (
        name: Parameters | number,
        value: number | string
    ) => {
        const typedName = name as Parameters;
        dispatch(updateDataInput({ name: typedName, value }));
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
                    parameter={Parameters.totalPrincipal}
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
                    parameter={Parameters.interestRate}
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
                    parameter={Parameters.numberOfMonths}
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
                    id={Parameters.installementType}
                    select
                    label={translations.installementType}
                    defaultValue={Parameters.equal}
                    required
                    size="small"
                    value={installementType}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateInputValue(
                            Parameters.installementType,
                            event.target.value
                        );
                    }}
                >
                    <MenuItem key={Parameters.equal} value={Parameters.equal}>
                        {translations.equal}
                    </MenuItem>
                    <MenuItem
                        key={Parameters.decreasing}
                        value={Parameters.decreasing}
                    >
                        {translations.decreasing}
                    </MenuItem>
                </TextField>
                <TextField
                    id={Parameters.overpaymentResult}
                    select
                    label={translations.overpaymentResult}
                    defaultValue={Parameters.lowerInterest}
                    size="small"
                    value={overpaymentResult}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateInputValue(
                            Parameters.overpaymentResult,
                            event.target.value
                        );
                    }}
                >
                    <MenuItem
                        key={Parameters.lowerInterest}
                        value={Parameters.lowerInterest}
                    >
                        {translations.lowerInterest}
                    </MenuItem>
                    <MenuItem
                        key={Parameters.shortenTime}
                        value={Parameters.shortenTime}
                    >
                        {translations.shortenTime}
                    </MenuItem>
                </TextField>
            </div>
        </Box>
    );
};
export default Form;
