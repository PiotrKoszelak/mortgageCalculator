import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Parameters } from '../../../utils/constants';

import { Box, Divider, styled, Typography } from '@mui/material';
import Benefits from './Benefits';

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AboutPanel = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledContainer>
            <Typography variant="h5">
                {translations[Parameters.about]}
            </Typography>
            <Typography variant="subtitle1">
                {translations[Parameters.appDescription]}
            </Typography>
            <Divider />
            <Benefits />
        </StyledContainer>
    );
};

export default AboutPanel;
