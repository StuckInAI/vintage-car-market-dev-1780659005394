import { Link } from 'react-router-dom';
import VCCPLogo from '@/components/ui/VCCPLogo';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <VCCPLogo size={36} />
              <div>
                <div className="text-lg font-bold text-yellow-500 tracking-widest">VCCP</div>
                <div className="text-xs text-yellow-800 tracking-wider">VINTAGE CAR COLLECTORS PORTAL</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">The premier marketplace for vintage and classic automobile enthusiasts.</p>
          </div>
          <div>
            <h4 className="text-yellow-600 font-semibold mb-3 uppercase tracking-wider text-sm">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link to="/cars" className="text-gray-500 hover:text-yellow-400 text-sm">Browse Cars</Link></li>
              <li><Link to="/sell" className="text-gray-500 hover:text-yellow-400 text-sm">Sell Your Car</Link></li>
              <li><Link to="/auctions" className="text-gray-500 hover:text-yellow-400 text-sm">Live Auctions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-yellow-600 font-semibold mb-3 uppercase tracking-wider text-sm">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-500 hover:text-yellow-400 text-sm">Sign In</Link></li>
              <li><Link to="/register" className="text-gray-500 hover:text-yellow-400 text-sm">Register</Link></li>
              <li><Link to="/dashboard" className="text-gray-500 hover:text-yellow-400 text-sm">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-yellow-600 font-semibold mb-3 uppercase tracking-wider text-sm">About</h4>
            <p className="text-gray-500 text-sm">VCCP connects collectors, enthusiasts, and sellers in the world of vintage automobiles since 2024.</p>
          </div>
        </div>
        <div className="border-t border-yellow-950 mt-8 pt-6 text-center text-gray-600 text-xs">
          &copy; 2024 VCCP - Vintage Car Collectors Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
