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

function App() {
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
