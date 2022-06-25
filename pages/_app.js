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
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebaseconfig';
import { changeUserState } from 'redux/userSlice';
import axios from 'axios';
import { getCookies, removeCookies, setCookies } from 'cookies-next';

function MyApp({ Component, pageProps, categories }) {
  store.dispatch(addCategories(categories))

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user?.email) {
        setCookies("user_email", auth?.currentUser?.email);
        const userData = await axios.get(`/api/auth?email=${user.email}`)
        store.dispatch(changeUserState(userData.data.userData));
      }
      else {
        store.dispatch(changeUserState(null));
        removeCookies("user_email");
      }
    });
  }, []);

  if (auth?.currentUser?.email)
    setCookies("user_email", auth?.currentUser?.email);
  else
    removeCookies("user_email");

  return (
    <Provider store={store}>
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