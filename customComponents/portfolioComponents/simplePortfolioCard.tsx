import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/interfaces/dashboardInterface";
import { imagesPath } from "@/constants/urls";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { formatDateForPortfolio } from "@/utility/generic";
function SimplePortfolioCard({ project }: { project: Portfolio }) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("portfolio");
  return (
    <div className="w-full h-full rounded-2xl flex flex-col gap-3 ">
      <div className="w-full h-full overflow-hidden rounded-2xl min-h-[30vh]">
        <img
          src={`${imagesPath}portfolios/${project.image}`}
          alt="blog img"
          className="hover:scale-125 duration-500 object-cover w-full h-full"
        />
      </div>
      <div className="w-full h-full p-3 flex flex-col gap-3">
        <div className="flex flex-row items-baseline gap-2">
          <h6 className="text-2xl font-medium">
            {locale === "en" ? project.title_en : project.title_ar}
          </h6>
          <span className="text-gray-500 uppercase font-medium text-base ">
            {formatDateForPortfolio(project.created_at)}
          </span>
        </div>

        <p className="text-gray-500 text-base line-clamp-3">
          {locale === "en" ? project.description_en : project.description_ar}
        </p>
        <Button variant={"default"} size={"lg"} className="w-fit rounded-full">
          <Link href={`/${locale}/client/portfolio/${project.id}`}>
            {t("view_project")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default SimplePortfolioCard;
