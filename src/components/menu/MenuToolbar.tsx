import { menuHeight } from '../../utils/constants';

import { Box, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
    return (
        <AppBar position="static">
            <StyledToolbar>
                <Logo />
                <StyledButtonBar>
                    <MenuButtons />
                    <LanguageToggle />
                </StyledButtonBar>
            </StyledToolbar>
        </AppBar>
    );
};

export default MenuToolbar;
