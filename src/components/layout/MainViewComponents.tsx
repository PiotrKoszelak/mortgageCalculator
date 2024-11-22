import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { MenuList } from '../../utils/constants';

import { Box, Button, styled } from '@mui/material';

const StyledContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

export const OpenCalculatorButton = () => {
    const translations = useAppSelector(selectTranslations);
    const navigate = useNavigate();

    return (
        <StyledContainer>
            <Button
                onClick={() =>
                    navigate({
                        pathname: `/${MenuList.calculator}`,
                    })
                }
                variant="outlined"
            >
                {translations.showCalculator}
            </Button>
        </StyledContainer>
    );
};
