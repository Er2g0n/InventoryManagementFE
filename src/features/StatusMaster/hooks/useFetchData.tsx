import { useState } from "react";

type UseFetchDataResult<T> = {
  data: T | null;
  loading: boolean;
  hasError: boolean;
  fetchData: <U extends (...args: any[]) => Promise<T>>(
    asyncFunction: U
  ) => Promise<T | null>;
};

export default function useFetchData<T = unknown> (defaultData: T | null = null): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(defaultData);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchData = async <U extends (...args: any[]) => Promise<T>>(
    asyncFunction: U
  ): Promise<T | null> => {
    setLoading(true);
    setHasError(false);
    

    try {
      const result = await asyncFunction();

      setData(result);
    } catch (err) {
      setHasError(true);
      throw err;
    } finally {
      setLoading(false);
    }
    return data ;
  };

  return { data, loading, hasError, fetchData };
}