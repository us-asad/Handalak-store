import { client, SearchProduct } from "data/graphql";

export default async function handler(req, res) {
  if (req.method === "GET" && req.query.q) {
    const result = await client.request(SearchProduct, { query: req.query.q });

    res.status(200).json(result);
  } else {
    res.status(400).json({message: "Something went wrong"});
  }
}