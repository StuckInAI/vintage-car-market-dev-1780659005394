export type CarCondition = 'Excellent' | 'Good' | 'Fair' | 'Project' | 'Restored';
export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';
export type Transmission = 'Manual' | 'Automatic' | 'Semi-Automatic';
export type BodyStyle = 'Sedan' | 'Coupe' | 'Convertible' | 'Roadster' | 'Wagon' | 'SUV' | 'Truck' | 'Van' | 'Other';
export type DriveType = 'RWD' | 'FWD' | 'AWD' | '4WD';

export interface CarListing {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: CarCondition;
  fuelType: FuelType;
  transmission: Transmission;
  bodyStyle: BodyStyle;
  driveType: DriveType;
  color: string;
  interiorColor: string;
  engine: string;
  horsepower: number;
  doors: number;
  vin: string;
  location: string;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
  isAuction: boolean;
}

export interface AuctionListing {
  id: string;
  carId: string;
  car: CarListing;
  sellerId: string;
  sellerName: string;
  startingBid: number;
  reservePrice: number;
  currentBid: number;
  currentBidder: string;
  bids: Bid[];
  startTime: string;
  endTime: string;
  durationHours: number;
  status: 'upcoming' | 'live' | 'ended' | 'sold' | 'reserve_not_met';
  createdAt: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'seller' | 'both';
  createdAt: string;
}

export interface FilterState {
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  mileageMax: string;
  condition: string;
  bodyStyle: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  color: string;
  location: string;
  sortBy: string;
}
