import { Box, colors, styled } from '@mui/material';

interface IconProps {
    children: JSX.Element;
}

const StyledIcon = styled(Box)`
    color: ${colors.purple[300]};
    width: 40px;
    height: 40px;
    border: 1px solid ${colors.purple[300]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = (props: IconProps) => <StyledIcon>{props.children}</StyledIcon>;

export default Icon;
