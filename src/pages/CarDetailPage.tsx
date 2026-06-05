import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Gauge, Calendar, Zap, Shield, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { CarListing } from '@/types';
import { getCars } from '@/lib/storage';
import { formatPrice, formatMileage } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarListing | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const cars = getCars();
    const found = cars.find(c => c.id === id);
    setCar(found || null);
  }, [id]);

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400">Car not found.</p>
        <Link to="/cars" className="text-yellow-500 hover:text-yellow-400 text-sm mt-2 inline-block">← Back to listings</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Year', value: car.year },
    { label: 'Make', value: car.make },
    { label: 'Model', value: car.model },
    { label: 'Mileage', value: formatMileage(car.mileage) },
    { label: 'Condition', value: car.condition },
    { label: 'Body Style', value: car.bodyStyle },
    { label: 'Engine', value: car.engine },
    { label: 'Horsepower', value: `${car.horsepower} hp` },
    { label: 'Transmission', value: car.transmission },
    { label: 'Drive Type', value: car.driveType },
    { label: 'Fuel Type', value: car.fuelType },
    { label: 'Exterior Color', value: car.color },
    { label: 'Interior Color', value: car.interiorColor },
    { label: 'Doors', value: car.doors },
    { label: 'VIN', value: car.vin },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/cars" className="inline-flex items-center gap-1 text-yellow-500 hover:text-yellow-400 text-sm mb-6">
        <ChevronLeft size={16} /> Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images + Specs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
            {car.images && car.images.length > 0 ? (
              <img src={car.images[imgIdx]} alt={car.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-6xl">🚗</div>
            )}
            {car.images && car.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx((imgIdx - 1 + car.images.length) % car.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-2">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => setImgIdx((imgIdx + 1) % car.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-2">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Specs Grid */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-yellow-500 font-semibold text-lg mb-4">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specs.map(s => (
                <div key={s.label} className="border-b border-gray-800 pb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
                  <p className="text-gray-200 font-medium text-sm mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-yellow-500 font-semibold text-lg mb-4">Notable Features</h2>
              <div className="flex flex-wrap gap-2">
                {car.features.map(f => (
                  <span key={f} className="flex items-center gap-1 bg-yellow-950 border border-yellow-900 text-yellow-400 text-xs px-3 py-1 rounded-full">
                    <Shield size={11} /> {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-yellow-500 font-semibold text-lg mb-3">Description</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{car.description}</p>
          </div>
        </div>

        {/* Right: Price + Contact */}
        <div className="space-y-4">
          <div className="bg-gray-900 border border-yellow-800 rounded-xl p-6 sticky top-20">
            <h1 className="text-white font-bold text-xl mb-2 leading-snug">{car.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="gold">{car.condition}</Badge>
              <Badge variant="gray">{car.year}</Badge>
            </div>
            <p className="text-yellow-400 text-4xl font-bold mb-2">{formatPrice(car.price)}</p>
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-6">
              <MapPin size={14} />
              <span>{car.location}</span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Mileage</span>
                <span className="text-gray-300 flex items-center gap-1"><Gauge size={12} /> {formatMileage(car.mileage)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Engine</span>
                <span className="text-gray-300 flex items-center gap-1"><Zap size={12} /> {car.engine}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Year</span>
                <span className="text-gray-300 flex items-center gap-1"><Calendar size={12} /> {car.year}</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 mb-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-full bg-yellow-900 flex items-center justify-center">
                  <User size={14} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">{car.sellerName}</p>
                  <p className="text-xs text-gray-600">Verified Seller</p>
                </div>
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth className="mb-2">
              Contact Seller
            </Button>
            <Button variant="outline" size="lg" fullWidth>
              Save to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
