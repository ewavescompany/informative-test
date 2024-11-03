import { useState, useEffect } from "react";
import { fetchVisionData } from "@/requests/generic/fetchVisionData"; // Import the API request function
import { vision } from "@/interfaces/dashboardInterface";

// Custom hook to fetch and manage vision data
export const useFetchVision = () => {
  const [visionData, setVisionData] = useState<vision | null>(null); // State to hold vision data
  const [loading, setLoading] = useState<boolean>(true); // State to indicate loading
  const [error, setError] = useState<string | null>(null); // State to hold errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const data = await fetchVisionData(); // Call the request function

        setVisionData(data[0]); // Set the fetched data in state
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        ); // Set the error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    fetchData(); // Call the fetch function when the component using this hook mounts
  }, []); // Empty dependency array to only call this once on mount

  return { visionData, loading, error }; // Return the data, loading, and error states
};
