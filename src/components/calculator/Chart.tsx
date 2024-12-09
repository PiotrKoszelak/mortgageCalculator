import { selectTranslations } from '../../store/globalSlice';
import { useAppSelector } from '../../store/hooks';
import { appColors } from '../../utils/theme';
import { ChartValue, SummaryValues } from './types';

import { styled } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

interface CustomPieChartProps {
    summaryValues: SummaryValues;
}

const StyledPieChart = styled(PieChart)`
    .MuiPieArc-data-index-2 {
        display: none;
    }
`;

const palette = [
    appColors.grey,
    appColors.lightPurple,
    appColors.blue,
    appColors.coral,
];

const CustomPieChart = (props: CustomPieChartProps) => {
    const { summaryValues } = props;
    const translations = useAppSelector(selectTranslations);

    const data: { [name: string]: ChartValue } = {};

    summaryValues.forEach(({ key, name, value }, index) => {
        data[key] = {
            id: key,
            value,
            label: name,
            color: palette[index],
        };
    });

    const generalData = [data.totalPrincipal, data.totalInterest];
    const detailedData = data.totalOverpayment.value
        ? [
              {
                  ...data.totalPrincipal,
                  value:
                      data.totalPrincipal.value - data.totalOverpayment.value,
                  label: translations.principal,
              },
              { ...data.totalOverpayment, label: translations.overpayment },
              { ...data.totalInterest, color: 'transparent' },
          ]
        : [];

    return (
        <StyledPieChart
            series={[
                {
                    data: generalData,
                    innerRadius: 40,
                    outerRadius: 80,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                        innerRadius: 35,
                        additionalRadius: -5,
                        color: appColors.grey,
                    },
                },
                {
                    data: detailedData,
                    innerRadius: 90,
                    outerRadius: 100,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                        innerRadius: 85,
                        additionalRadius: -5,
                        color: appColors.grey,
                    },
                },
            ]}
            slotProps={{ legend: { hidden: true } }}
            height={200}
        />
    );
};

export default CustomPieChart;
