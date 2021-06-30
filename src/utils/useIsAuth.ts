import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery()
  const router = useRouter()

  // Re-direct to login whenever an unauthenticated user go to this page
  useEffect(() => {
    if (!fetching && !data?.me) {
      // Re-direct users to their last page before logging in
      router.replace(`/login?next=${router.pathname}`)
    }
  })
}
