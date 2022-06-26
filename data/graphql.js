import { gql, request, GraphQLClient } from "graphql-request";

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHQL_API;
const graphqlToken = process.env.NEXT_PUBLIC_GRAPHQL_TOKEN;

export const client = new GraphQLClient(graphqlApi, {
  headers: {
    Authorization: `Bearer ${graphqlToken}`,
  },
});

export const UpdateAndPublishProductComments = gql`
  mutation UpdatePrdComments($comments: Json!, $id: ID!) {
    updateProduct(where: { id: $id }, data: { comments: $comments }) { comments }
    publishProduct(where: { id: $id }) { id }
  }
`;

export const GetUserPurchasedPrds = gql`
  query GetUserPurchasedPrds($userId: ID!) {
    userData(where: { id: $userId }) {
      purchasedProducts
    }
  }
`;

export const GetProductComments = gql`
  query GetProductComments($id: ID!) {
    product(where: { id: $id }) {
      comments
    }
  }
`;

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    userData(where: { email: $email }) {
      id
      name
      email
      purchasedProducts
    }
  }
`;

export const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $name: String!) {
    createUserData(data: { email: $email, name: $name }) {
      id
      name
      email
      purchasedProducts
    }
    publishUserData(where: { email: $email }) {
      id
    }
  }
`;

export const UpdateUserOrdersAndCouponQty = gql`
  mutation UpdateUserData($purchasedProducts: Json!, $email: String!, $orders: Json!, $code: String!, $codeQty: Int!) {
    updateUserData(data: {purchasedProducts: $purchasedProducts, orders: $orders}, where: {email: $email}) { id }
    publishUserData(where: {email: $email}) { id }
    updateCupon(where: { code: $code }, data: { count: $codeQty }) { id }
    publishCupon(where: { code: $code }) { id }
  }
`;

export const UpdateProductQty = gql`
  mutation UpdateProductQty($id: ID!, $qty: Int!) {
    updateProduct(where: { id: $id }, data: { quantity: $qty }) { id }
    publishProduct(where: { id: $id }) { id }
  }
`;

export const GetUserPurchasedProductsQry = gql`
  query GetPurchasedProducts($email: String!) {
    userData(where: { email: $email }) {
      purchasedProducts,
      orders
    }
  }
`;

export const getAllCategories = async () => {
  const query = gql`
  query MyQuery {
    categories0 {
      name
      slug
      image {
        url
      }
      categories1 {
        name
        slug
        image {
          url
        }
        categories2 {
          name
          slug
          image {
            url
          }
        }
      }
    }
  }
  `;

  const result = await request(graphqlApi, query);

  return result.categories0;
}

export const getPromosDiscounts = async () => {
  const query = gql`
    query GetPromosDiscounts() {
      promosDiscounts(first: 3) {
        name,
        image {
          url
        },
        destination
      }
    }
  `;

  const result = await request(graphqlApi, query);

  return result.promosDiscounts;
}

export const getProducts = async () => {
  const query = gql`
    query MyQuery {
      products {
        id
        comments
        discount
        quantity
        manufacturer {
          name
        }
        image {
          url
        }
        monthlyPay {
          monthlyPrice
          months
        }
        name
        price
        slug
        quantity
        subtitle
        varieties {
          name
          images {
            url
          }
          type
        }
        warrantyPeriod
        delivery
        category {
          ... on Category1 {
            name
            slug
          }
          ... on Category2 {
            name
            slug
          }
        }
      }
    }
  `;

  const result = await request(graphqlApi, query);
  return result?.products;
}

export const getBrands = async () => {
  const query = gql`
    query GetBrands() {
      manufacturers(first: 14) {
        name
        slug
        logo {
          url
        }
      }
    }
  `;

  const result = await request(graphqlApi, query);
  return result.manufacturers;
}

export const getNews = async () => {
  const query = gql`
    query GetNews() {
      moreNews(first: 8) {
        title
        slug
        excerpt
        createdAt
        text {
          html
        }
        image {
          url
        }
      }
    }
  `;

  const result = await request(graphqlApi, query);
  return result?.moreNews;
}

