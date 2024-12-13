import { useEffect, useState } from "react"

export function useSuspense<T>(promiseFn: () => Promise<T>) {
  const [state, setState] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await promiseFn()
        setState(result)
      } catch (err) {
        setError(err)
      }
    }

    fetchData()
  }, [promiseFn])

  if (error) {
    throw error
  }

  if (state === null) {
    throw promiseFn()
  }

  return state
}
