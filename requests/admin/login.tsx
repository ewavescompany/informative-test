// requests/login.ts
import { adminServerUrls, baseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api";
import { LoginResponse } from "@/interfaces/loginInterface";

// Define the expected response data for login

// Function to handle login
export async function loginAdmin(email: string, password: string) {
  const url = `${baseServerUrl}${adminServerUrls.login}`; // Adjust this to your actual login endpoint
  const method = "POST";

  const response = await apiRequest<LoginResponse>(url, method, {
    email,
    password,
  });

  if (response.success) {
    console.log("Login successful:", response.data);
    return { success: true, data: response.data }; // You can also store token or user data here
  } else {
    console.error("Login failed:", response.error);
    return { success: false, error: response.error };
  }
}
