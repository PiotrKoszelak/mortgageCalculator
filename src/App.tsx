import { Provider } from 'react-redux';
import { store } from './store/store.ts';

import { darkTheme } from './utils/theme';
import { ThemeProvider } from '@mui/material';

import MenuToolbar from './components/menu/MenuToolbar';
import MainView from './views/MainView';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <MenuToolbar />
                <MainView />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
