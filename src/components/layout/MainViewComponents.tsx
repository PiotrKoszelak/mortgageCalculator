import { useAppDispatch } from '../../store/hooks';
import { hidePanel } from '../../store/globalSlice';

import { Box, Button, styled } from '@mui/material';

interface CustomButtonProps {
    title?: string;
}

const StyledContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

export const CustomButton = (props: CustomButtonProps) => {
    const title = props.title || '';
    const dispatch = useAppDispatch();

    return (
        <StyledContainer>
            <Button onClick={() => dispatch(hidePanel())} variant="outlined">
                {title}
            </Button>
        </StyledContainer>
    );
};
