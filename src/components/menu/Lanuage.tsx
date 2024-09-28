import { MouseEvent } from 'react';
import { changeLanguage, selectLanguage } from '../../store/globalSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { LanguageList } from '../../utils/constants';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

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
        <ToggleButtonGroup
            color="primary"
            value={selectedLanguage}
            exclusive
            onChange={handleChange}
            aria-label="LanguageList"
        >
            <ToggleButton value={LanguageList.pl}>Pl</ToggleButton>
            <ToggleButton value={LanguageList.en}>En</ToggleButton>
        </ToggleButtonGroup>
    );
}

export default LanguageToggle;
