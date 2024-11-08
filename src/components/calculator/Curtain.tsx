import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { appColors } from '../../utils/theme';

import styled from 'styled-components';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const StyledContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background-color: ${appColors.darkGrey};
`;

const Curtain = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledContainer>
            <EditNoteOutlinedIcon fontSize="large" />
            {translations.provideData}
        </StyledContainer>
    );
};

export default Curtain;
