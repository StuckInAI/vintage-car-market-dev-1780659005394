import { Link } from 'react-router-dom';
import { MapPin, Gauge, Calendar, Zap } from 'lucide-react';
import { CarListing } from '@/types';
import { formatPrice, formatMileage } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import clsx from 'clsx';

type CarCardProps = { car: CarListing };

export default function CarCard({ car }: CarCardProps) {
  const conditionVariant = {
    'Excellent': 'green',
    'Restored': 'gold',
    'Good': 'blue',
    'Fair': 'gray',
    'Project': 'red',
  } as const;

  return (
    <Link
      to={`/cars/${car.id}`}
      className={clsx(
        'block bg-gray-900 border border-gray-800 rounded-lg overflow-hidden card-hover',
        'hover:border-yellow-800'
      )}
    >
      <div className="relative h-48 bg-gray-800 overflow-hidden">
        {car.images && car.images.length > 0 ? (
          <img
            src={car.images[0]}
            alt={car.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-600 text-4xl">🚗</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={conditionVariant[car.condition] || 'gray'}>{car.condition}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-snug">{car.title}</h3>
        <p className="text-yellow-500 text-lg font-bold mb-3">{formatPrice(car.price)}</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={11} />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={11} />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={11} />
            <span>{car.engine}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={11} />
            <span className="truncate">{car.location}</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-500">{car.transmission} · {car.bodyStyle}</span>
          <span className="text-xs text-gray-600">{car.make}</span>
        </div>
      </div>
    </Link>
  );
}
