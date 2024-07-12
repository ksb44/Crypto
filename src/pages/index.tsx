import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { setSelectedCrypto, setPrices, RootState } from '../store';
import CryptoSelector from '../components/CryptoSelector';
import { useSelector, useDispatch } from 'react-redux';


interface Price {
  crypto: string;
  price: number;
  timestamp: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state:RootState) => state.crypto.selectedCrypto);
  const prices = useSelector((state:RootState) => state.crypto.prices);

  // Function to fetch prices from /api/getPrices endpoint
  const fetchPrices = useCallback(async () => {
    try {
      const response = await axios.get('/api/getPrices', { params: { crypto: selectedCrypto } });
      dispatch(setPrices(response.data));
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  }, [dispatch, selectedCrypto]);

  // Function to fetch data from /api/fetchCryptoData endpoint
  const fetchCryptoData = useCallback(async () => {
    try {
      await axios.get('/api/fetchCryptoData');
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  }, []);

  useEffect(() => {
    const storedCrypto = localStorage.getItem('selectedCrypto');
    if (storedCrypto) {
      dispatch(setSelectedCrypto(storedCrypto));
    }

    fetchPrices();
    fetchCryptoData();

    const pricesInterval = setInterval(fetchPrices, 10000);

    const cryptoDataInterval = setInterval(fetchCryptoData, 10000);

    return () => {
      clearInterval(pricesInterval);
      clearInterval(cryptoDataInterval);
    };
  }, [dispatch, fetchPrices, fetchCryptoData]);

  return (
    <div className="min-h-screen bg-gray-600 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Crypto Price Tracker</h1>
            <div className="mb-6">
              <CryptoSelector />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 capitalize">{selectedCrypto} Prices</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prices.map((price, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{new Date(price.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${price.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
