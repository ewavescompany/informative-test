import { useState, useEffect } from "react";
import { getPortfolios } from "@/requests/generic/getPortfolio"; // Import the API request function // Assuming ApiResponse is your standard response type
import { Portfolio } from "@/interfaces/dashboardInterface";
import { ApiResponse } from "@/requests/api"; // Add this import at the top
// Define the expected structure of the portfolio data
// Custom Hook to Fetch Portfolios
const useFetchPortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await getPortfolios();

        if (Array.isArray(response.data)) {
          setPortfolios(response.data);
        } else if (isApiResponse(response)) {
          if (response.success && Array.isArray(response.data)) {
            setPortfolios(response.data);
          } else {
            setError(response.message || "Failed to fetch portfolios");
          }
        } else {
          setError("Invalid response format");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return { portfolios, loading, error, setPortfolios };
};

// Add this type guard function outside the useEffect
function isApiResponse(response: any): response is ApiResponse {
  return (
    response &&
    typeof response === "object" &&
    "success" in response &&
    "data" in response
  );
}

export default useFetchPortfolios;
