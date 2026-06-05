import { CarListing, AuctionListing, Bid } from '@/types';
import { SAMPLE_CARS, generateAuctions } from './data';

const CARS_KEY = 'vccp_cars';
const AUCTIONS_KEY = 'vccp_auctions';

function initCars(): void {
  if (!localStorage.getItem(CARS_KEY)) {
    localStorage.setItem(CARS_KEY, JSON.stringify(SAMPLE_CARS));
  }
}

function initAuctions(): void {
  if (!localStorage.getItem(AUCTIONS_KEY)) {
    localStorage.setItem(AUCTIONS_KEY, JSON.stringify(generateAuctions()));
  }
}

export function getCars(): CarListing[] {
  initCars();
  try {
    return JSON.parse(localStorage.getItem(CARS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCar(car: CarListing): void {
  const cars = getCars();
  const idx = cars.findIndex(c => c.id === car.id);
  if (idx >= 0) cars[idx] = car;
  else cars.push(car);
  localStorage.setItem(CARS_KEY, JSON.stringify(cars));
}

export function getAuctions(): AuctionListing[] {
  initAuctions();
  try {
    const auctions: AuctionListing[] = JSON.parse(localStorage.getItem(AUCTIONS_KEY) || '[]');
    const now = new Date();
    return auctions.map(a => {
      if (a.status === 'live' && new Date(a.endTime) < now) {
        return { ...a, status: a.currentBid >= a.reservePrice ? 'sold' : 'reserve_not_met' };
      }
      if (a.status === 'upcoming' && new Date(a.startTime) <= now) {
        return { ...a, status: 'live' };
      }
      return a;
    });
  } catch {
    return [];
  }
}

export function saveAuction(auction: AuctionListing): void {
  const auctions = getAuctions();
  const idx = auctions.findIndex(a => a.id === auction.id);
  if (idx >= 0) auctions[idx] = auction;
  else auctions.push(auction);
  localStorage.setItem(AUCTIONS_KEY, JSON.stringify(auctions));
}

export function placeBid(auctionId: string, bid: Bid): { success: boolean; error?: string } {
  const auctions = getAuctions();
  const auction = auctions.find(a => a.id === auctionId);
  if (!auction) return { success: false, error: 'Auction not found' };
  if (auction.status !== 'live') return { success: false, error: 'Auction is not active' };
  if (bid.amount <= auction.currentBid) return { success: false, error: `Bid must be higher than current bid of $${auction.currentBid.toLocaleString()}` };
  if (bid.amount < auction.startingBid) return { success: false, error: `Bid must be at least $${auction.startingBid.toLocaleString()}` };
  auction.currentBid = bid.amount;
  auction.currentBidder = bid.bidderName;
  auction.bids = [bid, ...auction.bids];
  saveAuction(auction);
  return { success: true };
}
