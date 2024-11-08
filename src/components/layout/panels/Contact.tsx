import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Parameters } from '../../../utils/constants';

import { Box, Divider, styled, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Icon from '../../common/Icon';
import Image from '../../common/Image';
import AuthorImage from '../../../assets/author.jpg';

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const StyledParagraph = styled('p')`
    display: flex;
    gap: 20px;
    line-height: 40px;
`;

const StyledLogo = styled(Image)`
    position: relative;
    left: calc(50% - 75px);
    border-radius: 50%;
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
                <Icon>
                    <SendIcon />
                </Icon>
                koszelak.piotr@gmail.com
            </StyledParagraph>
            <Divider />
            <Typography variant="h6">
                {translations[Parameters.aboutAuthor]}
            </Typography>
            <StyledLogo alt="Author" src={AuthorImage} size={150} />
            <StyledParagraph>
                {translations[Parameters.authorDescription]}
            </StyledParagraph>
        </StyledBox>
    );
};

export default ContactPanel;
