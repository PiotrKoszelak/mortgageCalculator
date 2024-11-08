import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Box, styled, Typography } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import Icon from '../../common/Icon';

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledParagraph = styled('p')`
    display: flex;
    gap: 20px;
    line-height: 40px;
`;

const Benefits = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledContainer>
            <Typography variant="subtitle1">
                {translations.signInUsersHaveAccessTo}
            </Typography>
            <StyledParagraph>
                <Icon>
                    <TableViewIcon />
                </Icon>
                {translations.multipleCalculators}
            </StyledParagraph>
            <StyledParagraph>
                <Icon>
                    <CompareArrowsIcon />
                </Icon>{' '}
                {translations.easyComparison}
            </StyledParagraph>
            <StyledParagraph>
                <Icon>
                    <SaveIcon />
                </Icon>{' '}
                {translations.savedResults}
            </StyledParagraph>
            <StyledParagraph>
                <Icon>
                    <GetAppIcon />
                </Icon>{' '}
                {translations.exportTo}
            </StyledParagraph>
        </StyledContainer>
    );
};

export default Benefits;
