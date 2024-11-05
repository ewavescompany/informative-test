"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDateForPortfolio } from "@/utility/generic";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

function PortfolioDescription({
  descriptionEn,
  descriptionAr,
  client,
  titleEn,
  titleAr,
  projectLink,
  projectDate,
  projectStatus,
}: {
  descriptionEn: string;
  descriptionAr: string;
  client: string;
  titleEn: string;
  titleAr: string;
  projectLink: string;
  projectDate: string;
  projectStatus: string;
}) {
  const t = useTranslations("portfolio");
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const sanitizedContent = DOMPurify.sanitize(
    locale === "en" ? descriptionEn : descriptionAr
  ); // Sanitize content for safety

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 w-full gap-5 px-8 pb-20 sm:px-20 py-4 sm:py-10">
      <div className="flex flex-col items-start gap-1">
        <h6 className="text-xl text-grayblack font-medium">{t("client")}</h6>
        <h6 className="text-xl text-gray-500">{client}</h6>
        <h6 className="text-xl text-grayblack font-medium">{t("project")}</h6>
        <h6 className="text-xl text-gray-500">
          {locale === "en" ? titleEn : titleAr}
        </h6>
      </div>
      <div className="col-span-2 flex flex-col gap-3">
        <h6 className="text-2xl text-grayblack font-medium">
          {t("project_description")}
        </h6>
        <div
          className="quill-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <h6 className="text-xl text-grayblack font-medium">
          {t("project_date")}
        </h6>
        <h6 className="text-xl text-gray-500">
          {formatDateForPortfolio(projectDate)}
        </h6>
        <h6 className="text-xl text-grayblack font-medium">
          {t("project_status")}
        </h6>
        <h6 className="text-xl text-gray-500">{t(projectStatus)}</h6>
        <Button className="mt-3 " variant="default">
          <Link
            target="_blank"
            href={projectLink}
            className="text-xl font-medium"
          >
            {t("try_project")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PortfolioDescription;
