import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';

import LanguageToggle from '../../../components/menu/Lanuage';

test('Displays all elements', () => {
    renderWithProviders(<LanguageToggle />);

    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText('Pl')).toBeInTheDocument();
    expect(screen.getByText('En')).toBeInTheDocument();
});

test('Stores proper default language', () => {
    renderWithProviders(<LanguageToggle />);

    expect(screen.getByText('En')).toHaveClass('Mui-selected');
    expect(screen.getByText('Pl')).not.toHaveClass('Mui-selected');
});

test('Updates language properly', async () => {
    renderWithProviders(<LanguageToggle />);

    expect(screen.getByText('En')).toHaveClass('Mui-selected');
    expect(screen.getByText('Pl')).not.toHaveClass('Mui-selected');

    const plButton = screen.getByText('Pl');
    userEvent.click(plButton);

    await waitFor(() => {
        expect(screen.getByText('En')).not.toHaveClass('Mui-selected');
        expect(screen.getByText('Pl')).toHaveClass('Mui-selected');
    });
});
