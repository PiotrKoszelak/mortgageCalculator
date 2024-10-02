import { useState } from 'react';
import { Parameters } from '../../utils/constants';
import {
    type Translations,
    type UpdateInputFunction,
    type TextFieldRules,
} from './types';
import { parseNumber } from './utils';

import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

interface InputProps {
    parameterName: Parameters;
    translations: Translations;
    updateDataInputs: UpdateInputFunction;
    updateInputValue: UpdateInputFunction;
    value: number | '';
    endAdornment?: string;
    rules?: TextFieldRules;
    nr?: number;
}

const Input = (props: InputProps) => {
    const {
        parameterName,
        translations,
        updateDataInputs,
        updateInputValue,
        value,
        endAdornment,
        rules,
        nr,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const isValid = isValidValue(value);
            updateDataInputs(
                Parameters[parameterName],
                isValid ? value : '',
                nr
            );
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
            setErrorMessage(
                `${translations.minLimit} ${parseNumber(rules.min)}`
            );
            return false;
        } else if (rules?.max !== undefined && value > rules.max) {
            setErrorMessage(
                `${translations.maxLimit} ${parseNumber(rules.max)}`
            );
            return false;
        }

        setErrorMessage('');

        return true;
    };

    const tableInput = !isNaN(Number(nr));

    return (
        <TextField
            required={!tableInput}
            error={!!errorMessage}
            helperText={errorMessage}
            id={nr ? `${parameterName}-${nr}` : parameterName}
            label={tableInput ? '' : translations[parameterName]}
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
                    isValid ? newValue : '',
                    nr
                );
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                const newValue = value === '' ? value : Number(value);
                isValidValue(newValue);
                updateInputValue(Parameters[parameterName], newValue, nr);
            }}
            onKeyDown={handleKeyDown}
        />
    );
};

export default Input;
