import { useAppSelector } from '../store/hooks';
import { selectIsPanelVisible } from '../store/globalSlice';

import { useIsMobile } from '../hooks/common';
import { useRoute, useSeo } from '../hooks/route';
import { menuHeight, MenuList } from '../utils/constants';

import { Box, Paper, styled } from '@mui/material';
import Calculator from '../components/calculator/Calculator';
import { OpenCalculatorButton } from '../components/layout/MainViewComponents';
import Panels from '../components/layout/panels/Panels';
import MenuToolbar from '../components/menu/MenuToolbar';
import SeoWrapper from '../components/layout/SEO';

interface MainView {
    view: MenuList;
}

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

const MainView = (props: MainView) => {
    const { view } = props;
    useRoute(view);
    const seoParams = useSeo(view);
    const isPanelVisible = useAppSelector(selectIsPanelVisible);
    const isMobile = useIsMobile();

    const showPanel = !isMobile || (isPanelVisible && isMobile);
    const showCalculator = !isMobile || !(isPanelVisible && isMobile);

    return (
        <>
            <SeoWrapper {...seoParams} />
            <MenuToolbar />
            <StyledView>
                {showCalculator && <Calculator isSingle />}
                {showPanel && (
                    <StyledPanel isMobile={isMobile}>
                        <Panels />
                        {isMobile && <OpenCalculatorButton />}
                    </StyledPanel>
                )}
            </StyledView>
        </>
    );
};

export default MainView;
