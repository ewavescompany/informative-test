"use client";
import LinkButton from "@/customComponents/dashboardComponent/links/linkButton";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useShowDialog } from "@/hooks/useShowDialog";
import { DeleteDialog } from "@/customComponents/dashboardComponent/dialog/deleteDialog";
import HorizontalCardComponent from "@/customComponents/dashboardComponent/cards/horizontalCardComponent";
import { useFetchTestimonials } from "@/hooks/dashboard/useFetchTestimonials"; // Import the custom hook
import PageLoader from "@/customComponents/pageLoader";
import { useTranslations } from "next-intl";
import { dashboardBaseServerUrl, imagesPath } from "@/constants/urls";
import Cookies from "js-cookie";
import withAuth from "@/app/hocs/withAuth";
// Import the removeTestimonial function

function Page() {
  const { testimonials, loading, error, setTestimonials } =
    useFetchTestimonials(); // Use the hook
  const { isOpen, openDialog, closeDialog } = useShowDialog();
  const [active, setActive] = useState<number>();
  const t = useTranslations("testimonials");
  const locale = Cookies.get("NEXT_LOCALE") || "en";

  // Function to handle the removal of a testimonial
  async function handleRemoveTestimonial(id: number) {
    try {
      // Call the remove API
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter((testimonial) => testimonial.id !== id)
      ); // Update state by filtering out the deleted testimonial
      closeDialog();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  }

  function handleOpenDialog(value: number) {
    setActive(value);
    openDialog();
  }

  if (loading) return <PageLoader />; // Show loader while fetching
  if (error)
    return (
      <div>
        {t("error_message")}: {error}
      </div>
    );

  return (
    <>
      <div className="w-full flex flex-col gap-5 capitalize">
        <div className="flex flex-row items-center justify-between">
          <DashboardTitle title={t("all_testimonials")} />
          <LinkButton
            url={`/${locale}/admin/dashboard/testimonials/add-testimonial`}
            className="space-x-1.5 h-9 px-4 py-2"
          >
            <span>{t("add_testimonial")}</span>
            <Plus />
          </LinkButton>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
          {testimonials.map((testimonial, index) => (
            <HorizontalCardComponent
              key={index}
              jobTitle={testimonial.name}
              title={testimonial.company}
              onDelete={() => handleOpenDialog(testimonial.id)}
              editUrl={`/${locale}/admin/dashboard/testimonials/edit-testimonial/${testimonial.id}`} // Adjust edit URL accordingly
              imgUrl={`${imagesPath}testimonials/${testimonial.image}`}
              descrption={
                locale === "en"
                  ? testimonial.message_en
                  : testimonial.message_ar
              }
            />
          ))}
        </div>
      </div>
      <DeleteDialog
        removeAction={() => handleRemoveTestimonial(active!)} // Call remove action with the active ID
        deleteUrl={`${dashboardBaseServerUrl}/testimonials/delete`} // Optional URL, handled by removeTestimonial
        activeId={active ? active : 0}
        isShown={isOpen}
        handleClose={closeDialog}
      />
    </>
  );
}

export default withAuth(Page);
