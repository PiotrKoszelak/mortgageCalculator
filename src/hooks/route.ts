import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../store/hooks';
import { changeMenu, hidePanel } from '../store/globalSlice';
import { MenuList, seoValues } from '../utils/constants';
import { useIsMobile } from './common';

export const useRoute = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    useEffect(() => {
        if (pathname === `/${MenuList.calculator}` && isMobile) {
            dispatch(hidePanel());
        } else if (pathname === `/${MenuList.contact}`) {
            dispatch(changeMenu(MenuList.contact));
        } else {
            dispatch(changeMenu(MenuList.about));
            navigate({
                pathname: '/',
            });
        }
    }, [pathname, dispatch, navigate, isMobile]);
};

export const useSeo = () => {
    const [seoParams, setSeoParams] = useState(seoValues.default);
    const { pathname } = useLocation();
    const isMobile = useIsMobile();

    useEffect(() => {
        if (pathname === `/${MenuList.calculator}` && isMobile) {
            setSeoParams(seoValues[MenuList.calculator]);
        } else if (pathname === `/${MenuList.contact}`) {
            setSeoParams(seoValues[MenuList.contact]);
        } else {
            setSeoParams(seoValues.default);
        }
    }, [pathname, isMobile, setSeoParams]);

    return seoParams;
};
