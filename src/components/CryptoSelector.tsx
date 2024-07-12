import { useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { setSelectedCrypto } from '../store';
import { RootState } from '../store';

const cryptoOptions = ['bitcoin', 'ethereum', 'dogecoin', 'cardano', 'polkadot'];

const CryptoSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state:RootState) => state.crypto.selectedCrypto);

  const handleChangeCrypto = (crypto: string) => {
    dispatch(setSelectedCrypto(crypto));
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Change Crypto
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Select Cryptocurrency</h2>
            <div className="flex flex-col space-y-2">
              {cryptoOptions.map((crypto) => (
                <button
                  key={crypto}
                  onClick={() => handleChangeCrypto(crypto)}
                  disabled={crypto === selectedCrypto}
                  className={`py-2 px-4 rounded ${
                    crypto === selectedCrypto
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {crypto}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoSelector;
