import { Link } from 'react-router-dom';
import { Clock, TrendingUp, Gavel } from 'lucide-react';
import { AuctionListing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCountdown } from '@/hooks/useCountdown';
import Badge from '@/components/ui/Badge';
import clsx from 'clsx';
import { pad } from '@/lib/utils';

type AuctionCardProps = { auction: AuctionListing };

export default function AuctionCard({ auction }: AuctionCardProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(auction.endTime);

  const statusConfig = {
    live: { label: 'LIVE', variant: 'green' as const },
    upcoming: { label: 'UPCOMING', variant: 'blue' as const },
    ended: { label: 'ENDED', variant: 'gray' as const },
    sold: { label: 'SOLD', variant: 'gold' as const },
    reserve_not_met: { label: 'RESERVE NOT MET', variant: 'red' as const },
  };

  const sc = statusConfig[auction.status] || statusConfig.ended;

  return (
    <Link
      to={`/auctions/${auction.id}`}
      className={clsx(
        'block bg-gray-900 border rounded-lg overflow-hidden card-hover',
        auction.status === 'live' ? 'border-yellow-700' : 'border-gray-800'
      )}
    >
      <div className="relative h-48 bg-gray-800 overflow-hidden">
        {auction.car.images && auction.car.images.length > 0 ? (
          <img src={auction.car.images[0]} alt={auction.car.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gavel size={48} className="text-gray-600" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant={sc.variant}>{sc.label}</Badge>
        </div>
        {auction.status === 'live' && !isExpired && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 px-3 py-1.5">
            <div className="flex items-center gap-1 text-yellow-400 text-sm font-mono">
              <Clock size={12} />
              <span className="auction-timer">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
              <span className="text-xs text-gray-400 ml-1">remaining</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{auction.car.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500">Current Bid</p>
            <p className="text-yellow-400 text-lg font-bold">{formatPrice(auction.currentBid)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Starting Bid</p>
            <p className="text-gray-400 text-sm">{formatPrice(auction.startingBid)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <TrendingUp size={11} />
          <span>{auction.bids.length} bid{auction.bids.length !== 1 ? 's' : ''}</span>
          <span className="mx-1">·</span>
          <span>{auction.car.location}</span>
        </div>
      </div>
    </Link>
  );
}
