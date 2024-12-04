import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTranslations } from '../../store/globalSlice';
import {
    selectDataOptions,
    toggleColumnVisibility,
    toggleCurrency,
    changeCurrency,
} from '../../store/cardSlice';

import { DataOptions } from './types';
import { Currency } from '../../utils/constants';

import {
    Box,
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

interface OptionSectionProps {
    title: string;
    content: JSX.Element;
}

const StyledContainer = styled(Accordion)`
    background-image: none;
`;

const StyledDetails = styled(AccordionDetails)`
    display: flex;
    justify-content: space-around;
`;

const StyledSection = styled(Box)`
    display: flex;
    flex-direction: column;
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
                {/* <OptionSection
                    title={translations.month}
                    content={<ColumnsVisibility />}
                /> */}
                <OptionSection
                    title={translations.currency}
                    content={<CurrencySection />}
                />
                {/* <OptionSection
                    title={translations.cycleOverpayment}
                    content={<ColumnsVisibility />}
                /> */}
            </StyledDetails>
        </StyledContainer>
    );
};

export default AdvancedOptions;
