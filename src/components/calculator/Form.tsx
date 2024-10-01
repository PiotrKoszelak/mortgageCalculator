import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { Parameters } from '../../utils/constants';
import {
    type Translations,
    type DataInputs,
    type UpdateInputFunction,
    type TextFieldRules,
} from './types';
import { defaultDataInputs } from './utils';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, MenuItem, Tooltip } from '@mui/material';

interface TextFieldComponentProps {
    parameterName: Parameters;
    translations: Translations;
    updateDataInputs: UpdateInputFunction;
    updateInputValue: UpdateInputFunction;
    value: number;
    endAdornment?: string;
    rules?: TextFieldRules;
}
const TextFieldComponent = (props: TextFieldComponentProps) => {
    const {
        parameterName,
        translations,
        updateDataInputs,
        updateInputValue,
        value,
        endAdornment,
        rules,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const isValid = isValidValue(value);
            updateDataInputs(Parameters[parameterName], isValid ? value : '');
        }
    };

    const isValidValue = (value: number | '') => {
        if (value === '') {
            setErrorMessage('');
            return true;
        }

        if (rules?.integer && !Number.isInteger(value)) {
            setErrorMessage(translations.mustBeInteger);
            return false;
        } else if (rules?.min !== undefined && value < rules.min) {
            setErrorMessage(`${translations.minLimit} ${rules.min}`);
            return false;
        } else if (rules?.max !== undefined && value > rules.max) {
            setErrorMessage(`${translations.maxLimit} ${rules.max}`);
            return false;
        }

        setErrorMessage('');

        return true;
    };

    return (
        <TextField
            required
            error={!!errorMessage}
            helperText={errorMessage}
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
            value={value}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                const newValue = Number(event.target.value);
                const isValid = isValidValue(newValue);
                updateDataInputs(
                    Parameters[parameterName],
                    isValid ? newValue : ''
                );
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                const newValue = value === '' ? value : Number(value);
                isValidValue(newValue);
                updateInputValue(Parameters[parameterName], newValue);
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
                    rules={{
                        integer: true,
                        min: 0,
                        max: 100000000,
                    }}
                />
                <TextFieldComponent
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
                <TextFieldComponent
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
                <Tooltip title={translations.availableSoon}>
                    <TextField
                        id={Parameters.overpaymentResult}
                        select
                        label={translations.overpaymentResult}
                        defaultValue={Parameters.lowerInterest}
                        size="small"
                        disabled
                        value={overpaymentResult}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
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
                </Tooltip>
            </div>
        </Box>
    );
};
export default Form;
