import { MenuList } from './utils/constants';
import MainView from './views/MainView';

export const routesConfig = [
    {
        path: '/',
        element: <MainView view={MenuList.about} />,
        errorElement: <MainView view={MenuList.about} />,
    },
    {
        path: `/${MenuList.contact}`,
        element: <MainView view={MenuList.contact} />,
    },
    {
        path: `/${MenuList.calculator}`,
        element: <MainView view={MenuList.calculator} />,
    },
];
