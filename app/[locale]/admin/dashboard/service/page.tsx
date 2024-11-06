"use client";
import LinkButton from "@/customComponents/dashboardComponent/links/linkButton";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useFetchServices } from "@/hooks/dashboard/useFetchServices";
import PageLoader from "@/customComponents/pageLoader";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { useShowDialog } from "@/hooks/useShowDialog";
import CardComponent from "@/customComponents/dashboardComponent/cards/cardComponent";
import { Service } from "@/interfaces/dashboardInterface";
import { dashboardBaseServerUrl, imagesPath } from "@/constants/urls";
import { DeleteDialog } from "@/customComponents/dashboardComponent/dialog/deleteDialog";
// import withAuth from "@/app/hocs/withAuth";

function Page() {
  const { services, loading, error, setServices } = useFetchServices();
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("services");
  console.log(services?.data);
  const { isOpen, openDialog, closeDialog } = useShowDialog();
  const [active, setActive] = useState<number>();

  function handleOpenDialog(value: number) {
    setActive(value);
    openDialog();
  }

  function removeService(value: number) {
    setServices((prevServices) => {
      if (prevServices && prevServices.data) {
        return {
          ...prevServices, // Spread the existing structure
          data: prevServices.data.filter((service) => service?.id !== value), // Filter out the blog from the data array
        };
      }
      return prevServices; // Return the original if structure doesn't match
    });
    setActive(0); // Reset active state
  }

  if (loading) return <PageLoader />;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="w-full flex flex-col gap-5 capitalize">
        <div className="flex flex-row items-center justify-between">
          <DashboardTitle title={t("all_services")} />
          <LinkButton
            url={`/${locale}/admin/dashboard/service/add-services`}
            className="space-x-1.5 h-9 px-4 py-2"
          >
            <span>{t("add_service")}</span>
            <Plus size={14} />
          </LinkButton>
        </div>
        {services?.data && services?.data.length > 0 && !loading && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {services.data.map((service: Service, index: number) => (
              <CardComponent
                key={index}
                onDelete={() => handleOpenDialog(service.id)}
                editUrl={`/${locale}/admin/dashboard/service/edit-services/${service.id}`} // Assuming you have an edit page
                imgUrl={`${imagesPath}services/${service?.image}`} // Fallback to a default image
                title={locale === "en" ? service.title_en : service.title_ar}
                shortDescrption={
                  locale === "en"
                    ? service.short_description_en
                    : service.short_description_ar
                }
              />
            ))}
          </div>
        )}
      </div>
      <DeleteDialog
        removeAction={removeService}
        deleteUrl={`${dashboardBaseServerUrl}/services/delete`}
        activeId={active ? active : 0}
        isShown={isOpen}
        handleClose={closeDialog}
      />
    </>
  );
}

export default Page;
