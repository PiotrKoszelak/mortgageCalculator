import { useAppSelector } from '../store/hooks';
import { selectIsPanelVisible, selectTranslations } from '../store/globalSlice';

import { useIsMobile } from '../hooks/common';
import { menuHeight } from '../utils/constants';

import { Box, Paper, styled } from '@mui/material';
import Calculator from '../components/calculator/Calculator';
import { CustomButton } from '../components/layout/MainViewComponents';
import Panels from '../components/layout/panels/Panels';

const StyledView = styled(Box)`
    width: 100%;
    height: calc(100vh - ${menuHeight}px);
    display: flex;
`;

const StyledPanel = styled(Paper)<{
    isMobile: boolean;
}>`
    width: ${(props) => (props.isMobile ? '100%' : '500px')};
`;

const MainView = () => {
    const isPanelVisible = useAppSelector(selectIsPanelVisible);
    const translations = useAppSelector(selectTranslations);
    const isMobile = useIsMobile();

    const showPanel = !isMobile || (isPanelVisible && isMobile);
    const showCalculator = !isMobile || !(isPanelVisible && isMobile);

    return (
        <StyledView>
            {showCalculator && <Calculator isSingle />}
            {showPanel && (
                <StyledPanel isMobile={isMobile}>
                    <Panels />
                    {isMobile && (
                        <CustomButton title={translations.showCalculator} />
                    )}
                </StyledPanel>
            )}
        </StyledView>
    );
};

export default MainView;
