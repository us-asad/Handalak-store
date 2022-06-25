import { gql, GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
  },
});

const query = gql`
  mutation UpdatePrdComments($comments: Json!, $id: ID!) {
    updateProduct(where: { id: $id }, data: { comments: $comments }) { comments }
    publishProduct(where: { id: $id }) { id }
  }
`;

const userPurchasedPrdsQry = gql`
  query GetUserPurchasedPrds($id: ID!) {
    userData(where: { id: $id }) {
      purchasedProducts
    }
  }
`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userData: { purchasedProducts } } = await client.request(userPurchasedPrdsQry, { id: req.body.comments[0].userId });

    if (purchasedProducts?.includes(req.body.id)) {
      const result = await client.request(query, req.body);

      res.status(200).json(result.updateProduct.comments);
    } else {
      res.status(400).json({message: "Izoh qoldirish uchun ushbu mahsulotni oldin xarid qilgan bo'lishingiz kerak!"});
    }
  }
}