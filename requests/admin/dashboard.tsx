import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api"; // Assuming this is the standardized request interface
import { DashboardResponse } from "@/interfaces/dashboardInterface";

export const dashboardRequest = async (token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.dashboard}`; // Adjust this to your actual dashboard endpoint
  const method = "POST";
  try {
    const response = await apiRequest<DashboardResponse>(
      url, // URL for fetching dashboard data
      method, // Use GET method for dashboard data
      null, // No data to be sent in a GET request
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      }
    );
    if (response.success) {
      console.log("Login successful:", response.data);
      return { success: true, data: response.data }; // You can also store token or user data here
    } else {
      console.error("Login failed:", response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
};
