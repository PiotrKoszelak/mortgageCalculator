import { useAppSelector } from '../../../store/hooks';
import { selectMenu } from '../../../store/globalSlice';

import { MenuList } from '../../../utils/constants';

import { Box, styled } from '@mui/material';
import AboutPanel from './AboutPanel';
import SignInPanel from './SignInPanel';
import ContactPanel from './Contact';

const StyledContainer = styled(Box)`
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
