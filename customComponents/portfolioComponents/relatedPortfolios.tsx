"use client";
import { Portfolio } from "@/interfaces/dashboardInterface";
import SimplePortfolioCard from "./simplePortfolioCard";
import { useTranslations } from "next-intl";

interface RelatedPortfoliosProps {
  relatedProjects?: Portfolio[];
}

const RelatedPortfolios = ({ relatedProjects }: RelatedPortfoliosProps) => {
  const t = useTranslations("portfolio");
  return (
    <div className="w-full h-full flex flex-col gap-10 xl:max-w-6xl lg:max-w-3xl max-w-full pb-5">
      <h4 className="text-3xl font-medium">{t("Related Portfolios")}</h4>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-2">
        {relatedProjects?.map((project: Portfolio, index: number) => (
          <SimplePortfolioCard key={index} project={project} />
        ))}
        {relatedProjects?.length === 0 && (
          <h4 className="text-xl text-gray-500 font-medium col-span-full text-center">
            {t("no_related_projects")}
          </h4>
        )}
      </div>
    </div>
  );
};

export default RelatedPortfolios;
