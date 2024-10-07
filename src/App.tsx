import { useEffect } from 'react';

import { useAppDispatch } from './store/hooks';
import { LanguageList } from './utils/constants';
import { changeLanguage } from './store/globalSlice';

import { colors, darkTheme } from './utils/theme';

import { ThemeProvider } from '@mui/material';
import styled from 'styled-components';
import Content from './components/layout/Content';
import MenuToolbar from './components/menu/MenuToolbar';

import './App.css';

const StyledApp = styled.div`
    width: 100vw;
    height: 100vh;
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
                <MenuToolbar />
                <Content />
            </ThemeProvider>
        </StyledApp>
    );
}

export default App;
