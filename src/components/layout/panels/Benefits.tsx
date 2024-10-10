import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Box, styled, Typography } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledParagraph = styled('p')`
    display: flex;
    gap: 20px;
`;

const Benefits = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledBox>
            <Typography variant="subtitle1">
                {translations.benefitsForSignInUsers}
            </Typography>
            <StyledParagraph>
                <TableViewIcon /> {translations.multipleCalculators}
            </StyledParagraph>
            <StyledParagraph>
                <CompareArrowsIcon /> {translations.easyComparison}
            </StyledParagraph>
            <StyledParagraph>
                <SaveIcon /> {translations.savedResults}
            </StyledParagraph>
            <StyledParagraph>
                <GetAppIcon /> {translations.exportTo}
            </StyledParagraph>
        </StyledBox>
    );
};

export default Benefits;
