import { Footer, Header } from 'containers';
import { useDispatch } from 'react-redux';
import { wrapper } from 'redux/store';
import '@splidejs/react-splide/css';
import 'react-popper-tooltip/dist/styles.css';
import 'styles/globals.css';
import { getAllCategories } from 'data/graphql';
import { CategoriesBar, CategoriesCarousel, MobileNavbar } from 'components';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebaseconfig';
import { changeUserState } from 'redux/slices/user';
import axios from 'axios';
import { removeCookies, setCookies } from 'cookies-next';
import { addCategories } from 'redux/slices/main';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user?.email) {
        const userData = await axios.get(`/api/auth?email=${user.email}`)
        setCookies("user_id", userData.data.userData?.id);
        dispatch(changeUserState(userData.data.userData));
      }
      else {
        dispatch(changeUserState(null));
        removeCookies("user_id");
      }
    });
  }, [dispatch]);

  return (
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
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async () => {
  const categories = await getAllCategories();
  store.dispatch(addCategories(categories));
});

export default wrapper.withRedux(MyApp);
