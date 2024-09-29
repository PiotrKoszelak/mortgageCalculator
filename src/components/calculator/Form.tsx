import { calculatorInputs } from '../../utils/i18n';
import { useAppSelector } from '../../store/hooks';
import { selectLanguage } from '../../store/globalSlice';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, MenuItem } from '@mui/material';
import { InstallementType, OverpaymentResult } from './calculations';

const Form = () => {
    const selectedLanguage = useAppSelector(selectLanguage);

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
                    id="totalPrincipal"
                    label={calculatorInputs.totalPrincipal[selectedLanguage]}
                    type="number"
                    size="small"
                />
                <TextField
                    required
                    id="interest"
                    label={calculatorInputs.interest[selectedLanguage]}
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
                    id="months"
                    label={calculatorInputs.numberOfMonths[selectedLanguage]}
                    type="number"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                />
                <TextField
                    id="installementType"
                    select
                    label={calculatorInputs.installementType[selectedLanguage]}
                    defaultValue={InstallementType.equal}
                    required
                    size="small"
                >
                    <MenuItem
                        key={InstallementType.equal}
                        value={InstallementType.equal}
                    >
                        {calculatorInputs.equal[selectedLanguage]}
                    </MenuItem>
                    <MenuItem
                        key={InstallementType.decreasing}
                        value={InstallementType.decreasing}
                    >
                        {calculatorInputs.decreasing[selectedLanguage]}
                    </MenuItem>
                </TextField>
                <TextField
                    id="overpaymentResult"
                    select
                    label={calculatorInputs.overpaymentResult[selectedLanguage]}
                    defaultValue={OverpaymentResult.amount}
                    size="small"
                    disabled
                >
                    <MenuItem
                        key={OverpaymentResult.amount}
                        value={OverpaymentResult.amount}
                    >
                        {calculatorInputs.lowerInterest[selectedLanguage]}
                    </MenuItem>
                    <MenuItem
                        key={OverpaymentResult.time}
                        value={OverpaymentResult.time}
                    >
                        {calculatorInputs.shortenTime[selectedLanguage]}
                    </MenuItem>
                </TextField>
            </div>
        </Box>
    );
};
export default Form;
