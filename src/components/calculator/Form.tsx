import { useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import { Parameters } from '../../utils/constants';
import { type DataInputs } from './types';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, MenuItem } from '@mui/material';

interface FormProps {
    updateInputValue: (name: Parameters, value: unknown) => void;
    inputs: DataInputs;
}

const Form = (props: FormProps) => {
    const translations = useAppSelector(selectTranslations);

    const { updateInputValue, inputs } = props;
    const {
        totalPrincipal,
        interestRate,
        numberOfMonths,
        installementType,
        overpaymentResult,
    } = inputs;

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
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    value={totalPrincipal}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateInputValue(
                            Parameters.totalPrincipal,
                            event.target.value
                        );
                    }}
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
                    value={interestRate}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateInputValue(
                            Parameters.interestRate,
                            event.target.value
                        );
                    }}
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
                    value={numberOfMonths}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateInputValue(
                            Parameters.numberOfMonths,
                            event.target.value
                        );
                    }}
                />
                <TextField
                    id={Parameters.installementType}
                    select
                    label={translations.installementType}
                    defaultValue={Parameters.equal}
                    required
                    size="small"
                    value={installementType}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateInputValue(
                            Parameters.installementType,
                            event.target.value
                        );
                    }}
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
                    value={overpaymentResult}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateInputValue(
                            Parameters.overpaymentResult,
                            event.target.value
                        );
                    }}
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
