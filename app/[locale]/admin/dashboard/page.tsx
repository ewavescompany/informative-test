"use client";
import React from "react";
import useDashboardData from "@/hooks/dashboard/useDashboardData";
import DashboardOverviewCard from "@/customComponents/dashboardComponent/cards/overvierwCard";
import { useTranslations } from "next-intl";
// Import the interface if needed
import { Layers3, Newspaper, Fingerprint, Users } from "lucide-react";
import PageLoader from "@/customComponents/pageLoader";
import withAuth from "@/app/hocs/withAuth";
function Page() {
  const t = useTranslations("mainDashboard");
  const { data: dashboardData, loading, error } = useDashboardData(); // Use the custom hook

  if (loading) {
    return <PageLoader />; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message if any
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        <DashboardOverviewCard
          title={t("Number of blogs")}
          Icon={Newspaper}
          description={t("Description of blogs")}
          values={dashboardData?.blogs_count}
        />
        <DashboardOverviewCard
          title={t("Number of portfolios")}
          Icon={Fingerprint}
          description={t("Description of portfolios")}
          values={dashboardData?.portfolio_count}
        />
        <DashboardOverviewCard
          title={t("Number of services")}
          Icon={Layers3}
          description={t("Description of services")}
          values={dashboardData?.services_count}
        />
        <DashboardOverviewCard
          title={t("Number of team members")}
          Icon={Users}
          description={t("Description of team members")}
          values={dashboardData?.team_count}
        />
      </div>
    </div>
  );
}

export default withAuth(Page);
