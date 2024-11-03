import { useState, useEffect } from "react";
import fetchMemberById from "@/requests/admin/fetchMemberById"; // Adjust the path based on your structure
import { TeamMember } from "@/interfaces/dashboardInterface";

// Hook to fetch a team member by ID
export const useFetchTeamMember = (id: string | number) => {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null); // State to hold team member data
  const [loading, setLoading] = useState<boolean>(true); // State to indicate loading
  const [error, setError] = useState<string | null>(null); // State to hold errors

  useEffect(() => {
    // Function to fetch team member data
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const data = await fetchMemberById(id); // Call the request function with the ID

        if (data) {
          setTeamMember(data); // Set the fetched team member data
        } else {
          throw new Error("No data found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch team member"); // Set the error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    if (id) {
      fetchData(); // Call the fetch function if the ID is provided
    }
  }, [id]); // Trigger the effect whenever the ID changes

  return { teamMember, loading, error }; // Return the data, loading, and error states
};
