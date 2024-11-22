import { menuHeight } from '../../utils/constants';
import { useIsMobile } from '../../hooks/common';

import { Box, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import LanguageToggle from './Language';
import MenuButtons from './MenuButtons';
import MenuHamburger from './MenuHamburger';

const StyledToolbar = styled(Toolbar)`
    min-height: ${menuHeight}px !important;
    justify-content: space-between;
`;

const StyledButtonBar = styled(Box)`
    display: flex;
    align-items: center;
`;

const MenuToolbar = () => {
    const isMobile = useIsMobile();

    return (
        <AppBar position="static">
            <StyledToolbar>
                <Logo />
                <StyledButtonBar>
                    {isMobile ? <MenuHamburger /> : <MenuButtons />}
                    <LanguageToggle />
                </StyledButtonBar>
            </StyledToolbar>
        </AppBar>
    );
};

export default MenuToolbar;
