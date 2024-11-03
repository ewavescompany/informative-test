import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import LatestProjects from "@/customComponents/aboutUsComponent/latestProjects";
import Vission from "@/customComponents/homeComponents/vission";
import Stats from "@/customComponents/homeComponents/stats";
import TeamSection from "@/customComponents/homeComponents/teamSection";
import Testomonials from "@/customComponents/homeComponents/testomonials";
import Mission from "@/customComponents/homeComponents/mission";
import React from "react";
import { fetchVisionData } from "@/requests/generic/fetchVisionData";
import { fetchMissionData } from "@/requests/generic/fetchMissionData";
import fetchStats from "@/requests/generic/fetchStats";
import { fetchTestimonials } from "@/requests/generic/fetchTestimonials";
import { fetchAboutData } from "@/requests/generic/fetchAboutus";
import { getAllTeamMembers } from "@/requests/generic/team";
import { getPortfolios } from "@/requests/generic/getPortfolio";
// import { generateParams } from "@/app/utils/generateParams";

// export const generateStaticParams = generateParams;

export default async function AboutUsPage() {
  // Fetch data in parallel
  const [
    vissionData,
    missionData,
    statsData,
    teamData,
    testimonialsData,
    aboutus,
    projectsData,
  ] = await Promise.all([
    fetchVisionData(),
    fetchMissionData(),
    fetchStats(),
    getAllTeamMembers(),
    fetchTestimonials(),
    fetchAboutData(),
    getPortfolios(),
  ]);

  if (projectsData)
    return (
      <div className="min-h-screen flex flex-col gap-10">
        <AboutusVideoSection
          title1={"about_us"}
          title2={"get_to_know_us"}
          descriptionEn={aboutus.content_en}
          descriptionAr={aboutus.content_ar}
        />
        <div className="flex flex-col gap-10 px-8 pb-20 sm:px-20 py-4 sm:py-10 ">
          <Mission mission={missionData[0]} />
          <Vission vission={vissionData[0]} />
          <Stats stats={statsData} />
          <LatestProjects projectsData={projectsData.data} />
          <TeamSection team={teamData} />
          <Testomonials testimonials={testimonialsData} />
        </div>
      </div>
    );
}
