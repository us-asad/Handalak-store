import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
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
      password
      name
      savedProducts
      comparedProducts
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!, $name: String!) {
    createUserData(data: { email: $email, password: $password, name: $name }) {
      id
    }
    publishUserData(where: { email: $email }) {
      id
    }
  }
`;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@example.com"
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "John Brain",
          minLength: 3,
          maxLength: 50
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "qwerty12345678"
        },
      },
      authorize: async ({ email, password, name }) => {
        console.log(!name)
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
        } catch (err) {
          const error = `${err}`.slice(0, `${err}`.indexOf("{"))
          return {
            email: "error",
            name: error
          }
        }
      },
      callbacks: {
        async session(session) {
          console.log(session, "SESSSSSION")
          if (!session) return;

          // const user = await client.request(GetUserByEmail,);

          return {
            session: {
              session
            }
          };
        },
      }   
    }),
  ]
})
