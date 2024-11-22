import { MenuList } from './utils/constants';
import MainView from './views/MainView';

export const routesConfig = [
    {
        path: '/',
        element: <MainView />,
        errorElement: <MainView />,
    },
    {
        path: `/${MenuList.contact}`,
        element: <MainView />,
    },
    {
        path: `/${MenuList.calculator}`,
        element: <MainView />,
    },
];
