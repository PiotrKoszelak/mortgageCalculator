import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsSidebarOpen, toggleSidebar } from '../../store/globalSlice';

import { contentThreshold, menuHeight } from '../../utils/constants';
import useWindowDimensions from '../../utils/hooks';

import { Divider, Drawer, IconButton, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface DrawerProps {
    isDrawerFloating: boolean;
    isSidebarOpen: boolean;
}

const StyledDrawer = styled(Drawer)<DrawerProps>`
    width: ${(props) =>
        props.isDrawerFloating
            ? props.isSidebarOpen
                ? '80%'
                : '40px'
            : '500px'};
    .MuiDrawer-paper {
        width: ${(props) =>
            props.isDrawerFloating
                ? props.isSidebarOpen
                    ? '80%'
                    : '40px'
                : '500px'};
        box-sizing: border-box;
        top: ${menuHeight}px;
    }
`;

const StyledIconButton = styled(IconButton)<{ isSidebarOpen: boolean }>`
    position: ${(props) => (props.isSidebarOpen ? 'inherit' : 'absolute')};
    right: 0;
    top: ${menuHeight + 10}px;
    width: 40px;
    height: 40px;
`;

const DrawerHeader = styled('div')`
    display: flex;
    alignitems: center;
    padding: theme.spacing(0, 1);
    justify-content: flex-start;
`;

const CustomIconButton = () => {
    const dispatch = useAppDispatch();
    const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

    return (
        <StyledIconButton
            onClick={() => dispatch(toggleSidebar())}
            isSidebarOpen={isSidebarOpen}
        >
            {isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </StyledIconButton>
    );
};

const Sidebar = () => {
    const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

    const { width } = useWindowDimensions();

    const isDrawerFloating = width <= contentThreshold;
    const drawerVariant = isDrawerFloating ? 'temporary' : 'persistent';

    return (
        <>
            {isDrawerFloating && !isSidebarOpen && <CustomIconButton />}
            <StyledDrawer
                anchor="right"
                open={isDrawerFloating ? isSidebarOpen : true}
                variant={drawerVariant}
                isDrawerFloating={isDrawerFloating}
                isSidebarOpen={isSidebarOpen}
                hideBackdrop
            >
                {isDrawerFloating && (
                    <DrawerHeader>
                        <CustomIconButton />
                    </DrawerHeader>
                )}
                <Divider />
            </StyledDrawer>
        </>
    );
};

export default Sidebar;
