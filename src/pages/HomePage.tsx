import { Link } from 'react-router-dom';
import { ArrowRight, Gavel, Search, Shield, Star, TrendingUp } from 'lucide-react';
import { getCars } from '@/lib/storage';
import { getAuctions } from '@/lib/storage';
import CarCard from '@/components/cars/CarCard';
import AuctionCard from '@/components/auctions/AuctionCard';
import Button from '@/components/ui/Button';
import VCCPLogo from '@/components/ui/VCCPLogo';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const cars = getCars().slice(0, 3);
  const auctions = getAuctions().filter(a => a.status === 'live').slice(0, 2);

  const stats = [
    { label: 'Cars Listed', value: '2,400+' },
    { label: 'Auctions Completed', value: '840+' },
    { label: 'Registered Collectors', value: '12,000+' },
    { label: 'Total Value Traded', value: '$180M+' },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1208 50%, #0D0D0D 100%)' }}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <VCCPLogo size={100} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-yellow-500" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}>VCCP</span>
          </h1>
          <p className="text-xl md:text-2xl text-yellow-700 mb-3 tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>
            Vintage Car Collectors Portal
          </p>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            The world's premier marketplace for classic and vintage automobiles. Buy, sell, and bid on the finest collector cars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cars">
              <Button size="lg" variant="primary">
                <Search size={18} className="mr-2" /> Browse Cars
              </Button>
            </Link>
            <Link to="/auctions">
              <Button size="lg" variant="outline">
                <Gavel size={18} className="mr-2" /> Live Auctions
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="secondary">
                Sell Your Car
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="animate-bounce text-yellow-700">
            <ArrowRight size={24} className="rotate-90" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-yellow-950 border-y border-yellow-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-yellow-400">{s.value}</p>
                <p className="text-sm text-yellow-700 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      {auctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Live Now</span>
              </div>
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Active Auctions</h2>
            </div>
            <Link to="/auctions" className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1 text-sm">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auctions.map(a => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-yellow-600 text-sm uppercase tracking-wider mb-1">Handpicked Collection</p>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Featured Cars</h2>
          </div>
          <Link to="/cars" className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1 text-sm">
            Browse All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      {/* Why VCCP */}
      <section className="bg-gray-950 border-y border-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12" style={{ fontFamily: 'Georgia, serif' }}>
            Why <span className="text-yellow-500">VCCP</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={32} />, title: 'Verified Listings', desc: 'Every car is reviewed and verified before listing. VIN checks and documentation required.' },
              { icon: <Gavel size={32} />, title: 'Live Auctions', desc: 'Experience the thrill of real-time bidding on the most desirable classic cars.' },
              { icon: <TrendingUp size={32} />, title: 'Market Insights', desc: 'Access historical pricing data and market trends for informed buying and selling decisions.' },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-900 text-yellow-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Makes Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-10" style={{ fontFamily: 'Georgia, serif' }}>Browse by Make</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {['Chevrolet', 'Ford', 'Ferrari', 'Porsche', 'Mercedes-Benz', 'Pontiac'].map(make => (
            <Link
              key={make}
              to={`/cars?make=${encodeURIComponent(make)}`}
              className="bg-gray-900 border border-gray-800 hover:border-yellow-700 rounded-lg p-3 text-center transition-all hover:bg-gray-850 group"
            >
              <div className="text-2xl mb-1">🚗</div>
              <p className="text-xs text-gray-400 group-hover:text-yellow-400 transition-colors">{make}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="mx-4 md:mx-8 my-8 rounded-2xl p-12 text-center"
        style={{ background: 'linear-gradient(135deg, #2D1B00, #1A1208)' }}
      >
        <Star className="inline text-yellow-500 mb-4" size={36} />
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>Ready to List Your Classic?</h2>
        <p className="text-gray-400 mb-6">Join thousands of collectors who trust VCCP to connect them with the right buyer.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/register"><Button size="lg" variant="primary">Create Free Account</Button></Link>
          <Link to="/sell"><Button size="lg" variant="outline">List a Car</Button></Link>
        </div>
      </section>
    </div>
  );
}
