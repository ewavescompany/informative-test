import { apiRequest } from "@/requests/api"; // Assuming this is your standardized API request function

// Generic delete request function
export const deleteRequest = async (url: string, id: number) => {
  try {
    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
    const response = await apiRequest(
      url,
      "POST",
      {
        id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass auth token if required
        },
      }
    );

    if (response.success) {
      return response;
    } else {
      console.error(`Failed to delete item with ID ${id}: ${response}`);
      return response;
    }
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error);
    throw error;
  }
};
