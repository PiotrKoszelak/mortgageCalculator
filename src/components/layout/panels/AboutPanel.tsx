import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Parameters } from '../../../utils/constants';

import { Box, Divider, styled } from '@mui/material';

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AboutPanel = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledBox>
            <div>{translations[Parameters.appDescription]}</div>
            <Divider />
        </StyledBox>
    );
};

export default AboutPanel;
