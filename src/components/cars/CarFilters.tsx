import { FilterState } from '@/types';
import { MAKES, COLORS } from '@/lib/data';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Search, RotateCcw } from 'lucide-react';

type CarFiltersProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
};

const YEARS = Array.from({ length: 80 }, (_, i) => 2004 - i);
const BODY_STYLES = ['Sedan', 'Coupe', 'Convertible', 'Roadster', 'Wagon', 'SUV', 'Truck', 'Van', 'Other'];
const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other'];
const TRANSMISSIONS = ['Manual', 'Automatic', 'Semi-Automatic'];
const DRIVE_TYPES = ['RWD', 'FWD', 'AWD', '4WD'];
const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Project', 'Restored'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'year_asc', label: 'Year: Oldest First' },
  { value: 'year_desc', label: 'Year: Newest First' },
  { value: 'mileage_asc', label: 'Mileage: Low to High' },
];

export default function CarFilters({ filters, onChange, onReset, totalResults }: CarFiltersProps) {
  function handleChange(field: keyof FilterState, value: string) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-yellow-500 font-semibold">Filters</h3>
        <span className="text-xs text-gray-500">{totalResults} results</span>
      </div>

      <div>
        <Select label="Sort By" value={filters.sortBy} onChange={(e: any) => handleChange('sortBy', e.target.value)}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
      </div>

      <div className="border-t border-gray-800 pt-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Make & Model</p>
        <div className="space-y-2">
          <Select value={filters.make} onChange={(e: any) => handleChange('make', e.target.value)}>
            <option value="">All Makes</option>
            {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
          </Select>
          <Input
            placeholder="Model (e.g. Mustang)"
            value={filters.model}
            onChange={(e: any) => handleChange('model', e.target.value)}
          />
        </div>
      </div>

      <div className="border-t border-gray-800 pt-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Year Range</p>
        <div className="grid grid-cols-2 gap-2">
          <Select value={filters.yearMin} onChange={(e: any) => handleChange('yearMin', e.target.value)}>
            <option value="">Min Year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </Select>
          <Select value={filters.yearMax} onChange={(e: any) => handleChange('yearMax', e.target.value)}>
            <option value="">Max Year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </Select>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Price Range</p>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Min $" type="number" value={filters.priceMin} onChange={(e: any) => handleChange('priceMin', e.target.value)} />
          <Input placeholder="Max $" type="number" value={filters.priceMax} onChange={(e: any) => handleChange('priceMax', e.target.value)} />
        </div>
      </div>

      <div className="border-t border-gray-800 pt-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Max Mileage</p>
        <Input placeholder="e.g. 50000" type="number" value={filters.mileageMax} onChange={(e: any) => handleChange('mileageMax', e.target.value)} />
      </div>

      <div className="border-t border-gray-800 pt-3 space-y-2">
        <Select label="Condition" value={filters.condition} onChange={(e: any) => handleChange('condition', e.target.value)}>
          <option value="">Any Condition</option>
          {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select label="Body Style" value={filters.bodyStyle} onChange={(e: any) => handleChange('bodyStyle', e.target.value)}>
          <option value="">Any Body Style</option>
          {BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}
        </Select>
        <Select label="Fuel Type" value={filters.fuelType} onChange={(e: any) => handleChange('fuelType', e.target.value)}>
          <option value="">Any Fuel Type</option>
          {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
        </Select>
        <Select label="Transmission" value={filters.transmission} onChange={(e: any) => handleChange('transmission', e.target.value)}>
          <option value="">Any Transmission</option>
          {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
        </Select>
        <Select label="Drive Type" value={filters.driveType} onChange={(e: any) => handleChange('driveType', e.target.value)}>
          <option value="">Any Drive Type</option>
          {DRIVE_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
        </Select>
        <Select label="Color" value={filters.color} onChange={(e: any) => handleChange('color', e.target.value)}>
          <option value="">Any Color</option>
          {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Input label="Location" placeholder="City, State" value={filters.location} onChange={(e: any) => handleChange('location', e.target.value)} />
      </div>

      <div className="pt-2">
        <Button variant="outline" fullWidth onClick={onReset} size="sm">
          <RotateCcw size={12} className="mr-1" /> Reset Filters
        </Button>
      </div>
    </div>
  );
}
