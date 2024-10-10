import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Parameters } from '../../../utils/constants';

import { Box, Divider, styled, Typography } from '@mui/material';
import Benefits from './Benefits';

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AboutPanel = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledBox>
            <Typography variant="h5">
                {translations[Parameters.about]}
            </Typography>
            <Typography variant="h6">
                {translations[Parameters.appDescription]}
            </Typography>
            <Divider />
            <Benefits />
        </StyledBox>
    );
};

export default AboutPanel;
