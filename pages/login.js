import { Auth } from 'components'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'

export default function Login() {
  const { user, loading } = useSelector(state => state.user);
  const router = useRouter();

  if (loading) return null;

  if (user?.id) {
    router.push(router.query.redirect || "/cabinet");
    return null;
  }

  return (
    <div className='flex flex-col bg-white py-16 px-12 space-y-4 shadow-1 w-max min-w-[90vw] md:min-w-[40vw] mx-auto mb-9 mt-4'>
      <Auth />
    </div>
  )
}
