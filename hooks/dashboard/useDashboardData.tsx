import { useState, useEffect } from "react";
import { dashboardRequest } from "@/requests/admin/dashboard"; // Assuming this is your dashboard API function
import { DashboardResponse } from "@/interfaces/dashboardInterface"; // Import your interface

const useDashboardData = () => {
  const [data, setData] = useState<DashboardResponse | null>(null); // Define the type for data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await dashboardRequest(token);

        if (response.success) {
          setData(response?.data ? response?.data : null); // Set the data with proper type
        } else {
          setError("Failed to load dashboard data");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching data");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false); // Loading is done
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
