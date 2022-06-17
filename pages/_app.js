import { Footer, Header } from 'containers';

import { Provider } from 'react-redux';
import { store } from 'redux/store';
import 'react-multi-carousel/lib/styles.css';
import '@splidejs/react-splide/css';
import 'styles/globals.css';
import 'node_modules/modern-normalize/modern-normalize.css';
import { getAllCategories } from 'data/graphql';
import { AppWrapper } from 'subcomponents';
import { CategoriesBar, CategoriesCarousel } from 'components';

function MyApp({ Component, pageProps, categories }) {
  return (
    <Provider store={store}>
      <AppWrapper categories={categories}>
        <main className='overflow-x-hidden'>
          {Component.getLayout ? Component.getLayout(
            <>
              <Component {...pageProps} />
            </>
          ) : (
            <>
              <CategoriesBar />
              <Header />
              <CategoriesCarousel autoContainer />
              <Component {...pageProps} />
              <Footer />
            </>
          )}
        </main>
      </AppWrapper>
    </Provider>
  );
}



MyApp.getInitialProps = async () => {
  const categories = await getAllCategories();

  return {
    categories
  }
}

export default MyApp;
