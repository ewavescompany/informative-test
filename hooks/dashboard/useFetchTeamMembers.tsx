// hooks/useFetchTeamMembers.ts

import { useState, useEffect } from "react";
import { getAllTeamMembers } from "@/requests/generic/team"; // Adjust the path based on your structure
import { TeamMember } from "@/interfaces/dashboardInterface"; // Ensure TeamMember interface is imported

export const useFetchTeamMembers = () => {
  // Set the correct type for teamMembers, which is an array of TeamMember
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTeamMembers();
        setTeamMembers(data); // This should now correctly set the fetched data
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { teamMembers, loading, error, setTeamMembers };
};
