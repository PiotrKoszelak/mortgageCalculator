import { useAppSelector } from '../store/hooks';
import { selectLanguage } from '../store/globalSlice';
import { appPlaceholder } from '../utils/i18n';

import styled from 'styled-components';

const StyledContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    background-color: rgba(24, 62, 89, 0.94);
    color: white;
`;

const Placeholder = () => {
    const selectedLanguage = useAppSelector(selectLanguage);

    return (
        <StyledContainer>{appPlaceholder[selectedLanguage]}</StyledContainer>
    );
};

export default Placeholder;
