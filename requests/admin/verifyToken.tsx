// Example function that sends a request with a token for authentication

import { adminServerUrls, baseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api"; // Assuming this is the standardized request interface

export const verifyToken = async (token: string) => {
  const url = `${baseServerUrl}${adminServerUrls.checkToken}`; // Adjust this to your actual login endpoint
  const method = "POST";
  try {
    const response = await apiRequest(
      url, // URL for verifying the token
      method, // Use GET method for token verification
      null, // No data to be sent in a GET request
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      }
    );

    return response; // Return the API response
  } catch (error) {
    console.error(error);
    throw new Error("Token verification failed");
  }
};
