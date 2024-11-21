import { useState, useEffect } from 'react';
import { mobileWidth } from '../utils/constants';

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
