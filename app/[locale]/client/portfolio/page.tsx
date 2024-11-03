import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import SimplePortfolioCard from "@/customComponents/portfolioComponents/simplePortfolioCard";
// import SlideComponent from "@/customComponents/reavelAnimation/slideComponent";
import React from "react";
import { getPortfolios } from "@/requests/generic/getPortfolio";
import { Portfolio } from "@/interfaces/dashboardInterface";
async function page() {
  const portfolioRes = await getPortfolios();
  if (portfolioRes)
    return (
      <div className="min-h-screen w-full h-full flex flex-col gap-10">
        <AboutusVideoSection
          title1="portfolio"
          title2={``}
          descriptionEn="We guide game-changing companies, across platforms and places, through agile design and digital experience."
          descriptionAr="نحن نرشد الشركات التي تغير العالم، عبر الأنظمة والأماكن، من خلال تصميم متطور وتجربة رقمية متطورة."
        />
        <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center">
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
            {portfolioRes.data.map((project: Portfolio, key: number) => (
              <SimplePortfolioCard project={project} key={key} />
            ))}
          </div>
        </div>
      </div>
    );
}

export default page;
