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
    parameter: Parameters | number;
    translations: Translations;
    updateInputValue: UpdateInputFunction;
    value: number | string;
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

    const [inputValue, setInputValue] = useState<number | string>(value);

    const updateValue = () => {
        if (isValidValue(inputValue) && value !== inputValue) {
            const name =
                typeof parameter === 'number'
                    ? parameter
                    : Parameters[parameter];
            updateInputValue(name, inputValue);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateValue();
        }
    };

    const isValidValue = (value: number | string) => {
        if (typeof value === 'string') {
            setErrorMessage('');
            return true;
        }

        if (rules?.integer && !Number.isInteger(value)) {
            setErrorMessage(translations.mustBeInteger);
            return false;
        } else if (
            rules?.min !== undefined &&
            value < (parseNumber(rules.min, true) as number)
        ) {
            setErrorMessage(
                `${translations.minLimit} ${parseNumber(rules.min)}`
            );
            return false;
        } else if (
            rules?.max !== undefined &&
            value > (parseNumber(rules.max, true) as number)
        ) {
            setErrorMessage(
                `${translations.maxLimit} ${parseNumber(rules.max)}`
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
            value={inputValue}
            onBlur={() => {
                updateValue();
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                const newValue = value === '' ? value : Number(value);
                isValidValue(newValue);
                setInputValue(newValue);
            }}
            onKeyDown={handleKeyDown}
        />
    );
};

export default Input;
