// __mocks__/react-router-dom.js

// Simple manual mock for react-router-dom
module.exports = {
  // Mock useSearchParams hook
  useSearchParams: jest.fn(() => [
    {
      get: jest.fn(param => null)
    },
    jest.fn() // setSearchParams
  ]),
  
  // Mock BrowserRouter component
  BrowserRouter: ({ children }) => children,
  
  // Add any other components/functions from react-router-dom that your code uses
  Routes: ({ children }) => children,
  Route: ({ children }) => children,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  NavLink: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useParams: () => ({}),
  Navigate: ({ to }) => <div>Navigate to: {to}</div>
};