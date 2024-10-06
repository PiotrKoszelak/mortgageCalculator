import { menuHeight } from '../../utils/constants';

import { Box, styled } from '@mui/material';
import Card from '../calculator/Card';
import Layout from './Layout';

const StyledContent = styled(Box)`
    width: 100%;
    height: calc(100% - ${menuHeight + 50}px);
    display: flex;
`;

function Content() {
    return (
        <StyledContent>
            <Card isSingle />
            <Layout />
        </StyledContent>
    );
}

export default Content;
