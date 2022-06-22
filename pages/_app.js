import { Footer, Header } from 'containers';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import 'react-multi-carousel/lib/styles.css';
import '@splidejs/react-splide/css';
import 'react-popper-tooltip/dist/styles.css';
import 'styles/globals.css';
import { getAllCategories } from 'data/graphql';
import { CategoriesBar, CategoriesCarousel, MobileNavbar } from 'components';
import { addCategories } from 'redux/mainSlice';
import { SessionProvider } from 'next-auth/react';


function MyApp({ Component, pageProps, categories }) {
  store.dispatch(addCategories(categories))

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps?.session} refetchOnWindowFocus={true}>
      <main className='overflow-x-hidden'>
        {Component.getLayout ? Component.getLayout(
          <>
            <Component {...pageProps} />
          </>
        ) : (
          <>
            <CategoriesBar />
            <Header />
            <MobileNavbar />
            <div className='hidden md:block'>
              <CategoriesCarousel autoContainer />
            </div>
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </main>
      </SessionProvider>
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