import { useState, useEffect } from "react";
import fetchStats from "@/requests/generic/fetchStats"; // Ensure the correct path to the fetchStats function
import { statsData } from "@/interfaces/dashboardInterface";

// Custom hook to fetch stats
export const useFetchStats = () => {
  const [stats, setStats] = useState<statsData | null>(null); // State to store fetched stats
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Function to fetch the stats
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const data = await fetchStats(); // Call the fetchStats function
        setStats(data); // Set the fetched stats data
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        ); // Set error if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching completes
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means this runs once after the component mounts

  return { stats, loading, error }; // Return the stats, loading, and error states
};
