import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectMenu, selectTranslations } from '../../store/globalSlice';

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
    opacity: 1;
    height: ${menuHeight}px;
    transition: opacity 0.4s;
    &:active,
    &:hover {
        opacity: 0.7;
    }

    span {
        font-size: 14px;
    }

    &.Mui-selected {
        opacity: 1;

        span {
            font-size: 14px;
        }
    }
`;

const MenuButtons = () => {
    const navigate = useNavigate();
    const selectedMenu = useAppSelector(selectMenu);
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledBottomNavigation
            showLabels
            value={selectedMenu}
            onChange={(_, newValue: MenuList) => {
                const pathname =
                    newValue === MenuList.about ? `/` : `/${newValue}`;
                navigate({
                    pathname,
                });
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
            {/* <StyledBottomNavigationAction
                label={translations.signIn.toUpperCase()}
                value={MenuList.signIn}
            /> */}
        </StyledBottomNavigation>
    );
};

export default MenuButtons;
