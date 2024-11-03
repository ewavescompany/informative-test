import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "@/requests/api";

// Function to send team member data to the API
export const submitTeamMember = async (formData: FormData, token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.addTeam}`;
  const medthod = "POST";
  try {
    const response = await apiRequest(url, medthod, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Since we're sending a file
      },
    });
    return response;
  } catch (error) {
    console.error("Error submitting team member:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to submit team member");
  }
};
