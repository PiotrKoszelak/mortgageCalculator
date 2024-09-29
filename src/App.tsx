import { useEffect } from 'react';

import { useAppDispatch } from './store/hooks';
import { LanguageList } from './utils/constants';
import { changeLanguage } from './store/globalSlice';

import { ThemeProvider } from '@mui/material';
import styled from 'styled-components';
import Card from './components/calculator/Card';
import LanguageToggle from './components/menu/Lanuage';
import { colors, darkTheme } from './utils/theme';

import './App.css';

const StyledApp = styled.div`
    width: 100vw;
    height: 100vh;
    font-family: Lato;
    background-color: ${colors.darkGrey};
`;

interface AppProps {
    language: LanguageList;
}

function App(props: AppProps) {
    const dispatch = useAppDispatch();

    const { language } = props;

    useEffect(() => {
        dispatch(changeLanguage(language));
    }, [dispatch, language]);

    return (
        <StyledApp>
            <ThemeProvider theme={darkTheme}>
                <LanguageToggle />
                <Card />
            </ThemeProvider>
        </StyledApp>
    );
}

export default App;
