import { useEffect } from 'react';

import { useAppDispatch } from './store/hooks';
import { LanguageList } from './utils/constants';
import { changeLanguage } from './store/globalSlice';

import Placeholder from './components/Placeholder';

import './App.css';

interface AppProps {
    language: LanguageList;
}

function App(props: AppProps) {
    const dispatch = useAppDispatch();

    const { language } = props;

    useEffect(() => {
        dispatch(changeLanguage(language));
    }, [dispatch, language]);

    return (
        <>
            <Placeholder />
        </>
    );
}

export default App;
