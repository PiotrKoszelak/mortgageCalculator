import { useState, useEffect } from 'react';
import { mobileWidth } from '../utils/constants';
import { useAppSelector } from '../store/hooks';
import { selectCurrency } from '../store/cardSlice';
import { selectLanguage } from '../store/globalSlice';

interface CurrencyFormatProps {
    noCurrency?: boolean;
    noFormat?: boolean;
}

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

export const useCurrencyFormat = (props: CurrencyFormatProps) => {
    const noFormat = props?.noFormat || false;
    const noCurrency = props?.noCurrency || false;

    const currency = useAppSelector(selectCurrency);
    const locale = useAppSelector(selectLanguage);

    if (noFormat) return null;

    return {
        locale,
        currency: noCurrency ? null : currency,
    };
};
