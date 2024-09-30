import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { Parameters } from '../../utils/constants';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, MenuItem } from '@mui/material';

const Form = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id={Parameters.totalPrincipal}
                    label={translations.totalPrincipal}
                    type="number"
                    size="small"
                />
                <TextField
                    required
                    id={Parameters.interestRate}
                    label={translations.interestRate}
                    type="number"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        },
                    }}
                    size="small"
                />
                <TextField
                    required
                    id={Parameters.numberOfMonths}
                    label={translations.numberOfMonths}
                    type="number"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                />
                <TextField
                    id={Parameters.installementType}
                    select
                    label={translations.installementType}
                    defaultValue={Parameters.equal}
                    required
                    size="small"
                >
                    <MenuItem key={Parameters.equal} value={Parameters.equal}>
                        {translations.equal}
                    </MenuItem>
                    <MenuItem
                        key={Parameters.decreasing}
                        value={Parameters.decreasing}
                    >
                        {translations.decreasing}
                    </MenuItem>
                </TextField>
                <TextField
                    id={Parameters.overpaymentResult}
                    select
                    label={translations.overpaymentResult}
                    defaultValue={Parameters.lowerInterest}
                    size="small"
                    disabled
                >
                    <MenuItem
                        key={Parameters.lowerInterest}
                        value={Parameters.lowerInterest}
                    >
                        {translations.lowerInterest}
                    </MenuItem>
                    <MenuItem
                        key={Parameters.shortenTime}
                        value={Parameters.shortenTime}
                    >
                        {translations.shortenTime}
                    </MenuItem>
                </TextField>
            </div>
        </Box>
    );
};
export default Form;
