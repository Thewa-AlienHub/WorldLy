import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Countries from '../components/countries/Countries';
import { AuthContext } from '../context/AuthContext';

// Mock child components
jest.mock('../components/layout/Spinner', () => () => <div>Loading...</div>);
jest.mock('../components/layout/ScrollToTopButton', () => () => <div>ScrollToTopButton</div>);
jest.mock('../components/countries/FilterOptions', () => ({
  __esModule: true,
  default: ({ setRegion, setLanguage, availableLanguages, search, setSearch }) => (
    <div>
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        role="textbox"
      />
      <button data-testid="filter-region-asia" onClick={() => setRegion('Asia')}>
        Asia
      </button>
      <button data-testid="filter-language-english" onClick={() => setLanguage('English')}>
        English
      </button>
    </div>
  ),
}));

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

describe('Countries Component', () => {
  let providerProps;
  let showAlert;

  beforeEach(() => {
    providerProps = {
      user: { id: '123' },
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    };
    showAlert = jest.fn();
  });

  it('displays loading initially', () => {
    renderWithContext(<Countries showAlert={showAlert} showLoginModal={jest.fn()} />, {
      providerProps,
    });
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('renders countries after fetch', async () => {
    const countriesMock = [
      { cca3: 'USA', name: { common: 'United States' }, region: 'Americas', population: 100000, capital: ['Washington'], flags: { svg: 'flag.svg' } },
      { cca3: 'CAN', name: { common: 'Canada' }, region: 'Americas', population: 50000, capital: ['Ottawa'], flags: { svg: 'flag.svg' } },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => countriesMock,
    });

    renderWithContext(<Countries showAlert={showAlert} showLoginModal={jest.fn()} />, {
      providerProps,
    });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });

  it('filters countries via search', async () => {
    const countriesMock = [
      { cca3: 'USA', name: { common: 'United States' }, region: 'Americas', population: 100000, capital: ['Washington'], flags: { svg: 'flag.svg' } },
      { cca3: 'CAN', name: { common: 'Canada' }, region: 'Americas', population: 50000, capital: ['Ottawa'], flags: { svg: 'flag.svg' } },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => countriesMock,
    });

    renderWithContext(<Countries showAlert={showAlert} showLoginModal={jest.fn()} />, {
      providerProps,
    });

    await waitFor(() => screen.getByText('Canada'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Canada' } });

    expect(screen.queryByText('United States')).not.toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

 it('filters by region', async () => {
  const countriesMock = [
    { cca3: 'JPN', name: { common: 'Japan' }, region: 'Asia', population: 100000, capital: ['Tokyo'], flags: { svg: 'flag.svg' } },
    { cca3: 'USA', name: { common: 'United States' }, region: 'Americas', population: 100000, capital: ['Washington'], flags: { svg: 'flag.svg' } },
  ];

  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => countriesMock,
  });

  renderWithContext(<Countries showAlert={showAlert} showLoginModal={jest.fn()} />, {
    providerProps,
  });

  await waitFor(() => screen.getByText('Japan'));

  fireEvent.click(screen.getByTestId('filter-region-asia'));

  expect(screen.getByText('Japan')).toBeInTheDocument();
  expect(screen.queryByText('United States')).not.toBeInTheDocument();
});
 

  it('handles fetch error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API failed'));

    renderWithContext(<Countries showAlert={showAlert} showLoginModal={jest.fn()} />, {
      providerProps,
    });

    await waitFor(() =>
      expect(showAlert).toHaveBeenCalledWith('Error fetching countries', 'danger')
    );

    consoleSpy.mockRestore();
  });
});
 