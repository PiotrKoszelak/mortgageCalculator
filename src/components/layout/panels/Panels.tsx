import { useAppSelector } from '../../../store/hooks';
import { selectMenu } from '../../../store/globalSlice';

import { MenuList } from '../../../utils/constants';

import { Box, styled } from '@mui/material';
import AboutPanel from './AboutPanel';
import SignInPanel from './SignInPanel';

const StyledBox = styled(Box)`
    padding: 24px;
`;

const Panels = () => {
    const selectedMenu = useAppSelector(selectMenu);

    const Content = () => {
        switch (selectedMenu) {
            case MenuList.about:
                return <AboutPanel />;
            case MenuList.signIn:
                return <SignInPanel />;
            default:
                return null;
        }
    };

    return (
        <StyledBox>
            <Content />
        </StyledBox>
    );
};

export default Panels;
