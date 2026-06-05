import { useState } from 'react';
import { Gavel, Filter } from 'lucide-react';
import { AuctionListing } from '@/types';
import { getAuctions } from '@/lib/storage';
import AuctionCard from '@/components/auctions/AuctionCard';
import clsx from 'clsx';

type StatusFilter = 'all' | 'live' | 'upcoming' | 'ended';

export default function AuctionsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const auctions = getAuctions();

  const filtered = auctions.filter(a => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'ended') return a.status === 'ended' || a.status === 'sold' || a.status === 'reserve_not_met';
    return a.status === statusFilter;
  });

  const liveCount = auctions.filter(a => a.status === 'live').length;

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All Auctions' },
    { key: 'live', label: `Live (${liveCount})` },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'ended', label: 'Ended' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Gavel className="text-yellow-500" size={28} />
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Car Auctions</h1>
          {liveCount > 0 && (
            <div className="flex items-center gap-1 bg-green-900 text-green-400 text-xs px-2 py-1 rounded-full border border-green-700">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {liveCount} Live
            </div>
          )}
        </div>
        <p className="text-gray-500">Bid on the world's finest vintage automobiles in real-time auctions</p>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
              statusFilter === tab.key
                ? 'border-yellow-500 text-yellow-400'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Auction Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Gavel size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No auctions in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(auction => <AuctionCard key={auction.id} auction={auction} />)}
        </div>
      )}

      {/* CTA to create auction */}
      <div className="mt-12 bg-gray-900 border border-yellow-900 rounded-xl p-8 text-center">
        <Gavel size={32} className="text-yellow-500 mx-auto mb-3" />
        <h3 className="text-white font-bold text-xl mb-2">Want to auction your classic car?</h3>
        <p className="text-gray-500 text-sm mb-4">List your car for auction and reach thousands of serious collectors</p>
        <a href="/sell?mode=auction" className="inline-flex items-center gap-2 bg-yellow-600 text-black px-6 py-2.5 rounded font-semibold hover:bg-yellow-500 transition-colors">
          <Filter size={16} /> Start an Auction
        </a>
      </div>
    </div>
  );
}
