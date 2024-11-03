// requests/login.ts
import { adminServerUrls, baseServerUrl } from "@/constants/urls";

// Define the expected response data for login
interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// Function to handle login
export async function loginAdmin(email: string, password: string) {
  const url = `${baseServerUrl}${adminServerUrls.login}`; // Adjust this to your actual login endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const data: LoginResponse = await response.json();

    console.log("Login successful:", data);

    // Assuming a successful login if token and user object exist in the response
    if (data.token && data.user) {
      // You can also store the token or user data here if needed
      return { success: true, data };
    } else {
      console.error("Login failed: Missing token or user data in response.");
      return { success: false, error: "Invalid response format" };
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    console.log("Login request completed.");
  }
}
