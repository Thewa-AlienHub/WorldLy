import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Countries from '../components/countries/Countries';
import { act } from 'react-dom/test-utils';

// Mock the dependencies
jest.mock('../components/countries/CountryItem', () => ({ country, toggleFavorite, isFavorite }) => (
  <div>
    <span>{country.name.common}</span>
    <button onClick={() => toggleFavorite(country.cca3)}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  </div>
));

jest.mock('../components/countries/SearchBox', () => ({ search, setSearch }) => (
  <input value={search} onChange={(e) => setSearch(e.target.value)} />
));

jest.mock('../components/countries/FilterOptions', () => ({ setRegion, setLanguage, availableLanguages }) => (
  <div>
    <button onClick={() => setRegion('Asia')}>Asia</button>
    <button onClick={() => setLanguage('English')}>English</button>
  </div>
));

jest.mock('../components/layout/Spinner', () => () => <div>Loading...</div>);

jest.mock('../components/layout/ScrollToTopButton', () => () => <div>ScrollToTopButton</div>);

// Mock the showAlert function
const showAlert = jest.fn();

describe('Countries Component', () => {
  it('should render loading spinner initially', () => {
    render(<Countries showAlert={showAlert} />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('should display countries once data is fetched', async () => {
    const countriesMock = [
      { cca3: 'USA', name: { common: 'United States' } },
      { cca3: 'CAN', name: { common: 'Canada' } },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(countriesMock),
    });

    render(<Countries showAlert={showAlert} />);

    await waitFor(() => screen.getByText('United States'));
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('should filter countries based on search input', async () => {
    const countriesMock = [
      { cca3: 'USA', name: { common: 'United States' } },
      { cca3: 'CAN', name: { common: 'Canada' } },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(countriesMock),
    });

    render(<Countries showAlert={showAlert} />);

    await waitFor(() => screen.getByText('United States'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Canada' } });

    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.queryByText('United States')).toBeNull();
  });

  it('should filter countries based on selected region', async () => {
    const countriesMock = [
      { cca3: 'USA', name: { common: 'United States' }, region: 'Americas' },
      { cca3: 'CAN', name: { common: 'Canada' }, region: 'Americas' },
      { cca3: 'JPN', name: { common: 'Japan' }, region: 'Asia' },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(countriesMock),
    });

    render(<Countries showAlert={showAlert} />);

    await waitFor(() => screen.getByText('United States'));

    fireEvent.click(screen.getByText('Asia'));

    expect(screen.queryByText('United States')).toBeNull();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('should add and remove favorites', async () => {
    const countriesMock = [
      { cca3: 'USA', name: { common: 'United States' } },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(countriesMock),
    });

    render(<Countries showAlert={showAlert} />);

    await waitFor(() => screen.getByText('United States'));

    const favoriteButton = screen.getByText('Favorite');
    fireEvent.click(favoriteButton);

    expect(favoriteButton.textContent).toBe('Unfavorite');
  });

  it('should show error message when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    render(<Countries showAlert={showAlert} />);

    await waitFor(() => expect(showAlert).toHaveBeenCalledWith('Error fetching countries', 'danger'));
  });
});
