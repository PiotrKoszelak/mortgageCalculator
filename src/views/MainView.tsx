import { menuHeight } from '../utils/constants';

import { Box, Paper, styled } from '@mui/material';
import Calculator from '../components/calculator/Calculator';
import Sidebar from '../components/layout/Sidebar';
import Panels from '../components/layout/panels/Panels';
import { useIsMobile } from '../hooks/common';

const StyledView = styled(Box)`
    width: 100%;
    height: calc(100vh - ${menuHeight}px);
    display: flex;
`;

const StyledPanel = styled(Paper)`
    width: 500px;
`;

const MainView = () => {
    const isMobile = useIsMobile();

    return (
        <StyledView>
            <Calculator isSingle />
            {isMobile ? (
                <Sidebar>
                    <Panels />
                </Sidebar>
            ) : (
                <StyledPanel>
                    <Panels />
                </StyledPanel>
            )}
        </StyledView>
    );
};

export default MainView;
