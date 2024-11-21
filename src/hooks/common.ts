import { useState, useEffect } from 'react';
import { mobileWidth } from '../utils/constants';

export const useIsMobile = () => {
    const mediaQueryList = window.matchMedia(`(max-width: ${mobileWidth}px)`);
    const [isMobile, setIsMobile] = useState(mediaQueryList.matches);

    useEffect(() => {
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        mediaQueryList.addEventListener('change', handleChange);
        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, [mediaQueryList]);

    return isMobile;
};
