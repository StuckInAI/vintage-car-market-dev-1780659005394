import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CarListing, FilterState } from '@/types';
import { getCars } from '@/lib/storage';
import CarCard from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import { SlidersHorizontal, X } from 'lucide-react';

const DEFAULT_FILTERS: FilterState = {
  make: '', model: '', yearMin: '', yearMax: '',
  priceMin: '', priceMax: '', mileageMax: '',
  condition: '', bodyStyle: '', fuelType: '',
  transmission: '', driveType: '', color: '',
  location: '', sortBy: 'newest',
};

export default function BrowseCarsPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    make: searchParams.get('make') || '',
  });
  const [allCars] = useState<CarListing[]>(() => getCars());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilters(prev => ({ ...prev, make: searchParams.get('make') || '' }));
  }, [searchParams]);

  function applyFilters(cars: CarListing[]): CarListing[] {
    let filtered = [...cars];
    if (filters.make) filtered = filtered.filter(c => c.make === filters.make);
    if (filters.model) filtered = filtered.filter(c => c.model.toLowerCase().includes(filters.model.toLowerCase()));
    if (filters.yearMin) filtered = filtered.filter(c => c.year >= parseInt(filters.yearMin));
    if (filters.yearMax) filtered = filtered.filter(c => c.year <= parseInt(filters.yearMax));
    if (filters.priceMin) filtered = filtered.filter(c => c.price >= parseInt(filters.priceMin));
    if (filters.priceMax) filtered = filtered.filter(c => c.price <= parseInt(filters.priceMax));
    if (filters.mileageMax) filtered = filtered.filter(c => c.mileage <= parseInt(filters.mileageMax));
    if (filters.condition) filtered = filtered.filter(c => c.condition === filters.condition);
    if (filters.bodyStyle) filtered = filtered.filter(c => c.bodyStyle === filters.bodyStyle);
    if (filters.fuelType) filtered = filtered.filter(c => c.fuelType === filters.fuelType);
    if (filters.transmission) filtered = filtered.filter(c => c.transmission === filters.transmission);
    if (filters.driveType) filtered = filtered.filter(c => c.driveType === filters.driveType);
    if (filters.color) filtered = filtered.filter(c => c.color === filters.color);
    if (filters.location) filtered = filtered.filter(c => c.location.toLowerCase().includes(filters.location.toLowerCase()));

    switch (filters.sortBy) {
      case 'newest': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'oldest': filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); break;
      case 'price_asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price_desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'year_asc': filtered.sort((a, b) => a.year - b.year); break;
      case 'year_desc': filtered.sort((a, b) => b.year - a.year); break;
      case 'mileage_asc': filtered.sort((a, b) => a.mileage - b.mileage); break;
    }
    return filtered;
  }

  const filteredCars = applyFilters(allCars);

  // Group by make
  const makeGroups: Record<string, CarListing[]> = {};
  filteredCars.forEach(car => {
    if (!makeGroups[car.make]) makeGroups[car.make] = [];
    makeGroups[car.make].push(car);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>Browse Classic Cars</h1>
        <p className="text-gray-500">Discover the finest vintage automobiles from around the world</p>
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-yellow-400 border border-yellow-700 px-4 py-2 rounded text-sm"
        >
          {showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0`}>
          <CarFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            totalResults={filteredCars.length}
          />
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No cars match your criteria</p>
              <p className="text-gray-600 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : filters.make || filters.model || filters.yearMin || filters.yearMax ? (
            // Flat view when filtering
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCars.map(car => <CarCard key={car.id} car={car} />)}
            </div>
          ) : (
            // Grouped by make
            <div className="space-y-10">
              {Object.entries(makeGroups).sort(([a], [b]) => a.localeCompare(b)).map(([make, cars]) => (
                <div key={make}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold text-yellow-500">{make}</h2>
                    <span className="text-gray-600 text-sm">{cars.length} listing{cars.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cars.map(car => <CarCard key={car.id} car={car} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
