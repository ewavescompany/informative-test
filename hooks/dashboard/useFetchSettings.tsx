import { useState, useEffect } from "react";
import { fetchSettings } from "@/requests/generic/fetchSettings"; // Adjust the path based on your file structure
import { settings } from "@/interfaces/dashboardInterface";

export const useFetchSettings = () => {
  const [setting, setSetting] = useState<settings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchSettings(); // Call the request function to get the data
        setSetting(data); // Set the fetched data
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load homepage data");
        }
      } finally {
        setLoading(false); // Ensure loading is set to false after the request
      }
    };

    fetchData(); // Fetch homepage data on component mount
  }, []); // Empty dependency array to fetch data only on mount

  return { setting, loading, error, setSetting }; // Return the data, loading state, and error state
};
