import { checkCupon } from "data/graphql";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
  },
});


export default async function handler(req, res) {
  const { code } = req.query;
  const result = await checkCupon(code);
  
  res.status(200).json(result)
}