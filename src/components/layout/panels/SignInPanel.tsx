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
} from '@mui/material';

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SignInPanel = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledBox>
            <div>{translations[Parameters.availableSoon]}</div>
            <Divider />
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
        </StyledBox>
    );
};

export default SignInPanel;
