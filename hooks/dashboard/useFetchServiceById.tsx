import { useState, useEffect } from "react";
// Ensure the correct path for your request
import { Service } from "@/interfaces/dashboardInterface"; // Ensure the correct path for your interfaces

import { fetchServiceById } from "@/requests/generic/fetchServiceById";

// Custom hook to fetch service by ID
export const useFetchServiceById = (id: string) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getServiceData = async () => {
      try {
        const response = await fetchServiceById(id); // Fetch service data by ID
        console.log(response);
        setService(response.data); // Set the fetched data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message || "Failed to fetch service.");
      } finally {
        setLoading(false);
      }
    };

    getServiceData(); // Fetch data when the component mounts
  }, [id]);

  return { service, loading, error };
};
