import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../store/hooks';
import { changeMenu, hidePanel } from '../store/globalSlice';
import { MenuList, seoValues } from '../utils/constants';
import { useIsMobile } from './common';

export const useRoute = (view: MenuList) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    useEffect(() => {
        if (view === MenuList.calculator && isMobile) {
            dispatch(hidePanel());
        } else if (view === MenuList.contact) {
            dispatch(changeMenu(MenuList.contact));
        } else {
            dispatch(changeMenu(MenuList.about));
            navigate('/', {
                replace: true,
            });
        }
    }, [view, dispatch, navigate, isMobile]);
};

export const useSeo = (view: MenuList) => {
    const [seoParams, setSeoParams] = useState(seoValues.default);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (view === MenuList.calculator && isMobile) {
            setSeoParams(seoValues[MenuList.calculator]);
        } else if (view === MenuList.contact) {
            setSeoParams(seoValues[MenuList.contact]);
        } else {
            setSeoParams(seoValues.default);
        }
    }, [view, isMobile, setSeoParams]);

    return seoParams;
};
