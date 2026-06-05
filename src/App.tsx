import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import BrowseCarsPage from '@/pages/BrowseCarsPage';
import CarDetailPage from '@/pages/CarDetailPage';
import AuctionsPage from '@/pages/AuctionsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-gray-100 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<BrowseCarsPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/auctions" element={<AuctionsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
