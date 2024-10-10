import { useAppSelector } from '../../../store/hooks';
import { selectTranslations } from '../../../store/globalSlice';

import { Parameters } from '../../../utils/constants';

import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    styled,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import Benefits from './Benefits';

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SignInPanel = () => {
    const translations = useAppSelector(selectTranslations);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <StyledBox>
            <Typography variant="h5">
                {translations[Parameters.signIn]}
            </Typography>
            <Benefits />
            <Divider />
            <form noValidate onSubmit={handleSubmit}>
                <StyledBox>
                    <TextField
                        required
                        id={Parameters.email}
                        label={translations.email}
                        variant="outlined"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        size="small"
                        type="email"
                    />

                    <TextField
                        required
                        id={Parameters.password}
                        label={translations.password}
                        variant="outlined"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        size="small"
                        type="password"
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={translations.rememberMe}
                    />
                    <Tooltip title={translations.availableSoon}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => {}}
                        >
                            {translations.signIn}
                        </Button>
                    </Tooltip>
                </StyledBox>
            </form>
        </StyledBox>
    );
};

export default SignInPanel;
