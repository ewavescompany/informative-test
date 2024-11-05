import PortfolioDescription from "@/customComponents/portfolioComponents/portfolioDescription";
import PortfolioGallary from "@/customComponents/portfolioComponents/portfolioGallary";
import PortfolioHeader from "@/customComponents/portfolioComponents/portfolioHeader";
import RelatedPortfolios from "@/customComponents/portfolioComponents/relatedPortfolios";
import React from "react";
import { fetchPortfolioById } from "@/requests/generic/fetchPortfolioById";
import { Metadata } from "next/types";
import { fetchRelatedPortfolios } from "@/requests/generic/fetchRelatedPortfolios";
// For dynamic metadata based on the portfolio data
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // fetch portfolio data
  const project = await fetchPortfolioById(params.id);

  return {
    title: `${project?.title_en} | eWaves Portfolio`,
    description: project?.description_en,
    openGraph: {
      title: `${project?.title_en} | eWaves Portfolio`,
      description: project?.description_en,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project?.title_en} | eWaves Portfolio`,
    },
  };
}

async function page({ params }: { params: { id: string } }) {
  // Fetch both requests concurrently
  const [projectRes, relatedProjects] = await Promise.all([
    fetchPortfolioById(params.id),
    fetchRelatedPortfolios(params.id),
  ]);
  console.log(projectRes, "projectRes");
  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10 justify-center items-center">
      <PortfolioHeader
        titleEn={projectRes?.title_en ?? ""}
        titleAr={projectRes?.title_ar ?? ""}
        descriptionEn={projectRes?.description_en ?? ""}
        descriptionAr={projectRes?.description_ar ?? ""}
        image={projectRes?.image ?? ""}
      />
      <PortfolioDescription
        projectDate={projectRes?.created_at ?? ""}
        descriptionEn={projectRes?.content_en ?? ""}
        descriptionAr={projectRes?.content_ar ?? ""}
        client={projectRes?.client ?? ""}
        titleEn={projectRes?.title_en ?? ""}
        titleAr={projectRes?.title_ar ?? ""}
        projectLink={projectRes?.website_link ?? ""}
        projectStatus={projectRes?.status ?? ""}
      />
      <PortfolioGallary images={projectRes?.portfolio_images ?? []} />
      <RelatedPortfolios relatedProjects={relatedProjects} />
    </div>
  );
}

export default page;
