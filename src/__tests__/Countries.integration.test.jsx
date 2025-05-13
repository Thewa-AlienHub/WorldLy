import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Countries from '../components/countries/Countries';
import '@testing-library/jest-dom';

// Mocks for child components
jest.mock('../components/countries/CountryItem', () => ({ country, isFavorite, toggleFavorite }) => (
  <div data-testid="country-item">
    {country.name.common}
    <button onClick={() => toggleFavorite(country.cca3)}>Favorite</button>
  </div>
));

jest.mock('../components/countries/SearchBox.jsx', () => ({ search, setSearch }) => (
  <input
    data-testid="search-box"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
));

jest.mock('../components/countries/FilterOptions', () => ({ region, setRegion, language, setLanguage, availableLanguages }) => (
  <div data-testid="filters">
    <select data-testid="region-filter" onChange={(e) => setRegion(e.target.value)}>
      <option value="">All</option>
      <option value="Europe">Europe</option>
      <option value="Asia">Asia</option>
    </select>
    <select data-testid="language-filter" onChange={(e) => setLanguage(e.target.value)}>
      <option value="">All</option>
      {availableLanguages.map(lang => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  </div>
));

jest.mock('../components/layout/Spinner', () => () => <div data-testid="spinner">Loading...</div>);
jest.mock('../components/layout/ScrollToTopButton', () => () => <div data-testid="scroll-top">Top</div>);

// Sample mock country data
const mockCountries = [
  {
    name: { common: 'France' },
    region: 'Europe',
    languages: { fra: 'French' },
    cca3: 'FRA',
  },
  {
    name: { common: 'Japan' },
    region: 'Asia',
    languages: { jpn: 'Japanese' },
    cca3: 'JPN',
  },
  {
    name: { common: 'Brazil' },
    region: 'Americas',
    languages: { por: 'Portuguese' },
    cca3: 'BRA',
  },
];

describe('Integration: Countries Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  test('fetches and displays countries, filters by search, region, and language', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCountries));

    render(<Countries showAlert={jest.fn()} />);

    // Initially shows loading
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for data load
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    // Should show all countries
    expect(screen.getAllByTestId('country-item')).toHaveLength(3);

    // --- Test search ---
    fireEvent.change(screen.getByTestId('search-box'), {
      target: { value: 'France' },
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('country-item')).toHaveLength(1);
      expect(screen.getByText('France')).toBeInTheDocument();
    });

    // Clear search
    fireEvent.change(screen.getByTestId('search-box'), {
      target: { value: '' },
    });

    // --- Test region filter ---
    fireEvent.change(screen.getByTestId('region-filter'), {
      target: { value: 'Asia' },
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('country-item')).toHaveLength(1);
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });

    // --- Test language filter ---
    fireEvent.change(screen.getByTestId('region-filter'), {
      target: { value: '' }, // Reset region
    });

    fireEvent.change(screen.getByTestId('language-filter'), {
      target: { value: 'Portuguese' },
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('country-item')).toHaveLength(1);
      expect(screen.getByText('Brazil')).toBeInTheDocument();
    });
  });

  test('can mark a country as favorite and save to localStorage', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCountries));

    render(<Countries showAlert={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('country-item')).toHaveLength(3);
    });

    // Click favorite button for France
    const franceFavoriteBtn = screen.getAllByText('Favorite')[0];
    fireEvent.click(franceFavoriteBtn);

    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    expect(storedFavorites).toContain('FRA');
  });

  test('shows message when no countries match criteria', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCountries));
    render(<Countries showAlert={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('country-item')).toHaveLength(3);
    });

    fireEvent.change(screen.getByTestId('search-box'), {
      target: { value: 'Neverland' },
    });

    await waitFor(() => {
      expect(screen.getByText('No countries found matching your criteria.')).toBeInTheDocument();
    });
  });
});
