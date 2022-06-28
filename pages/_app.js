import { Footer, Header } from 'containers';
import { useDispatch } from 'react-redux';
import { wrapper } from 'redux/store';
import '@splidejs/react-splide/css';
import 'react-popper-tooltip/dist/styles.css';
import 'styles/globals.css';
import { getAllCategories } from 'data/graphql';
import { CategoriesBar, CategoriesCarousel, ProductModal, ReplyModal } from 'components';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebaseconfig';
import { changeUserState } from 'redux/slices/user';
import axios from 'axios';
import { removeCookies, setCookies } from 'cookies-next';
import { addCategories } from 'redux/slices/main';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Loader } from 'subcomponents';
import { hideBodyOverflow } from 'data/functions';

const MobileNavbar = dynamic(() => import("components/MobileNavbar"), {
  ssr: false
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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

  useEffect(() => {
    const handleLoading = state => () => {
      setLoading(state);
      hideBodyOverflow(state)
    }

    router.events.on("routeChangeStart", handleLoading(true));
    router.events.on("routeChangeComplete", handleLoading(false));
    router.events.on("routeChangeError", handleLoading(false));

    return () => {
      router.events.off('routeChangeStart', handleLoading(true));
      router.events.off('routeChangeComplete', handleLoading(false));
      router.events.off('routeChangeError', handleLoading(false));
    }
  }, [router]);

  return (
    <main className='overflow-x-hidden'>
      <Script
        id="replain"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.replainSettings = {id: '927b302e-00e1-4df1-bdee-2dac12e05a26' };
          (function(u){var s=document.createElement('script');s.async=true;s.src=u;
          var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
            })('https://widget.replain.cc/dist/client.js');
          `,
        }}
      />
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
      <ProductModal />
      <ReplyModal />
      {loading && <Loader />}
    </main>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async () => {
  const categories = await getAllCategories();
  store.dispatch(addCategories(categories));
});

export default wrapper.withRedux(MyApp);
