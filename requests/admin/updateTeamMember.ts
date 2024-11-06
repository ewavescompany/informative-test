import { apiRequest } from "@/requests/api"; // Import your apiRequest function
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls"; // Adjust the URL based on your setup

// Function to update a team member by ID
export const updateTeamMember = async (formData: FormData, token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editTeam}`; // Update the URL according to your API
  const method = "POST";
  try {
    // Send the request to update the team member
    const response = await apiRequest(url, method, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token
        "Content-Type": "multipart/form-data", // Ensure correct content type
      },
    });

    // Return the response from the API
    return response;
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update team member");
  }
};
