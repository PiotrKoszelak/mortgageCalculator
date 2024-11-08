import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsSidebarOpen, toggleSidebar } from '../../store/globalSlice';

import { menuHeight } from '../../utils/constants';

import { Divider, Drawer, IconButton, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { appColors } from '../../utils/theme';

interface SidebarProps {
    children: JSX.Element;
}

interface DrawerProps {
    isSidebarOpen: boolean;
}

const StyledDrawer = styled(Drawer)<DrawerProps>`
    width: ${(props) => (props.isSidebarOpen ? '80%' : '40px')};
    background-color: ${appColors.lightGrey};
    .MuiDrawer-paper {
        width: ${(props) => (props.isSidebarOpen ? '80%' : '40px')};
        box-sizing: border-box;
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

const Sidebar = (props: SidebarProps) => {
    const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

    return (
        <>
            {!isSidebarOpen && <CustomIconButton />}
            <StyledDrawer
                anchor="right"
                open={isSidebarOpen}
                variant="persistent"
                isSidebarOpen={isSidebarOpen}
                hideBackdrop
            >
                <DrawerHeader>
                    <CustomIconButton />
                </DrawerHeader>

                <Divider />
                {props.children}
            </StyledDrawer>
        </>
    );
};

export default Sidebar;
