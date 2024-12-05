import { useEffect, useState } from 'react';
import { useCurrencyFormat } from '../../hooks/common';
import { DataInputsParams } from './types';
import { parseNumberToString } from './utils';

interface UseValueProps {
    parameter: DataInputsParams | number;
    value: number;
}

export const useValue = (props: UseValueProps) => {
    const { parameter, value } = props;

    const noCurrency =
        parameter === DataInputsParams.totalPrincipal ||
        typeof parameter === 'number';

    const currencyFormat = useCurrencyFormat(!noCurrency, noCurrency);

    const [inputValue, setInputValue] = useState<string>(
        parseNumberToString({
            number: value,
            format: currencyFormat,
        })
    );

    useEffect(() => {
        setInputValue(
            parseNumberToString({
                number: value,
                format: currencyFormat,
            })
        );
    }, [value, currencyFormat]);

    return { inputValue, setInputValue, currencyFormat };
};
