import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { Parameters } from '../../utils/constants';
import { type DataInputs, type UpdateInputFunction } from './types';
import { defaultDataInputs } from './utils';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Input from './Input';

interface FormProps {
    updateDataInputs: UpdateInputFunction;
}

const Form = (props: FormProps) => {
    const translations = useAppSelector(selectTranslations);
    const { updateDataInputs } = props;

    const [inputs, setInputs] = useState<DataInputs>({
        ...defaultDataInputs,
    });

    const updateInputValue = (name: Parameters, value: number | string) => {
        setInputs({ ...inputs, [name]: value });
    };

    const {
        totalPrincipal,
        interestRate,
        numberOfMonths,
        installementType,
        overpaymentResult,
    } = inputs;

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Input
                    parameterName={Parameters.totalPrincipal}
                    translations={translations}
                    updateDataInputs={updateDataInputs}
                    updateInputValue={updateInputValue}
                    value={totalPrincipal}
                    rules={{
                        integer: true,
                        min: 0,
                        max: 100000000,
                    }}
                />
                <Input
                    parameterName={Parameters.interestRate}
                    translations={translations}
                    updateDataInputs={updateDataInputs}
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
                    parameterName={Parameters.numberOfMonths}
                    translations={translations}
                    updateDataInputs={updateDataInputs}
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
                        updateDataInputs(
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
                        updateDataInputs(
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