export const getPorductsOfCatgory1 = async categorySlug => {
  const query = gql`
    query GetProductsOfCategory($categorySlug: String!) {
      category1(where: {slug: $categorySlug}) {
        id
        slug
        categories2 {
          name
          slug
          products {
            comments
            discount
            createdAt
            manufacturer {
              name
            }
            image {
              url
            }
            monthlyPay {
              monthlyPrice
              months
            }
            name
            price
            slug
            quantity
            subtitle
            varieties {
              name
              images {
                url
              }
              type
            }
            warrantyPeriod
            delivery
            category {
              ... on Category1 {
                name
                slug
              }
              ... on Category2 {
                name
                slug
              }
            }
          }
        }
        products {
          comments
          discount
          createdAt
          manufacturer {
            name
          }
          image {
            url
          }
          monthlyPay {
            monthlyPrice
            months
          }
          name
          price
          slug
          quantity
          subtitle
          varieties {
            name
            images {
              url
            }
            type
          }
          warrantyPeriod
          delivery
          category {
            ... on Category1 {
              name
              slug
            }
            ... on Category2 {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { categorySlug });

  return result?.category1;
}

export const getPorductsOfCatgory2 = async ctgSlug => {
  const query = gql`
    query GetPorductsOfCatgory0($ctgSlug: String!) {
      category2(where: {slug: $ctgSlug}) {
        id
        slug
        name
        products {
          comments
          discount
          createdAt
          manufacturer {
            name
          }
          image {
            url
          }
          monthlyPay {
            monthlyPrice
            months
          }
          name
          price
          slug
          quantity
          subtitle
          varieties {
            name
            images {
              url
            }
            type
          }
          warrantyPeriod
          delivery
          category {
            ... on Category1 {
              name
              slug
            }
            ... on Category2 {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { ctgSlug });
  return result?.category2;
}

export const getProductDetails = async slug => {
  const query = gql`
    query GetProductDetails($slug: String!) {
      product(where: {slug: $slug}) {
        id
        comments
        discount
        description {
          html
        }
        manufacturer {
          name
          logo {
            url
          }
          slug
        }
        image {
          url
        }
        monthlyPay {
          monthlyPrice
          months
        }
        name
        price
        slug
        quantity
        subtitle
        varieties {
          name
          images {
            url
          }
          type
        }
        warrantyPeriod
        delivery
        category {
          ... on Category1 {
            name
            slug
          }
          ... on Category2 {
            name
            slug
          }
        }
        features {
          feature
          featureName
        }
        supplier
        seller
      }
    }  
  `;

  const userQry = gql`
    query GetUserName($id: ID!) {
      userData(where: { id: $id }) {
        name
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });
  const prd = result?.product;

  for (let i = 0; i < prd?.comments?.length; i++) {
    const user = await request(graphqlApi, userQry, { id: prd?.comments[i].userId });
    prd.comments[i].userName = user?.userData?.name || null;
  }

  return result?.product;
}

export const getProductsById = async prds => {
  const query = gql`
    query GetProductById($id: ID!) {
      product(where: { id: $id }) {
        features {
          feature
          featureName
        }
        category {
          ... on Category1 {
            slug
            name
          }
          ... on Category2 {
            name
            slug
          }
        }
        comments
        image {
          url
        }
        slug
        name
        price
        discount
        id
        quantity
      }
    }
  `;
  const result = [];

  for (let i = 0; i < prds.length; i++) {
    const rsp = await request(graphqlApi, query, { id: prds[i] });
    result.push(rsp?.product);
  }

  return result;
}

export const checkCupon = async code => {
  const query = gql`
    query MyQuery($code: String!) {
      cupon(where: {code: $code}) {
        code
        count
        percentOff
      }
    }  
  `;

  const result = await request(graphqlApi, query, { code });
  return result;
}

export const getUserOrders = async id => {
  const query = gql`
    query GetUserOrders($id: ID!) {
      userData(where: { id: $id }) {
        orders
      }
    }
  `;

  const result = await request(graphqlApi, query, { id });
  return result?.userData?.orders;
}

export const getOrdersWithPrdImages = async orders => {
  const query = gql`
    query GetPrdImages($id: ID!) {
      product(where: { id: $id }) {
        image {
          url
        }
      }
    }
  `;

  for (let i = 0; i < orders?.length; i++) {
    for (let j = 0; j < orders[i].products?.length; j++) {
      const result = await request(graphqlApi, query, { id: orders[i].products[j].id });
      orders[i].products[j].images = result.product.image;
      delete orders[i].products[j].quantity;
    }
  }

  return orders;
}
