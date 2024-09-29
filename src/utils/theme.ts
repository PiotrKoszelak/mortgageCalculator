import { createTheme } from '@mui/material';

export const colors = {
    darkPurple: '#730099',
    lightPurple: '#b300b3',
    white: '#fff',
    darkGrey: '#404040',
    lightGrey: '#595959',
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
            default: colors.darkGrey,
            paper: colors.lightGrey,
        },
    },
});
