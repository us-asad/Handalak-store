import { insertComment } from "data/functions";
import { client, GetProductComments, UpdateAndPublishProductComments } from "data/graphql";

export default async function handler(req, res) {
  const { reply, prdId, commentId } = req.body;

  if (req.method === "PUT" && reply && prdId && commentId) {
    const { product: { comments } } = await client.request(GetProductComments, { id: prdId });

    insertComment(comments, commentId, reply);

    const result = await client.request(UpdateAndPublishProductComments, { id: prdId, comments});

    res.status(201).json(result.updateProduct.comments);
  } else {
    res.status(400).json({message: "Bad Request :`("});
  }
}