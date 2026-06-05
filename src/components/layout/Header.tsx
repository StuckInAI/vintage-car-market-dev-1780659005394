import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import VCCPLogo from '@/components/ui/VCCPLogo';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/cars', label: 'Browse Cars' },
    { to: '/auctions', label: 'Live Auctions' },
    { to: '/sell', label: 'Sell Your Car' },
  ];

  function isActive(path: string): boolean {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  return (
    <header className="bg-black border-b border-yellow-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <VCCPLogo size={40} />
          <div>
            <div className="text-xl font-bold text-yellow-500 leading-none tracking-widest">VCCP</div>
            <div className="text-xs text-yellow-700 tracking-wider">VINTAGE CAR COLLECTORS PORTAL</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx(
                'px-4 py-2 text-sm font-medium tracking-wide transition-colors',
                isActive(link.to)
                  ? 'text-yellow-400 border-b-2 border-yellow-500'
                  : 'text-gray-300 hover:text-yellow-400'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-700 flex items-center justify-center">
                  <User size={14} className="text-yellow-100" />
                </div>
                <span className="text-sm">{user.name}</span>
                <ChevronDown size={14} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-yellow-800 rounded shadow-xl z-50">
                  <div className="px-4 py-2 border-b border-yellow-900">
                    <p className="text-xs text-gray-400">{user.email}</p>
                    <p className="text-xs text-yellow-600 capitalize">{user.role}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-300 hover:text-yellow-400 transition-colors">Sign In</Link>
              <Link to="/register" className="text-sm bg-yellow-600 text-black px-4 py-1.5 rounded font-semibold hover:bg-yellow-500 transition-colors">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-yellow-900">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'block px-4 py-3 text-sm border-b border-gray-900',
                isActive(link.to) ? 'text-yellow-400' : 'text-gray-300'
              )}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-gray-300 border-b border-gray-900">Dashboard</Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-sm text-red-400">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-gray-300 border-b border-gray-900">Sign In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-yellow-400">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
