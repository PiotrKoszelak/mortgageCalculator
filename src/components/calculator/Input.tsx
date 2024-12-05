import { useState } from 'react';
import { useValue } from './hooks';
import {
    type Translations,
    type UpdateInputFunction,
    type TextFieldRules,
    DataInputsParams,
} from './types';
import { parseNumberToString, parseStringToNumber } from './utils';

import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

interface InputProps {
    parameter: DataInputsParams | number;
    translations: Translations;
    updateInputValue: UpdateInputFunction;
    value: number;
    endAdornment?: string;
    rules?: TextFieldRules;
}

const Input = (props: InputProps) => {
    const {
        parameter,
        translations,
        updateInputValue,
        value,
        endAdornment,
        rules,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const { inputValue, setInputValue, currencyFormat } = useValue({
        parameter,
        value,
    });

    const updateValue = () => {
        const newValue = parseStringToNumber(inputValue);
        if (isValidValue(newValue) && value !== newValue) {
            const name =
                typeof parameter === 'number'
                    ? parameter
                    : DataInputsParams[parameter];
            updateInputValue(name, newValue);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateValue();
        }
    };

    const isValidValue = (value: number) => {
        if (rules?.integer && !Number.isInteger(value)) {
            setErrorMessage(translations.mustBeInteger);
            return false;
        } else if (rules?.min !== undefined && value < rules.min) {
            setErrorMessage(
                `${translations.minLimit} ${parseNumberToString({
                    number: rules.min,
                    format: currencyFormat,
                })}`
            );
            return false;
        } else if (rules?.max !== undefined && value > rules.max) {
            setErrorMessage(
                `${translations.maxLimit} ${parseNumberToString({
                    number: rules.max,
                    format: currencyFormat,
                })}`
            );
            return false;
        }

        setErrorMessage('');

        return true;
    };

    const tableInput = typeof parameter === 'number';

    return (
        <TextField
            required={!tableInput}
            error={!!errorMessage}
            helperText={errorMessage}
            id={`${parameter}`}
            label={tableInput ? '' : translations[parameter]}
            type="text"
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
            value={inputValue}
            onBlur={() => {
                updateValue();
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                const numberValue = parseStringToNumber(value);
                const skip =
                    (parameter === DataInputsParams.interestRate &&
                        !isNaN(Number(value))) ||
                    value === '';

                isValidValue(numberValue);
                setInputValue(
                    !skip
                        ? parseNumberToString({
                              number: numberValue,
                              format: currencyFormat,
                          })
                        : value
                );
            }}
            onKeyDown={handleKeyDown}
        />
    );
};

export default Input;
