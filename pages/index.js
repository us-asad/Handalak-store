import { BrandsContainer, Description, CategoriesCarousel, MainCarousel, NewsContainer, ProductsContainer, PromoDiscountsSection, CategoriesBar } from "components";
import { Footer, Header } from "containers";
import { getBrands, getNews, getProducts, getPromosDiscounts } from "data/graphql";
export default function Home({ promosDiscounts, products, brands, news }) {
  return (
    <div className="custom-container mx-auto mt-5">
      <div className="flex flex-col-reverse md:flex-col">
        <CategoriesCarousel />
        <MainCarousel />
      </div>
      <PromoDiscountsSection promosDiscounts={promosDiscounts} />
      <ProductsContainer products={products} name="Ommabop tovarlar" destination="/elefony-gadzhety-aksessuary/telefony" />
      <ProductsContainer products={products} name="Yangi tovarlar" destination="/elefony-gadzhety-aksessuaryasd/telefony" />
      <BrandsContainer brands={brands} />
      <ProductsContainer products={products} column name="Juda qulay to'lov rejasi" destination="/elefony-gadzhety-aksessuaryasd/telefony" />
      <ProductsContainer products={products} name="Ko'pincha kerak bo'ladi" destination="/elefony-gadzhety-aksessuaryasd/telefony" />
      <NewsContainer news={news} />
      <Description />
    </div>
  )
}

Home.getLayout = page => (
  <>
    <CategoriesBar />
    <Header />
    {page}
    <Footer />
  </>
)

export async function getServerSideProps() {
  const promosDiscounts = await getPromosDiscounts();
  const products = await getProducts();
  const brands = await getBrands();
  const news = await getNews();

  return {
    props: {
      promosDiscounts,
      brands,
      news,
      products: products?.reverse()
    }
  }
}
