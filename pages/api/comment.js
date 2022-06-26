import { client, GetUserPurchasedPrds, UpdateAndPublishProductComments, GetProductComments } from "data/graphql";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, comment } = req.body;
    const { userData: { purchasedProducts } } = await client.request(GetUserPurchasedPrds, { userId: comment?.userId});

    if (purchasedProducts?.includes(id)) {
      const { product: { comments } } = await client.request(GetProductComments, { id });
      const updatedComments = comments?.length ? [...comments, comment] : [comment];
      const result = await client.request(UpdateAndPublishProductComments, { id, comments: updatedComments });

      res.status(200).json(result.updateProduct.comments);
    } else {
      res.status(400).json({message: "Izoh qoldirish uchun ushbu mahsulotni oldin xarid qilgan bo'lishingiz kerak!"});
    }
  }
}