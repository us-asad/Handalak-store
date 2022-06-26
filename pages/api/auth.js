import { client, CreateNextUserByEmail, GetUserByEmail } from "data/graphql";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newUser = await client.request(CreateNextUserByEmail, req.body);
    res.status(201).json(newUser);
  } else if (req.method === "GET") {
    const user = await client.request(GetUserByEmail, {email: req.query.email});
    res.status(200).json(user);
  }
}
