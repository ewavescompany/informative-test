import { useState, useEffect } from "react";
import { fetchAboutData } from "@/requests/generic/fetchAboutus";
import { ContentObject } from "@/interfaces/dashboardInterface";

interface UseFetchAboutusReturn {
  aboutData: ContentObject | null;
  loading: boolean;
  error: string | null;
}

export const useFetchAboutus = (): UseFetchAboutusReturn => {
  const [aboutData, setAboutData] = useState<ContentObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAboutData();
        console.log(data);
        setAboutData(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { aboutData, loading, error };
};
