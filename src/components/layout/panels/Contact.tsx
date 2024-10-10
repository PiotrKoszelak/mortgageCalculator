import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Parameters } from '../../../utils/constants';
import AuthorImage from '../../../assets/author.jpg';

import { Box, Divider, styled, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const StyledParagraph = styled('p')`
    display: flex;
    gap: 20px;
    line-height: 30px;
`;

const StyledLogo = styled('div')`
    position: relative;
    left: calc(50% - 75px);
    border-radius: 50%;
    background-image: url(${AuthorImage});
    width: 150px;
    height: 150px;
`;

const ContactPanel = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledBox>
            <Typography variant="h5">
                {translations[Parameters.contact]}
            </Typography>
            <StyledParagraph>
                <SendIcon /> koszelak.piotr@gmail.com
            </StyledParagraph>
            <Divider />
            <Typography variant="h6">
                {translations[Parameters.aboutAuthor]}
            </Typography>
            <StyledLogo />
            <StyledParagraph>
                {' '}
                {translations[Parameters.authorDescription]}
            </StyledParagraph>
        </StyledBox>
    );
};

export default ContactPanel;
