import { MouseEvent } from 'react';
import { changeLanguage, selectLanguage } from '../../store/globalSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { LanguageList, menuHeight } from '../../utils/constants';
import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
    height: ${menuHeight}px;
`;

function LanguageToggle() {
    const dispatch = useAppDispatch();
    const selectedLanguage = useAppSelector(selectLanguage);

    const handleChange = (
        _: MouseEvent<HTMLElement>,
        language: LanguageList
    ) => {
        language && dispatch(changeLanguage(language));
    };

    return (
        <StyledToggleButtonGroup
            color="primary"
            value={selectedLanguage}
            exclusive
            onChange={handleChange}
            aria-label="LanguageList"
        >
            <ToggleButton value={LanguageList.pl}>Pl</ToggleButton>
            <ToggleButton value={LanguageList.en}>En</ToggleButton>
        </StyledToggleButtonGroup>
    );
}

export default LanguageToggle;
