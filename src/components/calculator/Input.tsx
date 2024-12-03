import { useState } from 'react';
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

    const [inputValue, setInputValue] = useState<string>(
        parseNumberToString({
            number: value,
            isSpace: true,
            isDecimal: false,
        })
    );

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
                    isSpace: true,
                    isDecimal: !rules?.integer,
                })}`
            );
            return false;
        } else if (rules?.max !== undefined && value > rules.max) {
            setErrorMessage(
                `${translations.maxLimit} ${parseNumberToString({
                    number: rules.max,
                    isSpace: true,
                    isDecimal: !rules?.integer,
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
                if (!isNaN(numberValue)) {
                    isValidValue(numberValue);
                    setInputValue(
                        rules?.integer && value !== ''
                            ? parseNumberToString({
                                  number: numberValue,
                                  isSpace: true,
                                  isDecimal: false,
                              })
                            : value
                    );
                }
            }}
            onKeyDown={handleKeyDown}
        />
    );
};

export default Input;
