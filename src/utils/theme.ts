import { createTheme } from '@mui/material';

export const colors = {
    darkPurple: '#730099',
    lightPurple: '#b300b3',
    white: '#fff',
    darkBlue: '#29293d',
    lightBlue: '#47476b',
};

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.white,
            light: colors.lightPurple,
            dark: '#1565c0',
            contrastText: colors.white,
        },
        background: {
            default: colors.darkBlue,
            paper: colors.lightBlue,
        },
    },
});
