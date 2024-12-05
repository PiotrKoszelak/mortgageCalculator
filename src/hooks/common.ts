import { useState, useEffect, useMemo } from 'react';
import { mobileWidth } from '../utils/constants';
import { useAppSelector } from '../store/hooks';
import { selectCurrency } from '../store/cardSlice';
import { selectLanguage } from '../store/globalSlice';

export const useWindowDimensions = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return dimensions;
};

export const useIsMobile = () => {
    const { width } = useWindowDimensions();

    const isMobile = width <= mobileWidth;

    return isMobile;
};

export const useCurrencyFormat = (noFormat = false, noCurrency = false) => {
    const currency = useAppSelector(selectCurrency);
    const locale = useAppSelector(selectLanguage);

    const format = useMemo(
        () => ({
            locale,
            currency: noCurrency ? null : currency,
        }),
        [currency, locale, noCurrency]
    );

    if (noFormat) return null;

    return format;
};
