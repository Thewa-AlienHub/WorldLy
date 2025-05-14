import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Countries from '../components/countries/Countries';
import { AuthContext } from '../context/AuthContext';
import '@testing-library/jest-dom';

// Mocks
jest.mock('../components/countries/FilterOptions', () => ({
  __esModule: true,
  default: ({ region, setRegion, language, setLanguage, availableLanguages, search, setSearch }) => (
    <div>
      <input
        data-testid="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select data-testid="region-filter" onChange={(e) => setRegion(e.target.value)}>
        <option value="">All</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
      </select>
      <select data-testid="language-filter" onChange={(e) => setLanguage(e.target.value)}>
        <option value="">All</option>
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  )
}));

jest.mock('../components/layout/Spinner', () => () => <div data-testid="spinner">Loading...</div>);
jest.mock('../components/layout/ScrollToTopButton', () => () => <div data-testid="scroll-top">Top</div>);

// Sample country data
const mockCountries = [
  {
    name: { common: 'France' },
    region: 'Europe',
    languages: { fra: 'French' },
    cca3: 'FRA',
    capital: ['Paris'],
    population: 67000000,
    flags: { svg: 'https://flagcdn.com/fr.svg' },
  },
  {
    name: { common: 'Japan' },
    region: 'Asia',
    languages: { jpn: 'Japanese' },
    cca3: 'JPN',
    capital: ['Tokyo'],
    population: 126000000,
    flags: { svg: 'https://flagcdn.com/jp.svg' },
  },
  {
    name: { common: 'Brazil' },
    region: 'Americas',
    languages: { por: 'Portuguese' },
    cca3: 'BRA',
    capital: ['Brasília'],
    population: 211000000,
    flags: { svg: 'https://flagcdn.com/br.svg' },
  }
];

// Context helper
const renderWithContext = (ui, providerValue = {}) => {
  const defaultContext = {
    user: { id: 'test-user' },
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  };

  return render(
    <AuthContext.Provider value={{ ...defaultContext, ...providerValue }}>
      {ui}
    </AuthContext.Provider>
  );
};

describe('Integration: Countries Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  test('fetches and filters countries', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCountries));

    renderWithContext(<Countries showAlert={jest.fn()} showLoginModal={jest.fn()} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    // All countries initially
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();

    // Search filter
    fireEvent.change(screen.getByTestId('search-box'), {
      target: { value: 'France' },
    });

    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });

    // Reset search
    fireEvent.change(screen.getByTestId('search-box'), { target: { value: '' } });

    // Region filter
    fireEvent.change(screen.getByTestId('region-filter'), { target: { value: 'Asia' } });

    await waitFor(() => {
      expect(screen.getByText('Japan')).toBeInTheDocument();
      expect(screen.queryByText('France')).not.toBeInTheDocument();
    });

    // Reset and filter by language
    fireEvent.change(screen.getByTestId('region-filter'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('language-filter'), { target: { value: 'Portuguese' } });

    await waitFor(() => {
      expect(screen.getByText('Brazil')).toBeInTheDocument();
    });
  });

  test('shows empty state message', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCountries));
    renderWithContext(<Countries showAlert={jest.fn()} showLoginModal={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId('search-box'), {
      target: { value: 'Neverland' },
    });

    await waitFor(() => {
      expect(screen.getByText(/No Countries Found/i)).toBeInTheDocument();
    });
  });

  test('clicking favorite button when not logged in triggers login modal', async () => {
  const mockShowLoginModal = jest.fn();

  fetch.mockResponseOnce(JSON.stringify(mockCountries));

  renderWithContext(
    <Countries showAlert={jest.fn()} showLoginModal={mockShowLoginModal} />,
    {
      user: null, // simulate not logged in
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    }
  );

  await waitFor(() => {
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  // Click the favorite button (top-right heart icon)
  const favoriteButtons = screen.getAllByRole('button', { name: /add to favorites/i });
  fireEvent.click(favoriteButtons[0]);

  expect(mockShowLoginModal).toHaveBeenCalled();
});
 
});