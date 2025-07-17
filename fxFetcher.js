const axios = require('axios');
require('dotenv').config();

async function getFXData() {
  const url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
  try {
    const res = await axios.get(url);
    const data = res.data["Time Series FX (Daily)"];
    
    if (!data) {
      throw new Error("No FX data received. Check API key or rate limits.");
    }
    
    const latestDate = Object.keys(data)[0];
    const latest = data[latestDate];
    return {
      date: latestDate,
      open: latest["1. open"],
      close: latest["4. close"]
    };
  } catch (err) {
    console.error("Error fetching FX data:", err.message);
    throw err;
  }
}

module.exports = getFXData;
