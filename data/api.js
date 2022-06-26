import axios from "axios";

const exchangeRatesEndpoint = process.env.NEXT_PUBLIC_EXCHANGE_RATES_ENDPOINT;
const exchangeRatesApiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATES_API_KEY;

export const convertCurrency = async (from, to, amount) => {
  const data = await axios.get(`${exchangeRatesEndpoint}?to=${to}&from=${from}&amount=${amount}`, {
    headers: {
      apiKey: exchangeRatesApiKey
    },
    redirect: 'follow',
  });

  return data.data.result.toFixed(0);
}