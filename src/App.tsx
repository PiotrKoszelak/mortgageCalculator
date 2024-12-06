import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { store } from './store/store.ts';
import { MenuList } from './utils/constants.ts';
import { darkTheme } from './utils/theme';

import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import MainView from './views/MainView.tsx';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <HelmetProvider>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path="/"
                                    element={<MainView view={MenuList.about} />}
                                />
                                <Route
                                    path="/contact"
                                    element={
                                        <MainView view={MenuList.contact} />
                                    }
                                />
                                <Route
                                    path="/calculator"
                                    element={
                                        <MainView view={MenuList.calculator} />
                                    }
                                />
                                <Route
                                    path="*"
                                    element={<MainView view={MenuList.about} />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </LocalizationProvider>
                </HelmetProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
