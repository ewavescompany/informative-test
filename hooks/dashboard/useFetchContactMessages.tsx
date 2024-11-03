"use client";
import { useState, useEffect } from "react";
import { ContactInfo } from "@/interfaces/dashboardInterface";
import { ApiResponse } from "@/requests/api"; // Add this import at the top
import { getContactus } from "@/requests/admin/getContactus";
// Define the expected structure of the portfolio data
// Custom Hook to Fetch Portfolios
const useFetchContactMessages = () => {
  const [messages, setMessages] = useState<ContactInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await getContactus(token ?? "");
        console.log(response);
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else if (isApiResponse(response)) {
          if (response.success && Array.isArray(response.data)) {
            setMessages(response.data);
          } else {
            // setError(response.message || "Failed to fetch portfolios");
            setError( "Failed to fetch portfolios");
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

  return { messages, loading, error, setMessages };
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

export default useFetchContactMessages;
