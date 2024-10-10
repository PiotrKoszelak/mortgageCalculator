import { createTheme } from '@mui/material';

export const colors = {
    lightPurple: '#8d42f5',
    darkPurple: '#ac79f2',
    white: '#fff',
    lightGrey: '#404040',
    darkGrey: '#303133',
};

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.lightPurple,
            light: colors.lightPurple,
            dark: colors.darkPurple,
            contrastText: colors.white,
        },
        background: {
            default: colors.darkGrey,
            paper: colors.lightGrey,
        },
    },
});
