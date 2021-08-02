import { useEffect, useState } from 'react'

// useMediaQuery('(max-width: 48rem)');
const useMediaQuery = (mediaQuery: string) => {
  if (typeof window !== 'object' || !('matchMedia' in window)) {
    return null
  }
  const [isVerified, setIsVerified] = useState(!!window.matchMedia(mediaQuery).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery)
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches)

    mediaQueryList.addListener(documentChangeHandler)

    documentChangeHandler()
    return () => {
      mediaQueryList.removeListener(documentChangeHandler)
    }
  }, [mediaQuery])

  return isVerified
}

export default useMediaQuery
