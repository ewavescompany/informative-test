"use client";
import LinkButton from "@/customComponents/dashboardComponent/links/linkButton";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useShowDialog } from "@/hooks/useShowDialog";
import CardComponent from "@/customComponents/dashboardComponent/cards/cardComponent";
import { DeleteDialog } from "@/customComponents/dashboardComponent/dialog/deleteDialog";
import useFetchPortfolios from "@/hooks/dashboard/useFetchPortfolios";
import PageLoader from "@/customComponents/pageLoader";
import { Portfolio } from "@/interfaces/dashboardInterface";
import Cookies from "js-cookie";
import { dashboardBaseServerUrl, imagesPath } from "@/constants/urls";
import { useTranslations } from "next-intl";
import withAuth from "@/app/hocs/withAuth";
function Page() {
  const { portfolios, loading, error, setPortfolios } = useFetchPortfolios();
  console.log(portfolios);
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("portfolio");
  const { isOpen, openDialog, closeDialog } = useShowDialog();
  const [active, setActive] = useState<number>();

  function handleOpenDialog(value: number) {
    setActive(value);
    openDialog();
  }

  function removeBlog(value: number) {
    setPortfolios((prevPortfolios) => {
      if (!prevPortfolios) return null;
      return prevPortfolios.filter((portfolio) => portfolio.id !== value);
    });
    setActive(0);
  }
  console.log(active);
  if (loading) return <PageLoader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="w-full flex flex-col gap-5 capitalize">
        <div className="flex flex-row items-center justify-between">
          <DashboardTitle title={t("All portfolios")} />
          <LinkButton
            url={`/${locale}/admin/dashboard/portfolio/add-portfolios`}
            className="space-x-1.5 h-9 px-4 py-2"
          >
            <span>{t("Add Project")}</span>
            <Plus size={14} />
          </LinkButton>
        </div>
        {portfolios && portfolios.length > 0 && !loading && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {portfolios &&
              portfolios?.map((portfolio: Portfolio, index: number) => (
                <CardComponent
                  key={index}
                  onDelete={() => handleOpenDialog(portfolio.id)}
                  editUrl={`/${locale}/admin/dashboard/portfolio/edit-portfolios/${portfolio.id}`} // Assuming you have an edit page
                  imgUrl={`${imagesPath}portfolios/${portfolio?.image}`} // Fallback to a default image
                  title={
                    locale === "en" ? portfolio.title_en : portfolio.title_ar
                  }
                  descrption={
                    locale === "en"
                      ? portfolio.description_en
                      : portfolio.description_ar
                  }
                />
              ))}
          </div>
        )}
      </div>
      <DeleteDialog
        removeAction={removeBlog}
        deleteUrl={`${dashboardBaseServerUrl}/portfolio/delete`}
        activeId={active ? active : 0}
        isShown={isOpen}
        handleClose={closeDialog}
      />
    </>
  );
}

export default withAuth(Page);
