import { styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const StyledContainer = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Loader = (props: Record<string, unknown>) => {
    return (
        <StyledContainer>
            <CircularProgress {...props} />
        </StyledContainer>
    );
};

export default Loader;
