import { apiRequest } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { TeamMember } from "@/interfaces/dashboardInterface";

// Define the expected structure of the API response
interface ApiResponse<T> {
  data: T;
}

// Function to fetch all team members
export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
  const url = `${clientBaseServerUrl}${serverUrls.team}`;

  try {
    // Expect ApiResponse<TeamMember[]> as the response type
    const response = await apiRequest<ApiResponse<TeamMember[]>>(url, "GET");

    // Return the `data` field which contains the array of team members
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch team members"
    );
  }
};
