import { screen } from '@testing-library/react';

import { renderWithProviders } from '../test-utils';

import { LanguageList } from '../../utils/constants';
import { appPlaceholder } from '../../utils/i18n';

import Placeholder from '../../components/Placeholder';

test('Displays proper text', () => {
    renderWithProviders(<Placeholder />);

    expect(
        screen.getByText(appPlaceholder[LanguageList.en])
    ).toBeInTheDocument();
});
