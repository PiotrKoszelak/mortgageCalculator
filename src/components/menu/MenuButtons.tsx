import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    changeMenu,
    selectMenu,
    selectTranslations,
} from '../../store/globalSlice';

import { menuHeight, MenuList } from '../../utils/constants';

import { styled } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const StyledBottomNavigation = styled(BottomNavigation)`
    background-color: transparent;
    height: ${menuHeight}px;
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
    margin: 0 10px;
    font-weight: bold;
    opacity: 0.7;
    height: ${menuHeight}px;

    &:active,
    &:hover {
        opacity: 1;
    }

    &.Mui-selected {
        opacity: 1;
    }
`;

const MenuButtons = () => {
    const dispatch = useAppDispatch();
    const selectedMenu = useAppSelector(selectMenu);
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledBottomNavigation
            showLabels
            value={selectedMenu}
            onChange={(_, newValue: MenuList) => {
                dispatch(changeMenu(newValue));
            }}
        >
            <StyledBottomNavigationAction
                label={translations.about.toUpperCase()}
                value={MenuList.about}
            />
            <StyledBottomNavigationAction
                label={translations.contact.toUpperCase()}
                value={MenuList.contact}
            />
            <StyledBottomNavigationAction
                label={translations.signIn.toUpperCase()}
                value={MenuList.signIn}
            />
        </StyledBottomNavigation>
    );
};

export default MenuButtons;
