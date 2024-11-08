import { colors, createTheme } from '@mui/material';

export const appColors = {
    lightPurple: colors.purple[300],
    darkPurple: colors.purple[400],
    white: '#fff',
    lightGrey: colors.grey[900],
    darkGrey: '#171717',
};

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: appColors.darkPurple,
            light: appColors.lightPurple,
            dark: appColors.darkPurple,
            contrastText: appColors.white,
        },
        background: {
            default: appColors.darkGrey,
            paper: appColors.lightGrey,
        },
    },
});
