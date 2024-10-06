import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';

import { menuHeight } from '../../utils/constants';

import { Box, styled, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from './Logo';
import LanguageToggle from './Language';
import MenuButtons from './MenuButtons';

const StyledToolbar = styled(Toolbar)`
    min-height: ${menuHeight}px !important;
    justify-content: space-between;
`;

const StyledButtonBar = styled(Box)`
    display: flex;
`;

const MenuToolbar = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <AppBar position="static">
            <StyledToolbar>
                <Logo />
                <StyledButtonBar>
                    <MenuButtons />
                    <Tooltip title={translations.availableSoon}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                    <LanguageToggle />
                </StyledButtonBar>
            </StyledToolbar>
        </AppBar>
    );
};

export default MenuToolbar;
