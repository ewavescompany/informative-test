// hooks/useFetchPortfolio.ts
import { useState, useEffect } from "react";
import { fetchPortfolioById } from "@/requests/generic/fetchPortfolioById"; // Import the function
import { Portfolio } from "@/interfaces/dashboardInterface";

export const useFetchPortfolio = (id: string) => {
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPortfolio = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchPortfolioById(id);
          if (data) {
            setPortfolioData(data);
          } else {
            setPortfolioData(null);
          }
        } catch (err) {
          const error = err as Error;
          setError(error.message || "Failed to fetch portfolio");
        } finally {
          setLoading(false);
        }
      };

      fetchPortfolio();
    }
  }, [id]);

  return { portfolioData, loading, error };
};
