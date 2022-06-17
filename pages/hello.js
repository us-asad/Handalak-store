import axios from 'axios';
import { gql, GraphQLClient } from 'graphql-request';
import React from 'react';

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHQL_API;
const graphqlToken = process.env.NEXT_PUBLIC_GRAPHQL_TOKEN;
const data = [
  {
    name: "Samsung",
    destination: "proms-discounts/samsung",
    image: "https://olcha.uz/image/380x132/discount/KK/KK/ci/1637741582.jpg"
  },
  {
    name: "Samsung",
    destination: "manufacturer/samsung23",
    image: "https://olcha.uz/image/380x132/discount/KK/Kh/L2/1652169577.jpg"
  },
  {
    name: "Bags",
    destination: "proms-discounts/bags",
    image: "https://olcha.uz/image/380x132/discount/KK/KK/c1/1635851437.png"
  }
]

export default function hello() {
  const addData = async () => {
    const query = gql`
      mutation AddNewData($name: String!, $destination: String!, $image: ID!) {
        createPromoDiscount(data: {name: $name, destination: $destination, image: { connect: { id: $image } }}) {
          id
        }
      }
    `;

    const graphqlClient = new GraphQLClient(graphqlApi, {
      headers: {
        Authorization: `Bearer ${graphqlToken}`
      }
    });

    for (let i = 0; i < data.length; i++) {
      const discount = data[i];
      const image = await axios.post(`${graphqlApi}/upload`, `url=${encodeURIComponent(discount.image)}`, {
        headers: {
          Authorization: `Bearer ${graphqlToken}`
        }
      });

      discount.image = image.data.id;

      await graphqlClient.request(query, discount);
    }

    graphqlClient.request(gql`
      mutation PublishAddedData() {
        publishManyAssets {
          count
        }
        publishManyPromosDiscounts {
          count
        }
      }
    `);
  }

  return (
    <div>
      <button className='bg-gray-300 p-5' onClick={addData}>add</button>
    </div>
  )
}
