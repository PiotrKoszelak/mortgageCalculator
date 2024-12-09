import { useState } from 'react';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import {
    selectDataOptions,
    toggleColumnVisibility,
    toggleCurrency,
    changeCurrency,
    changeStartingMonth,
    resetOverpayments,
    selectDataInputs,
    applyRegularOverpayments,
} from '../../store/cardSlice';

import { DataInputsParams, DataOptions, UpdateInputFunction } from './types';
import { Currency, MonthDateFormat } from '../../utils/constants';

import {
    Box,
    Button,
    FormControlLabel,
    MenuItem,
    styled,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DateField } from '@mui/x-date-pickers';
import Input from './Input';

interface OptionSectionProps {
    title: string;
    content: JSX.Element;
}

const StyledContainer = styled(Accordion)`
    background-image: none;
`;

const StyledDetails = styled(AccordionDetails)`
    display: flex;
    justify-content: space-between;
    padding-top: 0;
    flex-wrap: wrap;
    row-gap: 50px;
`;

const StyledSection = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const OptionSection = (props: OptionSectionProps) => {
    const { title, content } = props;

    return (
        <StyledSection>
            <Typography align="center" gutterBottom>
                {title}
            </Typography>
            {content}
        </StyledSection>
    );
};

const ColumnsVisibility = () => {
    const translations = useAppSelector(selectTranslations);
    const dataOptions = useAppSelector(selectDataOptions);
    const dispatch = useAppDispatch();
    const { columnsVisibility } = dataOptions;

    const handleChange = (name: keyof DataOptions['columnsVisibility']) => {
        dispatch(toggleColumnVisibility({ name }));
    };

    return (
        <>
            {Object.entries(columnsVisibility).map(([name, value]) => {
                const typedName =
                    name as keyof DataOptions['columnsVisibility'];
                return (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={value}
                                onChange={() => handleChange(typedName)}
                                size="small"
                            />
                        }
                        label={translations[typedName]}
                    />
                );
            })}
        </>
    );
};

const CurrencySection = () => {
    const dataOptions = useAppSelector(selectDataOptions);
    const dispatch = useAppDispatch();
    const {
        currency: { value, enabled },
    } = dataOptions;

    return (
        <StyledDetails>
            <FormControlLabel
                control={
                    <Switch
                        checked={enabled}
                        onChange={() => dispatch(toggleCurrency())}
                    />
                }
                label={''}
            />
            <TextField
                select
                defaultValue={Currency.pln}
                size="small"
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value as Currency;
                    dispatch(changeCurrency({ value }));
                }}
            >
                {Object.values(Currency).map((value) => {
                    return (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    );
                })}
            </TextField>
        </StyledDetails>
    );
};

const MonthSection = () => {
    const translations = useAppSelector(selectTranslations);
    const dataOptions = useAppSelector(selectDataOptions);
    const dispatch = useAppDispatch();
    const { startingMonth } = dataOptions;

    const formattedValue = moment(startingMonth, MonthDateFormat);

    return (
        <StyledDetails>
            <DateField
                size="small"
                label={translations.chooseStartingMonth}
                format={MonthDateFormat}
                value={formattedValue}
                onChange={(newValue) =>
                    dispatch(
                        changeStartingMonth({
                            value: newValue?.format(MonthDateFormat) || '',
                        })
                    )
                }
            />
        </StyledDetails>
    );
};

const OverpaymentSection = () => {
    const translations = useAppSelector(selectTranslations);
    const dataInputs = useAppSelector(selectDataInputs);
    const dispatch = useAppDispatch();
    const [cycleValue, setCycleValue] = useState(0);

    const updateInputValue: UpdateInputFunction = (_, value: number) => {
        setCycleValue(value);
    };

    return (
        <>
            <Input
                parameter={100}
                translations={translations}
                updateInputValue={updateInputValue}
                value={cycleValue}
                rules={{
                    integer: false,
                    min: 0,
                    max: dataInputs[DataInputsParams.totalPrincipal],
                }}
            />
            <Button
                onClick={() =>
                    dispatch(applyRegularOverpayments({ value: cycleValue }))
                }
                variant="outlined"
            >
                {translations.applyRegularOverpayment}
            </Button>
            <Button
                onClick={() => dispatch(resetOverpayments())}
                variant="outlined"
            >
                {translations.resetAllOverpayments}
            </Button>
        </>
    );
};

const AdvancedOptions = () => {
    const translations = useAppSelector(selectTranslations);

    return (
        <StyledContainer>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                {translations.advancedOptions}
            </AccordionSummary>
            <StyledDetails>
                <OptionSection
                    title={translations.columnsVisibility}
                    content={<ColumnsVisibility />}
                />
                <OptionSection
                    title={translations.month}
                    content={<MonthSection />}
                />
                <OptionSection
                    title={translations.currency}
                    content={<CurrencySection />}
                />
                <OptionSection
                    title={translations.overpayment}
                    content={<OverpaymentSection />}
                />
            </StyledDetails>
        </StyledContainer>
    );
};

export default AdvancedOptions;
