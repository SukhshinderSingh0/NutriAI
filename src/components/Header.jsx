import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Meal Plans', to: '/meal-plans' },
        { label: 'History', to: '/history' },
        { label: 'Profile', to: '/profile' },
      ]
    : [
        { label: 'Home', to: '/' },
      ];

  return (
    <header className="glass sticky top-0 z-50">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Branding */}
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="w-7 h-7 text-emerald-500 transition-transform duration-300 group-hover:rotate-12" />
            <span className="gradient-text text-xl font-bold tracking-tight">
              NutriPlan AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Auth Actions Desktop */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    {user?.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-gray-200/50">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="my-2 border-t border-gray-100"></div>

            {/* Auth Actions Mobile */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout ({user?.email})
              </button>
            ) : (
              <div className="flex flex-col gap-2 px-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 text-center border border-gray-200"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 text-center"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
