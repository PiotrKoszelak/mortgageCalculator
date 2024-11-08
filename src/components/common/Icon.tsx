import { Box, styled } from '@mui/material';
import { appColors } from '../../utils/theme';

interface IconProps {
    children: JSX.Element;
}

const StyledIcon = styled(Box)`
    color: ${appColors.lightPurple};
    width: 40px;
    height: 40px;
    border: 1px solid ${appColors.lightPurple};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = (props: IconProps) => <StyledIcon>{props.children}</StyledIcon>;

export default Icon;
