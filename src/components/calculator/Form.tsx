import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { Parameters } from '../../utils/constants';
import {
    type Translations,
    type DataInputs,
    UpdateInputFunction,
} from './types';
import { defaultDataInputs } from './utils';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, MenuItem } from '@mui/material';

interface TextFieldComponentProps {
    parameterName: Parameters;
    translations: Translations;
    updateDataInputs: UpdateInputFunction;
    updateInputValue: UpdateInputFunction;
    value: number;
    endAdornment?: string;
}
const TextFieldComponent = (props: TextFieldComponentProps) => {
    const {
        parameterName,
        translations,
        updateDataInputs,
        updateInputValue,
        value,
        endAdornment,
    } = props;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateDataInputs(Parameters[parameterName], value);
        }
    };

    return (
        <TextField
            id={parameterName}
            label={translations[parameterName]}
            type="number"
            size="small"
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            {endAdornment}
                        </InputAdornment>
                    ),
                },
            }}
            value={value || undefined}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                updateDataInputs(
                    Parameters[parameterName],
                    Number(event.target.value)
                );
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                updateInputValue(
                    Parameters[parameterName],
                    Number(event.target.value)
                );
            }}
            onKeyDown={handleKeyDown}
        />
    );
};

interface FormProps {
    updateDataInputs: UpdateInputFunction;
}

const Form = (props: FormProps) => {
    const translations = useAppSelector(selectTranslations);
    const { updateDataInputs } = props;

    const [inputs, setInputs] = useState<DataInputs>({
        ...defaultDataInputs,
    });

    const updateInputValue = (name: Parameters, value: unknown) => {
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
                <TextFieldComponent
                    parameterName={Parameters.totalPrincipal}
                    translations={translations}
                    updateDataInputs={updateDataInputs}
                    updateInputValue={updateInputValue}
                    value={totalPrincipal}
                />
                <TextFieldComponent
                    parameterName={Parameters.interestRate}
                    translations={translations}
                    updateDataInputs={updateDataInputs}
                    updateInputValue={updateInputValue}
                    value={interestRate}
                    endAdornment="%"
                />
                <TextFieldComponent
                    parameterName={Parameters.numberOfMonths}
                    translations={translations}
                    updateDataInputs={updateDataInputs}
                    updateInputValue={updateInputValue}
                    value={numberOfMonths}
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
                    disabled
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
