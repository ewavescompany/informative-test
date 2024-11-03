// requests/contact.js

import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest } from "../api"; // Assuming apiRequest is in the "../api" directory

export const sendContactMessage = async (data: FormData) => {
  try {
    const url = `${clientBaseServerUrl}${serverUrls.postContactus}`;
    const method = "POST";

    const response = await apiRequest(url, method, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response; // Return the response from the API
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};
