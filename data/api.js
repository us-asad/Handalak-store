import axios from "axios";

const exchangeRatesEndpoint = process.env.NEXT_PUBLIC_EXCHANGE_RATES_ENDPOINT;

export const convertCurrency = async (from, to, amount) => {
  const result = await axios.get(`${exchangeRatesEndpoint}/${from}`,);

  const exchangeRate = result?.data?.conversion_rates[to];
  return (amount * exchangeRate).toFixed(0);
}