import { styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Loader = (props: Record<string, unknown>) => {
    return (
        <StyledBox>
            <CircularProgress {...props} />
        </StyledBox>
    );
};

export default Loader;
