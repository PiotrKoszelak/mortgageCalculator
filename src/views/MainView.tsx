import { menuHeight } from '../utils/constants';

import { Box, styled } from '@mui/material';
import Calculator from '../components/calculator/Calculator';
import Sidebar from '../components/layout/Sidebar';

const StyledView = styled(Box)`
    width: 100%;
    height: calc(100vh - ${menuHeight}px);
    display: flex;
`;

const MainView = () => (
    <StyledView>
        <Calculator isSingle />
        <Sidebar />
    </StyledView>
);

export default MainView;
