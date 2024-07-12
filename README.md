
## Getting Started

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. Open the .env.local file and add your MongoDB connection string as follows:

    MONGO_URI=your_mongodb_connection_string
6. Replace your_mongodb_connection_string with your actual MongoDB connection string.


## Features

- Poll real-time data every few seconds for cryptocurrencies from CoinGecko API.
- Store the data in a MongoDB database.
- Fetch the most recent 20 real-time data entries for a particular cryptocurrency.
- Display the data in a table on the frontend.


## API Endpoints

Fetch Crypto Data
URL: /api/fetchCryptoData
Method: GET
Description: Fetches real-time data for cryptocurrencies and stores it in MongoDB.
Get Prices
URL: /api/getPrices
Method: GET
Description: Retrieves the most recent 20 price entries for a specific cryptocurrency from MongoDB.
Query Parameters:
crypto (string): The cryptocurrency to fetch prices for (e.g., bitcoin, ethereum).


