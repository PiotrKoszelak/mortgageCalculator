import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { store } from './store/store.ts';

import { routesConfig } from './routes';
import { darkTheme } from './utils/theme';

import { ThemeProvider } from '@mui/material';

import './App.css';

const router = createBrowserRouter(routesConfig);

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <HelmetProvider>
                    <RouterProvider router={router} />
                </HelmetProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
