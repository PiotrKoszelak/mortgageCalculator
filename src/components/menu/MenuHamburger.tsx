import { type MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeMenu, selectTranslations } from '../../store/globalSlice';

import { MenuList } from '../../utils/constants';

import { Button, Menu, MenuItem } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const MenuHamburger = () => {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (value: MenuList) => {
        dispatch(changeMenu(value));
        handleClose();
    };

    return (
        <div>
            <Button
                id="mobile-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpen}
            >
                <MenuOutlinedIcon />
            </Button>
            <Menu
                id="mobile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'mobile-button',
                }}
            >
                <MenuItem onClick={() => handleChange(MenuList.about)}>
                    {translations.about}
                </MenuItem>
                <MenuItem onClick={() => handleChange(MenuList.contact)}>
                    {translations.contact}
                </MenuItem>
            </Menu>
        </div>
    );
};

export default MenuHamburger;
