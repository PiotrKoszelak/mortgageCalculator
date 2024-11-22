import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../store/hooks';
import { changeMenu, hidePanel } from '../store/globalSlice';
import { MenuList } from '../utils/constants';
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
