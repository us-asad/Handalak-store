import { checkCupon } from "data/graphql";

export default async function handler(req, res) {
  const { code } = req.query;
  const result = await checkCupon(code);
  
  res.status(200).json(result)
}