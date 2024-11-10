import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Box, IconButton, styled, Tooltip, Typography } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import Icon from '../../common/Icon';

interface SingleBenefitProps {
    icon: JSX.Element;
    text: string;
    tooltipText: string;
}

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledParagraph = styled('p')`
    display: flex;
    gap: 20px;
    line-height: 60px;
`;

const SingleBenefit = (props: SingleBenefitProps) => {
    const { icon, text, tooltipText } = props;

    return (
        <StyledParagraph>
            <Tooltip title={tooltipText} placement="bottom-start">
                <IconButton>
                    <Icon>{icon}</Icon>
                </IconButton>
            </Tooltip>
            {text}
        </StyledParagraph>
    );
};

const Benefits = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledContainer>
            <Typography variant="subtitle1">
                {translations.signInUsersHaveAccessTo}
            </Typography>
            <SingleBenefit
                icon={<TableViewIcon />}
                text={translations.multipleCalculators}
                tooltipText={translations.multipleCalculatorsDesc}
            />
            <SingleBenefit
                icon={<CompareArrowsIcon />}
                text={translations.easyComparison}
                tooltipText={translations.easyComparisonDesc}
            />
            <SingleBenefit
                icon={<SaveIcon />}
                text={translations.savedResults}
                tooltipText={translations.savedResultsDesc}
            />
            <SingleBenefit
                icon={<GetAppIcon />}
                text={translations.exportTo}
                tooltipText={translations.exportToDesc}
            />
        </StyledContainer>
    );
};

export default Benefits;
