import { useAppSelector } from '../../../store/hooks';
import { selectMenu } from '../../../store/globalSlice';

import { MenuList } from '../../../utils/constants';

import { Box, styled } from '@mui/material';
import AboutPanel from './AboutPanel';
import SignInPanel from './SignInPanel';
import ContactPanel from './ContactPanel';

const StyledContainer = styled(Box)`
    padding: 24px;
    width: inherit;
    box-sizing: border-box;
`;

const Panels = () => {
    const selectedMenu = useAppSelector(selectMenu);

    const Content = () => {
        switch (selectedMenu) {
            case MenuList.about:
                return <AboutPanel />;
            case MenuList.signIn:
                return <SignInPanel />;
            case MenuList.contact:
                return <ContactPanel />;
            default:
                return null;
        }
    };

    return (
        <StyledContainer>
            <Content />
        </StyledContainer>
    );
};

export default Panels;
