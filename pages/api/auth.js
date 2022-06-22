import { gql, GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
  },
});

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    userData(where: { email: $email }) {
      id
      name
      email
      savedProducts
      comparedProducts
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $name: String!) {
    createUserData(data: { email: $email, name: $name }) {
      id
      name
      email
      savedProducts
      comparedProducts
    }
    publishUserData(where: { email: $email }) {
      id
    }
  }
`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newUser = await client.request(CreateNextUserByEmail, req.body);
    res.status(201).json(newUser);
  } else if (req.method === "GET") {
    const user = await client.request(GetUserByEmail, {email: req.query.email});
    res.status(200).json(user);
  }
}

/*

      authorize: async ({ email, password, name }) => {
        if (!name) {
          const user = await client.request(GetUserByEmail, { email });

          if (!user?.userData)
            throw new Error("User not exist")

          const isValid = await compare(password, user?.userData?.password);
          if (!isValid)
            throw new Error("Wrong Credentials!");

          return {
            id: user?.userData?.id,
            name: user?.useData?.name,
            email
          };
        }

        try {

          const newUser = await client.request(CreateNextUserByEmail, {
            email,
            password: await hash(password, 12),
            name
          });

          return {
            id: newUser?.userData?.id,
            name,
            email
          };
*/