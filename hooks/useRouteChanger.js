import { useRouter } from "next/router"

export function useRouteChanger() {
  const router = useRouter();

  return query => {
    if (query) {
      router.push({
        pathname: router.pathname,
        query
      }, "", {
        scroll: false,
        shallow: true
      });
    }
  }
}